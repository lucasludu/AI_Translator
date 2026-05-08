import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { sharedStyles as createSharedStyles } from './Modals.styles';
import { renderHighlightedText } from '../../utils/textHighlight';

const TagExplanationModal = ({ 
  isVisible, 
  onClose, 
  tagInfo, 
  isLoading, 
  onSpeak, 
  colors, 
  isDarkMode 
}) => {
  const sharedStyles = createSharedStyles(colors, isDarkMode);

  const styles = StyleSheet.create({
    tagModalContent: {
      backgroundColor: colors.card,
      borderRadius: 30,
      padding: 25,
      width: '100%',
      maxWidth: 400,
      maxHeight: '80%',
    },
    tagLoadingContainer: {
      padding: 40,
      alignItems: 'center',
    },
    tagLoadingText: {
      marginTop: 15,
      color: colors.subtext,
      fontSize: 16,
    },
    tagBadge: {
      backgroundColor: isDarkMode ? '#1E3A5F' : '#EEF4FF',
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 12,
      alignSelf: 'flex-start',
      marginBottom: 20,
    },
    tagBadgeText: {
      color: '#4A90E2',
      fontWeight: '700',
      fontSize: 16,
    },
    tagExplicacionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    tagExplicacionText: {
      fontSize: 16,
      color: colors.subtext,
      lineHeight: 24,
      marginBottom: 25,
    },
    tagEjemplosTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.subtext,
      marginBottom: 15,
    },
    tagEjemploCard: {
      backgroundColor: isDarkMode ? '#252525' : '#F8F9FA',
      padding: 15,
      borderRadius: 18,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    tagEjemploRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    tagEjemploEnText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginLeft: 8,
    },
    tagEjemploEsText: {
      fontSize: 14,
      color: colors.subtext,
      marginLeft: 28,
    },
    tagCloseButton: {
      backgroundColor: '#4A90E2',
      padding: 16,
      borderRadius: 15,
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 10,
    },
    tagCloseButtonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16,
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    }
  });

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.tagModalContent}>
          <View style={sharedStyles.modalHeader}>
            <Text style={sharedStyles.modalTitle}>Tutor de Gramática</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color={colors.text} />
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <View style={styles.tagLoadingContainer}>
              <ActivityIndicator size="large" color="#4A90E2" />
              <Text style={styles.tagLoadingText}>Consultando al tutor...</Text>
            </View>
          ) : tagInfo ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.tagBadge}>
                <Text style={styles.tagBadgeText}>#{tagInfo.titulo}</Text>
              </View>
              
              <Text style={styles.tagExplicacionTitle}>¿Qué es esto?</Text>
              {renderHighlightedText(tagInfo.explicacion, styles.tagExplicacionText)}

              <Text style={styles.tagEjemplosTitle}>Más ejemplos para practicar:</Text>
              {tagInfo.ejemplos.map((ej, idx) => (
                <View key={idx} style={styles.tagEjemploCard}>
                  <View style={styles.tagEjemploRow}>
                    <TouchableOpacity onPress={() => onSpeak(ej.en.replace(/<v[^>]*>|<\/v>/g, ''))}>
                      <Ionicons name="volume-medium-outline" size={20} color="#4A90E2" />
                    </TouchableOpacity>
                    <Text style={styles.tagEjemploEnText}>{renderHighlightedText(ej.en, styles.tagEjemploEnText)}</Text>
                  </View>
                  <Text style={styles.tagEjemploEsText}>{renderHighlightedText(ej.es, styles.tagEjemploEsText)}</Text>
                </View>
              ))}
              
              <TouchableOpacity 
                style={styles.tagCloseButton}
                onPress={onClose}
              >
                <Text style={styles.tagCloseButtonText}>Entendido</Text>
              </TouchableOpacity>
            </ScrollView>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

export default TagExplanationModal;
