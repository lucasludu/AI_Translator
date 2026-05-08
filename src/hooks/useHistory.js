import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HISTORY_KEY } from '../constants/api';

export const useHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      let savedHistory;
      if (Platform.OS === 'web') {
        savedHistory = localStorage.getItem(HISTORY_KEY);
      } else {
        savedHistory = await AsyncStorage.getItem(HISTORY_KEY);
      }
      
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const saveHistory = async (newHistory) => {
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      } else {
        await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      }
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };

  const addToHistory = (item) => {
    setHistory(prevHistory => {
      const updated = [item, ...prevHistory.slice(0, 19)];
      saveHistory(updated);
      return updated;
    });
  };

  const deleteHistoryItem = (id) => {
    setHistory(prevHistory => {
      const updated = prevHistory.filter(item => item.id !== id);
      saveHistory(updated);
      return updated;
    });
  };

  const clearHistory = async () => {
    setHistory([]);
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(HISTORY_KEY);
      } else {
        await AsyncStorage.removeItem(HISTORY_KEY);
      }
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  const toggleFavorite = (id) => {
    setHistory(prevHistory => {
      const updated = prevHistory.map(item => 
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      );
      saveHistory(updated);
      return updated;
    });
  };

  return { history, addToHistory, deleteHistoryItem, clearHistory, toggleFavorite };
};
