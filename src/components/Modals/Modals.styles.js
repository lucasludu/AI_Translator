import { StyleSheet, Platform } from 'react-native';

export const sharedStyles = (colors, isDarkMode) => StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 24,
    paddingTop: 10, // Menos espacio arriba para que el indicador de "drag" se vea bien si existiera
    maxHeight: '90%',
    ...Platform.select({
      web: {
        boxShadow: '0px -10px 30px rgba(0, 0, 0, 0.2)',
        borderTopWidth: 1,
        borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'transparent',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
      }
    }),
    elevation: 25,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  modalSubtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4A90E2',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
