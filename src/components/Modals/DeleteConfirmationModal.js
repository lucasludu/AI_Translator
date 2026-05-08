import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

const DeleteConfirmationModal = ({ 
  isVisible, 
  onClose, 
  onConfirm, 
  colors, 
  isDarkMode 
}) => {
  const styles = StyleSheet.create({
    confirmOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    confirmCard: {
      backgroundColor: colors.card,
      borderRadius: 25,
      padding: 25,
      width: '100%',
      maxWidth: 340,
      alignItems: 'center',
      elevation: 10,
    },
    confirmIconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: isDarkMode ? '#331a1a' : '#FFF0F0',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    confirmTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 10,
    },
    confirmSubtitle: {
      fontSize: 15,
      color: colors.subtext,
      textAlign: 'center',
      lineHeight: 22,
      marginBottom: 25,
    },
    confirmButtons: {
      flexDirection: 'row',
      width: '100%',
      gap: 12,
    },
    cancelButton: {
      flex: 1,
      padding: 15,
      borderRadius: 12,
      backgroundColor: isDarkMode ? '#333' : '#F5F7FA',
      alignItems: 'center',
    },
    cancelButtonText: {
      color: colors.subtext,
      fontWeight: '600',
      fontSize: 15,
    },
    confirmDeleteButton: {
      flex: 1,
      padding: 15,
      borderRadius: 12,
      backgroundColor: '#FF5A5F',
      alignItems: 'center',
    },
    confirmDeleteText: {
      color: '#FFF',
      fontWeight: '600',
      fontSize: 15,
    },
  });

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.confirmOverlay}>
        <Animated.View 
          entering={FadeInDown.springify()}
          style={styles.confirmCard}
        >
          <View style={styles.confirmIconContainer}>
            <Ionicons name="trash" size={40} color="#FF5A5F" />
          </View>
          <Text style={styles.confirmTitle}>¿Borrar historial?</Text>
          <Text style={styles.confirmSubtitle}>
            Esta acción eliminará todas tus traducciones guardadas y no se puede deshacer.
          </Text>
          
          <View style={styles.confirmButtons}>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.confirmDeleteButton} 
              onPress={onConfirm}
            >
              <Text style={styles.confirmDeleteText}>Sí, borrar todo</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default DeleteConfirmationModal;
