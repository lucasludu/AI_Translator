import React from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { styles as createStyles } from './TranslationInput.styles';

const TranslationInput = ({ 
  inputText, 
  setInputText, 
  onTranslate, 
  isLoading, 
  isListening, 
  onStartVoiceInput, 
  colors, 
  isDarkMode 
}) => {
  const styles = createStyles(colors, isDarkMode);

  return (
    <Animated.View 
      entering={FadeInDown.delay(400).duration(800)}
      style={styles.inputCard}
    >
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder="Escribe o dicta algo para traducir..."
          placeholderTextColor={isDarkMode ? "#666" : "#999"}
          multiline
          value={inputText}
          onChangeText={setInputText}
          textAlignVertical="top"
        />
        {inputText.length > 0 && (
          <TouchableOpacity 
            style={styles.clearInputButton} 
            onPress={() => setInputText('')}
          >
            <Ionicons name="close-circle" size={20} color="#CCC" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.inputFooter}>
        <TouchableOpacity 
          style={[styles.micButton, isListening && styles.micButtonActive]} 
          onPress={onStartVoiceInput}
        >
          <Ionicons 
            name={isListening ? "mic" : "mic-outline"} 
            size={24} 
            color={isListening ? "#FFF" : "#4A90E2"} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, !inputText.trim() && styles.disabledButton]} 
          onPress={() => onTranslate()}
          disabled={isLoading || (!inputText.trim() && !isListening)}
        >
          <Text style={styles.actionButtonText}>
            {isLoading ? 'Procesando...' : 'Traducir Frase'}
          </Text>
          {isLoading ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
          )}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default TranslationInput;
