import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Clipboard,
} from 'react-native';
import * as Speech from 'expo-speech';

// Hooks
import { useTheme } from './src/hooks/useTheme';
import { useHistory } from './src/hooks/useHistory';
import { useTranslate } from './src/hooks/useTranslate';
import { useVoiceInput } from './src/hooks/useVoiceInput';

// Components
import Header from './src/components/Header/Header';
import TranslationInput from './src/components/TranslationInput/TranslationInput';
import ResultCard from './src/components/ResultCard/ResultCard';
import HistoryModal from './src/components/Modals/HistoryModal';
import HistoryDetailModal from './src/components/Modals/HistoryDetailModal';
import TagExplanationModal from './src/components/Modals/TagExplanationModal';
import DeleteConfirmationModal from './src/components/Modals/DeleteConfirmationModal';
import SettingsModal from './src/components/Modals/SettingsModal';
import Toast from './src/components/UI/Toast';
import LanguageSelector from './src/components/LanguageSelector/LanguageSelector';
import PracticeModal from './src/components/Modals/PracticeModal';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
  const [isTagModalVisible, setIsTagModalVisible] = useState(false);
  const [isPracticeVisible, setIsPracticeVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimeoutRef = useRef(null);

  // Idiomas
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('en');

  // Ref para controlar si la traducción fue por voz
  const isVoiceInitiated = useRef(false);

  // Hooks usage
  const { isDarkMode, toggleTheme, colors, isLoaded } = useTheme();
  const { history, addToHistory, deleteHistoryItem, clearHistory, toggleFavorite } = useHistory();
  
  const {
    isLoading,
    result,
    setResult,
    handleTranslate,
    isTagLoading,
    tagInfo,
    getTagExplanation
  } = useTranslate((newItem) => {
    addToHistory(newItem);
    // Si fue por voz, reproducir automáticamente
    if (isVoiceInitiated.current) {
      handleSpeak(newItem.traduccion);
      isVoiceInitiated.current = false;
    }
  });

  const { isListening, startVoiceInput } = useVoiceInput((text) => {
    setInputText(text);
    isVoiceInitiated.current = true; // Marcamos que fue por voz
    setTimeout(() => handleTranslate(text, sourceLang, targetLang), 500);
  });

  const handleSwapLanguages = () => {
    if (sourceLang === 'auto') {
      setSourceLang(targetLang);
      setTargetLang('es'); // Default swap
    } else {
      const prevSource = sourceLang;
      setSourceLang(targetLang);
      setTargetLang(prevSource);
    }
  };

  const showToast = (message) => {
    setToastMessage(message);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToastMessage(null), 2500);
  };

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    showToast("Copiado al portapapeles");
  };

  const handleSpeak = (text) => {
    Speech.speak(text, { language: 'en-US', pitch: 1, rate: 0.9 });
  };

  const handleTagClick = async (tag) => {
    setIsTagModalVisible(true);
    const phrase = result?.original || selectedHistoryItem?.original || "";
    await getTagExplanation(tag, phrase);
  };

  if (!isLoaded) return null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Header
            colors={colors}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
            onOpenHistory={() => setIsHistoryVisible(true)}
            onOpenSettings={() => setIsSettingsVisible(true)}
            hasHistory={history.length > 0}
          />

          <TranslationInput
            inputText={inputText}
            setInputText={setInputText}
            onTranslate={() => handleTranslate(inputText, sourceLang, targetLang)}
            isLoading={isLoading}
            isListening={isListening}
            onStartVoiceInput={startVoiceInput}
            colors={colors}
            isDarkMode={isDarkMode}
          />

          <LanguageSelector
            sourceLang={sourceLang}
            targetLang={targetLang}
            onSourceChange={setSourceLang}
            onTargetChange={setTargetLang}
            onSwap={handleSwapLanguages}
            colors={colors}
            isDarkMode={isDarkMode}
          />

          <ResultCard
            result={result}
            onSpeak={handleSpeak}
            onCopy={copyToClipboard}
            onToggleFavorite={() => {
              if (result) {
                toggleFavorite(result.id);
                showToast(result.isFavorite ? "Eliminado de favoritos" : "Agregado a favoritos");
              }
            }}
            onTagClick={handleTagClick}
            colors={colors}
            isDarkMode={isDarkMode}
          />

          {history.filter(item => item.isFavorite).length > 0 && !result && (
            <View style={styles.practiceButtonContainer}>
              <TouchableOpacity 
                style={styles.practiceButton}
                onPress={() => setIsPracticeVisible(true)}
              >
                <Ionicons name="school" size={24} color="#FFF" />
                <View style={{ marginLeft: 15 }}>
                  <Text style={styles.practiceButtonTitle}>Modo Práctica</Text>
                  <Text style={styles.practiceButtonSub}>Estudia tus {history.filter(item => item.isFavorite).length} favoritos</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.5)" style={{ marginLeft: 'auto' }} />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <HistoryModal
        isVisible={isHistoryVisible}
        onClose={() => setIsHistoryVisible(false)}
        history={history}
        onSelectItem={(item) => {
          setSelectedHistoryItem(item);
          setIsHistoryVisible(false);
        }}
        onDeleteItem={deleteHistoryItem}
        onClearHistory={() => setShowDeleteConfirm(true)}
        onToggleFavorite={toggleFavorite}
        colors={colors}
        isDarkMode={isDarkMode}
      />

      <HistoryDetailModal
        item={selectedHistoryItem}
        onClose={() => setSelectedHistoryItem(null)}
        onSpeak={handleSpeak}
        onTagClick={handleTagClick}
        colors={colors}
        isDarkMode={isDarkMode}
      />

      <TagExplanationModal
        isVisible={isTagModalVisible}
        onClose={() => setIsTagModalVisible(false)}
        tagInfo={tagInfo}
        isLoading={isTagLoading}
        onSpeak={handleSpeak}
        colors={colors}
        isDarkMode={isDarkMode}
      />

      <DeleteConfirmationModal
        isVisible={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          clearHistory();
          setShowDeleteConfirm(false);
          setIsHistoryVisible(false);
        }}
        colors={colors}
        isDarkMode={isDarkMode}
      />

      <SettingsModal
        isVisible={isSettingsVisible}
        onClose={() => setIsSettingsVisible(false)}
        colors={colors}
        isDarkMode={isDarkMode}
      />

      <Toast message={toastMessage} />

      <PracticeModal 
        isVisible={isPracticeVisible}
        onClose={() => setIsPracticeVisible(false)}
        favorites={history.filter(item => item.isFavorite)}
        colors={colors}
        isDarkMode={isDarkMode}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  practiceButtonContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  practiceButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0px 10px 15px rgba(74, 144, 226, 0.3)',
      },
      default: {
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
      }
    }),
  },
  practiceButtonTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  practiceButtonSub: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    marginTop: 2,
  },
});
