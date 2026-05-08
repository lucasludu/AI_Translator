import { useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, EXPLAIN_TAG_URL } from '../constants/api';

export const useTranslate = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isTagLoading, setIsTagLoading] = useState(false);
  const [tagInfo, setTagInfo] = useState(null);

  const getCustomKey = async () => {
    try {
      return await AsyncStorage.getItem('custom_groq_api_key');
    } catch (e) {
      return null;
    }
  };

  const handleTranslate = async (text, sourceLang, targetLang) => {
    if (!text.trim()) return;

    setIsLoading(true);
    setResult(null);
    Keyboard.dismiss();
    
    const customKey = await getCustomKey();
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(customKey ? { 'x-api-key': customKey } : {})
        },
        body: JSON.stringify({ text, sourceLang, targetLang }),
      });

      const data = await response.json();

      if (response.ok) {
        const newItem = { 
          ...data,
          id: Date.now().toString(),
          targetLang: targetLang, // Guardamos el idioma para filtrar después
        };
        setResult(newItem);
        if (onSuccess) onSuccess(newItem);
      } else {
        throw new Error(data.error || 'Error en la traducción');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert(
        "Error de Conexión",
        "No se pudo conectar con el servidor. " + error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getTagExplanation = async (tag, phrase) => {
    setIsTagLoading(true);
    setTagInfo(null);
    
    const customKey = await getCustomKey();
    
    try {
      const response = await fetch(EXPLAIN_TAG_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(customKey ? { 'x-api-key': customKey } : {})
        },
        body: JSON.stringify({ tag, phrase }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setTagInfo(data);
        return data;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Tag Error:', error);
      Alert.alert("Error", "No se pudo obtener la explicación.");
      return null;
    } finally {
      setIsTagLoading(false);
    }
  };

  return { 
    isLoading, 
    result, 
    setResult, 
    handleTranslate, 
    isTagLoading, 
    tagInfo, 
    setTagInfo,
    getTagExplanation 
  };
};
