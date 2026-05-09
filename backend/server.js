const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de Groq por defecto
const DEFAULT_API_KEY = process.env.GROQ_API_KEY;

if (!DEFAULT_API_KEY) {
  console.warn("WARNING: GROQ_API_KEY is missing in .env file.");
} else {
  console.log("Groq default API loaded correctly.");
}

// Función auxiliar para obtener cliente de Groq (propio o del usuario)
const getGroqClient = (userApiKey) => {
  const key = userApiKey || DEFAULT_API_KEY;
  if (!key || key === 'MISSING_KEY') return null;

  return new OpenAI({
    apiKey: key,
    baseURL: "https://api.groq.com/openai/v1"
  });
};

app.post('/translate', async (req, res) => {
  const { text, sourceLang = 'auto', targetLang = 'en' } = req.body;
  const userApiKey = req.headers['x-api-key'];

  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }

  const groq = getGroqClient(userApiKey);
  if (!groq) {
    return res.status(500).json({
      error: 'API Key de Groq no configurada',
      details: 'El servidor no tiene una clave por defecto y no has ingresado una propia en Configuración.'
    });
  }

  try {
    const prompt = `
      Actúa como un experto tutor de idiomas bilingüe. 
      Tu objetivo es traducir la frase del usuario de ${sourceLang === 'auto' ? 'idioma detectado' : sourceLang} a ${targetLang}.
      Genera una respuesta educativa profunda pero concisa. 

      REGLAS DE TRADUCCIÓN:
      1. TRADUCCIÓN OBLIGATORIA A: ${targetLang}.
      2. AUTOCORRECCIÓN: Si la frase original del usuario tiene errores ortográficos o de tipeo, corrígelos automáticamente. El campo "original" del JSON debe mostrar tu versión corregida.
      3. INTENCIÓN: Si la frase original suena a una invitación o pregunta implícita, tradúcela con la estructura gramatical correcta para preguntas en el idioma de destino (${targetLang}).
      4. CRÍTICO: La traducción DEBE ser 100% precisa, natural y gramaticalmente impecable.

      REGLAS DE EXPLICACIÓN:
      1. Explica la gramática de forma sencilla. Si es una frase corta o saludo coloquial, simplemente explica su uso y no inventes reglas gramaticales complejas.
      2. Si hay modismos (idioms) o expresiones idiomáticas, identifícalos y explícalos.
      3. Proporciona exactamente 3 ejemplos adicionales útiles. Si es un saludo, da otras formas comunes de usarlo.
      4. IMPORTANTE: En la "traduccion" y en la "traduccion" de cada ejemplo, encierra los verbos principales entre etiquetas <v> y </v>.
      5. REGLA DE ORO: La "traduccion" y la traducción de los ejemplos deben estar 100% en el idioma de destino (${targetLang}). No mezcles idiomas.
      6. PRONUNCIACIÓN: Incluye un campo "pronunciacion" con una transcripción fonética amigable para hispanohablantes de la "traduccion" completa. Ejemplo: si es "Hello world", pon "je-lóu uór-ld".

      REGLA DE FORMATO OBLIGATORIA:
      Responde EXCLUSIVAMENTE en formato JSON puro. No agregues texto antes ni después del bloque JSON.

      ESTRUCTURA DEL JSON:
      {
        "original": "Frase original con <v>verbos</v>",
        "traduccion": "Translation with <v>verbs</v>",
        "pronunciacion": "Transcripción fonética",
        "explicacion": "Explicación breve",
        "ejemplos": [
          {"frase": "Ejemplo original con <v>verbos</v>", "traduccion": "Example with <v>verbs</v>"}
        ],
        "audio_suggested_speed": "normal",
        "tags": ["tag1", "tag2"]
      }

      Entrada del usuario: "${text}"
    `;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Eres un experto tutor bilingüe que responde siempre en formato JSON puro."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }
    });

    let responseText = completion.choices[0].message.content;
    responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

    const jsonResponse = JSON.parse(responseText);
    res.json(jsonResponse);

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({
      error: 'Error en el servicio de traducción',
      details: error.message.includes('API key') ? 'La API Key ingresada parece ser inválida.' : error.message
    });
  }
});

app.post('/explain-tag', async (req, res) => {
  const { tag, phrase } = req.body;
  const userApiKey = req.headers['x-api-key'];

  if (!tag) {
    return res.status(400).json({ error: 'No tag provided' });
  }

  const groq = getGroqClient(userApiKey);
  if (!groq) {
    return res.status(500).json({ error: 'API Key no disponible' });
  }

  try {
    const prompt = `
      Actúa como un tutor de idiomas. El usuario ha hecho clic en la etiqueta gramatical "${tag}" 
      que apareció tras traducir la frase: "${phrase}".
      
      OBJETIVO:
      1. Explica brevemente y de forma amigable qué significa "${tag}" en el contexto del aprendizaje de inglés/español.
      2. Proporciona 3 ejemplos cortos y útiles que usen esta misma regla o contexto gramatical.
      3. Usa etiquetas <v> para resaltar los verbos en inglés.
      
      FORMATO JSON:
      {
        "titulo": "${tag}",
        "explicacion": "Explicación breve (máx 3 frases)",
        "ejemplos": [
          {"en": "Ejemplo en inglés con <v>verbos</v>", "es": "Traducción al español"}
        ]
      }
    `;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Eres un tutor bilingüe que responde en JSON." },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }
    });

    res.json(JSON.parse(completion.choices[0].message.content));
  } catch (error) {
    console.error('Tag Explanation Error:', error);
    res.status(500).json({ error: 'Error al obtener la explicación' });
  }
});

const PORT = process.env.PORT || 3000;

// Quitamos el '0.0.0.0' para que Render lo maneje automáticamente
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
