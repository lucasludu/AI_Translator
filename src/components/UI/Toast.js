import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const Toast = ({ message }) => {
  if (!message) return null;

  return (
    <Animated.View 
      entering={FadeInDown.springify().damping(15)} 
      exiting={FadeOut.duration(200)} 
      style={styles.toastContainer}
    >
      <Ionicons name="checkmark-circle" size={20} color="#FFF" style={styles.toastIcon} />
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: '#4A90E2', // Color azul primario de la app
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 9999,
    ...Platform.select({
      web: {
        boxShadow: '0px 4px 15px rgba(74, 144, 226, 0.3)',
      },
      default: {
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
      }
    }),
  },
  toastIcon: {
    marginRight: 8,
  },
  toastText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default Toast;
