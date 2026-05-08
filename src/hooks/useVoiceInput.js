import { useState } from 'react';
import { Platform, Alert } from 'react-native';

export const useVoiceInput = (onResult) => {
  const [isListening, setIsListening] = useState(false);

  const startVoiceInput = () => {
    if (Platform.OS !== 'web') {
      Alert.alert("Dictado por voz", "El dictado por voz nativo requiere una configuración adicional. En la versión web ya está disponible.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      Alert.alert("Error", "Tu navegador no soporta el dictado por voz.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      if (onResult) onResult(speechToText);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      let errorMessage = "Ocurrió un error con el micrófono.";
      if (event.error === 'network') {
        errorMessage = "Error de red. Si usas navegadores como Brave, prueba abrir la app en Google Chrome, ya que el dictado web suele depender de sus servidores.";
      } else if (event.error === 'not-allowed') {
        errorMessage = "Debes dar permiso para usar el micrófono en la barra de direcciones de tu navegador.";
      } else if (event.error === 'no-speech') {
        errorMessage = "No se detectó ningún sonido. Por favor, habla más fuerte o revisa tu micrófono.";
      }
      
      Alert.alert("Error de Dictado", errorMessage);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return { isListening, startVoiceInput };
};
