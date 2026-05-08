import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { THEME_KEY } from '../constants/api';
import { getThemeColors } from '../constants/theme';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      let savedTheme;
      if (Platform.OS === 'web') {
        savedTheme = localStorage.getItem(THEME_KEY);
      } else {
        savedTheme = await AsyncStorage.getItem(THEME_KEY);
      }

      if (savedTheme !== null) {
        setIsDarkMode(JSON.parse(savedTheme));
      }
    } catch (e) {
      console.error('Error loading theme:', e);
    } finally {
      setIsLoaded(true);
    }
  };

  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem(THEME_KEY, JSON.stringify(newMode));
      } else {
        await AsyncStorage.setItem(THEME_KEY, JSON.stringify(newMode));
      }
    } catch (e) {
      console.error('Error saving theme:', e);
    }
  };

  const colors = getThemeColors(isDarkMode);

  return { isDarkMode, toggleTheme, colors, isLoaded };
};
