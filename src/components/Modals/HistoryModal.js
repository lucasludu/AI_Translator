import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Pressable, TextInput, StyleSheet, Image, Platform } from 'react-native';
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
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#F0F2F5',
      borderRadius: 15,
      paddingHorizontal: 15,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'transparent',
    },
    searchInput: {
      flex: 1,
      paddingVertical: 12,
      marginLeft: 10,
      fontSize: 16,
      color: colors.text,
    },
    filtersContainer: {
      marginBottom: 20,
    },
    filterTag: {
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 25,
      backgroundColor: isDarkMode ? '#2A2A2A' : '#FFF',
      marginRight: 10,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: isDarkMode ? '#333' : '#EEE',
      ...Platform.select({
        web: { boxShadow: '0px 2px 5px rgba(0,0,0,0.05)' },
        default: { elevation: 2 }
      })
    },
    filterTagActive: {
      backgroundColor: '#4A90E2',
      borderColor: '#4A90E2',
    },
    filterTagText: {
      color: colors.subtext,
      fontWeight: '700',
      fontSize: 13,
    },
    filterTagTextActive: {
      color: '#FFF',
    },
    historyItemWrapper: {
      marginBottom: 12,
    },
    historyItem: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 18,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(74,144,226,0.1)',
      ...Platform.select({
        web: { boxShadow: '0px 4px 10px rgba(0,0,0,0.05)' },
        default: { elevation: 3 }
      })
    },
    historyTextContainer: {
      flex: 1,
    },
    langIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
    },
    langCode: {
      fontSize: 10,
      fontWeight: '800',
      color: '#4A90E2',
      marginLeft: 5,
      textTransform: 'uppercase',
    },
    historyOriginal: {
      fontSize: 17,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 4,
      letterSpacing: -0.3,
    },
    historyTranslation: {
      fontSize: 15,
      color: colors.subtext,
      lineHeight: 20,
    },
    rightActions: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
    },
    favoriteButtonInside: {
      padding: 10,
      borderRadius: 12,
      backgroundColor: isDarkMode ? 'rgba(255,90,95,0.1)' : '#FFF0F0',
    },
    deleteMiniButton: {
      padding: 10,
      marginLeft: 8,
      borderRadius: 12,
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#F5F7FA',
    },
    clearHistoryButton: {
      marginTop: 25,
      padding: 18,
      alignItems: 'center',
      backgroundColor: isDarkMode ? 'rgba(255,90,95,0.05)' : '#FFF0F0',
      borderRadius: 18,
      marginBottom: 30,
      borderWidth: 1,
      borderColor: isDarkMode ? 'rgba(255,90,95,0.1)' : 'transparent',
    },
    clearHistoryText: {
      color: '#FF5A5F',
      fontWeight: '800',
      fontSize: 15,
      letterSpacing: 0.5,
    },
    emptyHistory: {
      paddingVertical: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyHistoryText: {
      marginTop: 20,
      fontSize: 17,
      fontWeight: '600',
      color: colors.subtext,
      textAlign: 'center',
      opacity: 0.7,
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
          <View style={{ width: 40, height: 5, backgroundColor: isDarkMode ? '#333' : '#EEE', borderRadius: 10, alignSelf: 'center', marginBottom: 15 }} />
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
              {filteredHistory.map((item, index) => {
                const langInfo = getLanguage(item.targetLang);
                return (
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
                          <View style={styles.langIndicator}>
                            <Image 
                              source={{ uri: langInfo.flag }} 
                              style={{ width: 14, height: 10, borderRadius: 1 }} 
                            />
                            <Text style={styles.langCode}>{langInfo.name}</Text>
                          </View>
                          <Text style={styles.historyOriginal} numberOfLines={2}>
                            {item.original.replace(/<v[^>]*>|<\/v>/g, '')}
                          </Text>
                          <Text style={styles.historyTranslation} numberOfLines={2}>
                            {item.traduccion.replace(/<v[^>]*>|<\/v>/g, '')}
                          </Text>
                        </TouchableOpacity>
  
                        <View style={styles.rightActions}>
                          <TouchableOpacity 
                            style={styles.favoriteButtonInside}
                            onPress={() => onToggleFavorite(item.id)}
                          >
                            <Ionicons 
                              name={item.isFavorite ? "heart" : "heart-outline"} 
                              size={18} 
                              color="#FF5A5F" 
                            />
                          </TouchableOpacity>
                          
                          <TouchableOpacity 
                            style={styles.deleteMiniButton}
                            onPress={() => onDeleteItem(item.id)}
                          >
                            <Ionicons name="trash-outline" size={18} color={isDarkMode ? "#AAA" : "#666"} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Animated.View>
                );
              })}
              <TouchableOpacity style={styles.clearHistoryButton} onPress={onClearHistory}>
                <Ionicons name="trash-bin-outline" size={20} color="#FF5A5F" style={{ marginBottom: 5 }} />
                <Text style={styles.clearHistoryText}>LIMPIAR TODO EL HISTORIAL</Text>
              </TouchableOpacity>
            </ScrollView>
          ) : (
            <View style={styles.emptyHistory}>
              <View style={{ backgroundColor: isDarkMode ? '#252525' : '#F0F2F5', padding: 30, borderRadius: 50, marginBottom: 10 }}>
                <Ionicons name="time-outline" size={60} color={isDarkMode ? "#444" : "#CCC"} />
              </View>
              <Text style={styles.emptyHistoryText}>Tu historial está vacío</Text>
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default HistoryModal;
