import { StyleSheet } from 'react-native';

export const styles = (colors, isDarkMode) => StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerActionButton: {
    padding: 10,
    backgroundColor: isDarkMode ? '#333' : '#EEF4FF',
    borderRadius: 15,
  },
  historyTrigger: {
    padding: 10,
    backgroundColor: isDarkMode ? '#333' : '#EEF4FF',
    borderRadius: 15,
    position: 'relative',
  },
  historyBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5A5F',
    borderWidth: 2,
    borderColor: isDarkMode ? '#333' : '#EEF4FF',
  },
});
