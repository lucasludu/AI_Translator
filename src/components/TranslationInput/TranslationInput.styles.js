import { StyleSheet, Platform } from 'react-native';

export const styles = (colors, isDarkMode) => StyleSheet.create({
  inputCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 15,
    ...Platform.select({
      web: {
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      }
    }),
    elevation: 3,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  clearInputButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 5,
  },
  textInput: {
    fontSize: 18,
    color: colors.text,
    minHeight: 120,
    paddingTop: 10,
    paddingHorizontal: 5,
    paddingRight: 35,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
  actionButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginLeft: 15,
  },
  inputFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  micButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#EEF4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButtonActive: {
    backgroundColor: '#FF5A5F',
  },
  disabledButton: {
    backgroundColor: '#A0C4FF',
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
});
