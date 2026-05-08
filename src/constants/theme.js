export const COLORS = {
  accent: '#4A90E2',
  error: '#FF5A5F',
  success: '#4CAF50',
  warning: '#FFB347',
};

export const getThemeColors = (isDarkMode) => ({
  bg: isDarkMode ? '#121212' : '#F8F9FA',
  card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
  text: isDarkMode ? '#FFFFFF' : '#1A1A1A',
  subtext: isDarkMode ? '#AAAAAA' : '#666666',
  border: isDarkMode ? '#333333' : '#EEEEEE',
  inputBg: isDarkMode ? '#252525' : '#FFFFFF',
  accent: COLORS.accent,
});
