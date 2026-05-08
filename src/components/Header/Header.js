import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { styles as createStyles } from './Header.styles';

const Header = ({ colors, isDarkMode, toggleTheme, onOpenHistory, onOpenSettings, hasHistory }) => {
  const styles = createStyles(colors, isDarkMode);

  return (
    <Animated.View 
      entering={FadeInDown.delay(200).duration(800)}
      style={styles.header}
    >
      <View>
        <Text style={styles.headerSubtitle}>Bilingual Tutor</Text>
        <Text style={styles.headerTitle}>Traductor Pro</Text>
      </View>
      <View style={styles.headerActions}>
        <TouchableOpacity 
          style={styles.headerActionButton}
          onPress={toggleTheme}
        >
          <Ionicons 
            name={isDarkMode ? "sunny" : "moon"} 
            size={24} 
            color={isDarkMode ? "#FFD700" : "#4A90E2"} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.headerActionButton}
          onPress={onOpenSettings}
        >
          <Ionicons name="settings-outline" size={24} color="#4A90E2" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.historyTrigger}
          onPress={onOpenHistory}
        >
          <Ionicons name="time-outline" size={26} color="#4A90E2" />
          {hasHistory && <View style={styles.historyBadge} />}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default Header;
