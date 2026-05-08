import { StyleSheet, Platform } from 'react-native';

export const styles = (colors, isDarkMode) => StyleSheet.create({
  resultCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 20,
    ...Platform.select({
      web: {
        boxShadow: '0px 4px 12px rgba(74, 144, 226, 0.1)',
      },
      default: {
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      }
    }),
    elevation: 5,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: isDarkMode ? '#333' : 'rgba(74, 144, 226, 0.1)',
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  resultLabel: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  resultActions: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
    padding: 5,
  },
  mainTranslation: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  tutorTipsBox: {
    backgroundColor: isDarkMode ? '#252525' : '#F0F7FF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4A90E2',
    marginLeft: 6,
  },
  explanationText: {
    fontSize: 15,
    color: isDarkMode ? '#DDD' : '#444',
    lineHeight: 22,
  },
  exampleSection: {
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  exampleLabel: {
    fontSize: 13,
    color: isDarkMode ? '#888' : '#777',
    marginBottom: 4,
  },
  exampleRowWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  exampleTextContainer: {
    flex: 1,
    marginLeft: 6,
  },
  exampleText: {
    fontSize: 15,
    color: isDarkMode ? '#DDD' : '#444',
  },
  exampleTranslationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  exampleTranslationText: {
    fontSize: 14,
    color: '#777',
    marginLeft: 4,
    fontStyle: 'italic',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: isDarkMode ? '#252525' : '#EEF4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: isDarkMode ? '#333' : '#D0E2FF',
    ...Platform.select({
      web: { cursor: 'pointer' }
    }),
  },
  tagText: {
    fontSize: 13,
    color: '#4A90E2',
    fontWeight: '600',
  },
});
