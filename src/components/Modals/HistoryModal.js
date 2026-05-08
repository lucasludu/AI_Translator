import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Pressable, TextInput, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated';
import { sharedStyles as createSharedStyles } from './Modals.styles';

import { SUPPORTED_LANGUAGES, getLanguage } from '../../constants/languages';

const HistoryModal = ({ 
  isVisible, 
  onClose, 
  history, 
  onSelectItem, 
  onDeleteItem, 
  onClearHistory, 
  onToggleFavorite,
  colors, 
  isDarkMode 
}) => {
  const sharedStyles = createSharedStyles(colors, isDarkMode);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedLang, setSelectedLang] = useState(null);

  const styles = StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#333' : '#F0F2F5',
      borderRadius: 12,
      paddingHorizontal: 12,
      marginBottom: 15,
    },
    searchInput: {
      flex: 1,
      paddingVertical: 10,
      marginLeft: 8,
      fontSize: 15,
      color: colors.text,
    },
    filtersContainer: {
      marginBottom: 15,
    },
    filterTag: {
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: isDarkMode ? '#333' : '#F0F2F5',
      marginRight: 8,
    },
    filterTagActive: {
      backgroundColor: '#4A90E2',
    },
    filterTagText: {
      color: colors.subtext,
      fontWeight: '600',
    },
    filterTagTextActive: {
      color: '#FFF',
    },
    historyItemWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    historyItem: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 15,
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      borderWidth: 1,
      borderColor: colors.border,
      position: 'relative',
    },
    historyTextContainer: {
      flex: 1,
      paddingRight: 10,
    },
    historyOriginal: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 2,
    },
    historyTranslation: {
      fontSize: 14,
      color: colors.subtext,
    },
    favoriteButtonInside: {
      padding: 8,
      marginLeft: 5,
    },
    deleteMiniButton: {
      padding: 8,
      marginLeft: 5,
      opacity: 0.4,
    },
    clearHistoryButton: {
      marginTop: 20,
      padding: 15,
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#331a1a' : '#FFF0F0',
      borderRadius: 15,
      marginBottom: 20,
    },
    clearHistoryText: {
      color: '#FF5A5F',
      fontWeight: '600',
      fontSize: 16,
    },
    emptyHistory: {
      padding: 40,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.5,
    },
    emptyHistoryText: {
      marginTop: 15,
      fontSize: 16,
      color: colors.subtext,
      textAlign: 'center',
    },
  });

  const filteredHistory = history.filter(item => {
    const matchesSearch = 
      item.original.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.traduccion.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesTag = !selectedTag || (selectedTag === 'Favoritos' ? item.isFavorite : (item.tags && item.tags.includes(selectedTag)));
    
    let matchesLang = !selectedLang || item.targetLang === selectedLang;
    
    return matchesSearch && matchesTag && matchesLang;
  });

  const allTags = Array.from(new Set(history.flatMap(item => item.tags || [])));
  const languagesInHistory = Array.from(new Set(history.map(item => item.targetLang).filter(Boolean)));

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={sharedStyles.modalOverlay}>
        <Pressable style={sharedStyles.modalBackdrop} onPress={onClose} />
        <Animated.View 
          entering={FadeInDown.springify()}
          style={sharedStyles.modalContent}
        >
          <View style={sharedStyles.modalHeader}>
            <View>
              <Text style={sharedStyles.modalSubtitle}>Tus traducciones</Text>
              <Text style={sharedStyles.modalTitle}>Historial</Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle" size={32} color={isDarkMode ? "#666" : "#DDD"} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#999" />
            <TextInput 
              style={styles.searchInput}
              placeholder="Buscar en el historial..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.filtersContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity 
                style={[styles.filterTag, (!selectedTag && !selectedLang) && styles.filterTagActive]} 
                onPress={() => {
                  setSelectedTag(null);
                  setSelectedLang(null);
                }}
              >
                <Text style={[styles.filterTagText, (!selectedTag && !selectedLang) && styles.filterTagTextActive]}>Todos</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.filterTag, selectedTag === 'Favoritos' && styles.filterTagActive]} 
                onPress={() => setSelectedTag(selectedTag === 'Favoritos' ? null : 'Favoritos')}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons 
                    name={selectedTag === 'Favoritos' ? "heart" : "heart-outline"} 
                    size={14} 
                    color={selectedTag === 'Favoritos' ? "#FFF" : "#FF5A5F"} 
                    style={{ marginRight: 4 }}
                  />
                  <Text style={[styles.filterTagText, selectedTag === 'Favoritos' && styles.filterTagTextActive]}>Favoritos</Text>
                </View>
              </TouchableOpacity>

              {/* Filtros de Idiomas */}
              {languagesInHistory.map(langCode => {
                const langInfo = getLanguage(langCode);
                return (
                  <TouchableOpacity 
                    key={langCode}
                    style={[styles.filterTag, selectedLang === langCode && styles.filterTagActive]} 
                    onPress={() => setSelectedLang(selectedLang === langCode ? null : langCode)}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image 
                        source={{ uri: langInfo.flag }} 
                        style={{ width: 18, height: 12, borderRadius: 2, marginRight: 6 }} 
                      />
                      <Text style={[styles.filterTagText, selectedLang === langCode && styles.filterTagTextActive]}>
                        {langInfo.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}

              {allTags.map(tag => (
                <TouchableOpacity 
                  key={tag}
                  style={[styles.filterTag, selectedTag === tag && styles.filterTagActive]} 
                  onPress={() => setSelectedTag(tag === selectedTag ? null : tag)}
                >
                  <Text style={[styles.filterTagText, selectedTag === tag && styles.filterTagTextActive]}>#{tag}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {history.length > 0 ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              {filteredHistory.map((item, index) => (
                <Animated.View 
                  key={item.id}
                  entering={FadeInLeft.delay(index * 50)}
                >
                  <View style={styles.historyItemWrapper}>
                    <View style={styles.historyItem}>
                      <TouchableOpacity 
                        style={styles.historyTextContainer}
                        onPress={() => onSelectItem(item)}
                      >
                        <Text style={styles.historyOriginal} numberOfLines={1}>
                          {item.original.replace(/<v[^>]*>|<\/v>/g, '')}
                        </Text>
                        <Text style={styles.historyTranslation} numberOfLines={1}>
                          {item.traduccion.replace(/<v[^>]*>|<\/v>/g, '')}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={styles.favoriteButtonInside}
                        onPress={() => onToggleFavorite(item.id)}
                      >
                        <Ionicons 
                          name={item.isFavorite ? "heart" : "heart-outline"} 
                          size={20} 
                          color="#FF5A5F" 
                        />
                      </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity 
                      style={styles.deleteMiniButton}
                      onPress={() => onDeleteItem(item.id)}
                    >
                      <Ionicons name="close-outline" size={20} color={isDarkMode ? "#AAA" : "#666"} />
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              ))}
              <TouchableOpacity style={styles.clearHistoryButton} onPress={onClearHistory}>
                <Text style={styles.clearHistoryText}>Borrar todo el historial</Text>
              </TouchableOpacity>
            </ScrollView>
          ) : (
            <View style={styles.emptyHistory}>
              <Ionicons name="time-outline" size={64} color="#EEE" />
              <Text style={styles.emptyHistoryText}>No tienes traducciones guardadas</Text>
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default HistoryModal;
