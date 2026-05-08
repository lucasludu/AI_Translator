import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400;

export const styles = (colors, isDarkMode) => StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 5,
    paddingHorizontal: 2,
    zIndex: 100,
  },
  titleContainer: {
    flex: 1,
    marginRight: 10,
  },
  headerSubtitle: {
    fontSize: isSmallScreen ? 11 : 13,
    color: '#4A90E2',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: isSmallScreen ? 22 : 26,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: isSmallScreen ? 6 : 10,
  },
  headerActionButton: {
    padding: isSmallScreen ? 8 : 10,
    backgroundColor: isDarkMode ? '#1E1E1E' : '#EEF4FF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: isDarkMode ? '#2A2A2A' : '#E0E7FF',
  },
  historyTrigger: {
    padding: isSmallScreen ? 8 : 10,
    backgroundColor: isDarkMode ? '#1E1E1E' : '#EEF4FF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: isDarkMode ? '#2A2A2A' : '#E0E7FF',
    position: 'relative',
  },
  historyBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#FF5A5F',
    borderWidth: 1.5,
    borderColor: isDarkMode ? '#1E1E1E' : '#EEF4FF',
  },
  menuContainer: {
    position: 'relative',
    zIndex: 100, // Ensure menu is above other content
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    right: 0,
    width: 160,
    backgroundColor: isDarkMode ? '#252525' : '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: isDarkMode ? '#333' : '#E5E7EB',
    ...Platform.select({
      web: {
        boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.2)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 8,
      }
    }),
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? '#333' : '#F3F4F6',
  },
  dropdownItemLast: {
    borderBottomWidth: 0,
  },
  dropdownItemText: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 12,
  },
});

