import { useState } from 'react';
import { Platform, Alert } from 'react-native';
import * as Speech from 'expo-speech';

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
      let voiceWarning = "";

      if (event.error === 'network') {
        errorMessage = "⚠️ ERROR DE RED: Revisa tu conexión o usa Google Chrome.";
      } else if (event.error === 'not-allowed') {
        errorMessage = "🚫 PERMISO DENEGADO: Activa el micro en los ajustes del navegador.";
      } else if (event.error === 'no-speech') {
        errorMessage = "🎤 ¡NO SE ESCUCHA NADA! \n\nPor favor, habla más fuerte o acerca el micrófono.";
        voiceWarning = "No se escucha, habla más fuerte";
      }

      // Si hay una advertencia de voz, la app la dice
      if (voiceWarning) {
        Speech.speak(voiceWarning, { language: 'es-ES', rate: 1.0 });
      }
      
      Alert.alert("Aviso de Voz", errorMessage);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return { isListening, startVoiceInput };
};
