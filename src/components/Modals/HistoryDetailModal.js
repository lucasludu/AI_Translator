import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { sharedStyles as createSharedStyles } from './Modals.styles';
import { renderHighlightedText } from '../../utils/textHighlight';

const HistoryDetailModal = ({ 
  item, 
  onClose, 
  onSpeak, 
  onTagClick, 
  colors, 
  isDarkMode 
}) => {
  const sharedStyles = createSharedStyles(colors, isDarkMode);

  if (!item) return null;

  const styles = StyleSheet.create({
    mainCard: {
      backgroundColor: isDarkMode ? '#252525' : '#F8F9FA',
      borderRadius: 24,
      padding: 20,
      alignItems: 'center',
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    originalText: {
      fontSize: 18,
      color: colors.subtext,
      textAlign: 'center',
      fontWeight: '500',
    },
    translationText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
    },
    pronunciationBox: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      opacity: 0.7,
    },
    pronunciationText: {
      fontSize: 15,
      color: colors.subtext,
      fontStyle: 'italic',
      marginLeft: 6,
    },
    speakButton: {
      backgroundColor: '#4A90E2',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 16,
      marginTop: 20,
    },
    speakText: {
      color: '#FFF',
      fontWeight: 'bold',
      marginLeft: 8,
    },
    tutorSection: {
      marginBottom: 20,
      backgroundColor: isDarkMode ? '#252525' : '#F0F7FF',
      padding: 15,
      borderRadius: 20,
    },
    sectionTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginLeft: 8,
    },
    explanation: {
      fontSize: 16,
      color: colors.subtext,
      lineHeight: 24,
    },
    exampleSection: {
      backgroundColor: isDarkMode ? '#252525' : '#FFF9F0',
      borderRadius: 20,
      padding: 15,
      borderColor: isDarkMode ? '#333' : '#FFE4B5',
      borderWidth: 1,
      marginBottom: 20,
    },
    exampleLabel: {
      fontSize: 13,
      color: colors.text,
      marginBottom: 10,
      fontWeight: '700',
    },
    exampleRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: 12,
    },
    exampleTextContainer: {
      flex: 1,
      marginLeft: 10,
    },
    exampleText: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 22,
      fontWeight: '500',
    },
    exampleTranslationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 2,
    },
    exampleTranslationText: {
      fontSize: 15,
      color: colors.subtext,
      marginLeft: 6,
      fontStyle: 'italic',
    },
    tagContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 30,
    },
    tag: {
      backgroundColor: isDarkMode ? '#333' : '#EEF4FF',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 10,
      marginRight: 8,
      marginBottom: 8,
    },
    tagText: {
      color: '#4A90E2',
      fontWeight: '600',
      fontSize: 13,
    },
  });

  return (
    <Modal
      visible={!!item}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={sharedStyles.modalOverlay}>
        <Pressable style={sharedStyles.modalBackdrop} onPress={onClose} />
        <Animated.View 
          entering={FadeInDown.springify()}
          style={sharedStyles.modalContent}
        >
          <View style={sharedStyles.modalHeader}>
            <Text style={sharedStyles.modalSubtitle}>Detalles de la frase</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mainCard}>
              {renderHighlightedText(item.original, styles.originalText)}
              <Ionicons name="arrow-down" size={20} color="#4A90E2" style={{ marginVertical: 10 }} />
              {renderHighlightedText(item.traduccion, styles.translationText)}
              
              {item.pronunciacion && (
                <View style={styles.pronunciationBox}>
                  <Ionicons name="megaphone-outline" size={16} color="#4A90E2" />
                  <Text style={styles.pronunciationText}>{item.pronunciacion}</Text>
                </View>
              )}
              
              <TouchableOpacity 
                style={styles.speakButton}
                onPress={() => onSpeak(item.traduccion.replace(/<v[^>]*>|<\/v>/g, ''))}
              >
                <Ionicons name="volume-high" size={24} color="#FFF" />
                <Text style={styles.speakText}>Escuchar Pronunciación</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tutorSection}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="bulb" size={20} color="#4A90E2" />
                <Text style={styles.sectionTitle}>Explicación del Tutor</Text>
              </View>
              {renderHighlightedText(item.explicacion, styles.explanation)}
            </View>

            <View style={styles.exampleSection}>
              <Text style={styles.exampleLabel}>📚 Ejemplos de uso cotidiano:</Text>
              {item.ejemplos ? (
                item.ejemplos.map((ex, i) => (
                  <View key={i} style={styles.exampleRow}>
                    <Ionicons name="checkmark-circle-outline" size={18} color="#FFB347" style={{ marginTop: 2 }} />
                    <View style={styles.exampleTextContainer}>
                      {renderHighlightedText(typeof ex === 'string' ? ex : ex.frase, styles.exampleText)}
                      {typeof ex === 'object' && ex.traduccion && (
                        <View style={styles.exampleTranslationRow}>
                          <Ionicons name="arrow-forward" size={14} color="#A0C4FF" />
                          {renderHighlightedText(ex.traduccion, styles.exampleTranslationText)}
                        </View>
                      )}
                    </View>
                  </View>
                ))
              ) : item.ejemplo ? (
                <View style={styles.exampleRow}>
                  <Ionicons name="checkmark-circle-outline" size={18} color="#FFB347" />
                  <Text style={styles.exampleText}>{item.ejemplo}</Text>
                </View>
              ) : (
                <Text style={styles.exampleText}>No hay ejemplos guardados para esta frase.</Text>
              )}
            </View>

            <View style={styles.tagContainer}>
              {item.tags && item.tags.map((tag, i) => (
                <TouchableOpacity 
                  key={i} 
                  style={styles.tag}
                  onPress={() => onTagClick(tag)}
                >
                  <Text style={styles.tagText}>#{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default HistoryDetailModal;
