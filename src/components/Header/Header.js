import React, { useState } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { styles as createStyles } from './Header.styles';

const Header = ({ colors, isDarkMode, toggleTheme, onOpenHistory, onOpenSettings, onLogout, hasHistory }) => {
  const styles = createStyles(colors, isDarkMode);
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 500;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Animated.View 
      entering={FadeInDown.delay(200).duration(800)}
      style={styles.header}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.headerSubtitle}>Bilingual Tutor</Text>
        <Text style={styles.headerTitle} numberOfLines={1}>Traductor Pro</Text>
      </View>
      
      <View style={styles.headerActions}>
        <TouchableOpacity 
          style={styles.historyTrigger}
          onPress={onOpenHistory}
        >
          <Ionicons name="time-outline" size={24} color="#4A90E2" />
          {hasHistory && <View style={styles.historyBadge} />}
        </TouchableOpacity>

        {isSmallScreen ? (
          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.headerActionButton}
              onPress={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Ionicons name="ellipsis-vertical" size={24} color="#4A90E2" />
            </TouchableOpacity>

            {isMenuOpen && (
              <Animated.View entering={FadeInUp.duration(200)} style={styles.dropdownMenu}>
                <TouchableOpacity 
                  style={styles.dropdownItem} 
                  onPress={() => { setIsMenuOpen(false); toggleTheme(); }}
                >
                  <Ionicons name={isDarkMode ? "sunny" : "moon"} size={20} color={isDarkMode ? "#FFD700" : "#4A90E2"} />
                  <Text style={[styles.dropdownItemText, { color: colors.text }]}>Tema</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.dropdownItem} 
                  onPress={() => { setIsMenuOpen(false); onOpenSettings(); }}
                >
                  <Ionicons name="settings-outline" size={20} color="#4A90E2" />
                  <Text style={[styles.dropdownItemText, { color: colors.text }]}>Ajustes</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.dropdownItem, styles.dropdownItemLast]} 
                  onPress={() => { setIsMenuOpen(false); onLogout(); }}
                >
                  <Ionicons name="log-out-outline" size={20} color="#FF5A5F" />
                  <Text style={[styles.dropdownItemText, { color: '#FF5A5F' }]}>Salir</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>
        ) : (
          <>
            <TouchableOpacity style={styles.headerActionButton} onPress={toggleTheme}>
              <Ionicons name={isDarkMode ? "sunny" : "moon"} size={24} color={isDarkMode ? "#FFD700" : "#4A90E2"} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.headerActionButton} onPress={onOpenSettings}>
              <Ionicons name="settings-outline" size={24} color="#4A90E2" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.headerActionButton} onPress={onLogout}>
              <Ionicons name="log-out-outline" size={24} color="#FF5A5F" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </Animated.View>
  );
};

export default Header;
