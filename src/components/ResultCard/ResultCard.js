import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { SlideInRight, FadeOut } from 'react-native-reanimated';
import { styles as createStyles } from './ResultCard.styles';
import { renderHighlightedText } from '../../utils/textHighlight';

const ResultCard = ({ 
  result, 
  onSpeak, 
  onCopy, 
  onToggleFavorite, 
  onTagClick, 
  colors, 
  isDarkMode 
}) => {
  const styles = createStyles(colors, isDarkMode);

  if (!result) return null;

  return (
    <Animated.View 
      key={result.id || Date.now()} 
      entering={SlideInRight.springify().damping(15)}
      exiting={FadeOut.duration(200)}
      style={styles.resultCard}
    >
      <View style={styles.resultHeader}>
        <Text style={styles.resultLabel}>Frase Original</Text>
      </View>
      {renderHighlightedText(result.original, { color: colors.text })}
      
      <Ionicons name="arrow-down" size={20} color="#4A90E2" style={{ marginVertical: 10, alignSelf: 'center' }} />
      
      <View style={styles.resultHeader}>
        <Text style={styles.resultLabel}>Traducción</Text>
        <View style={styles.resultActions}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => onSpeak(result.traduccion.replace(/<v[^a-zA-ZáéíóúñÁÉÍÓÚÑ]*|<\/v>/g, ''))}
          >
            <Ionicons name="volume-medium" size={26} color="#4A90E2" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => onCopy(result.traduccion.replace(/<v[^a-zA-ZáéíóúñÁÉÍÓÚÑ]*|<\/v>/g, ''))}
          >
            <Ionicons name="copy-outline" size={22} color="#4A90E2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={onToggleFavorite}>
            <Ionicons 
              name={result.isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color="#FF5A5F" 
            />
          </TouchableOpacity>
        </View>
      </View>
      
      {renderHighlightedText(result.traduccion, styles.mainTranslation)}
      
      <View style={styles.tutorTipsBox}>
        <View style={styles.tipHeader}>
          <Ionicons name="bulb-outline" size={18} color="#4A90E2" />
          <Text style={styles.tipTitle}>Tips del Tutor</Text>
        </View>
        {renderHighlightedText(result.explicacion, styles.explanationText)}
      </View>

      <View style={styles.exampleSection}>
        <Text style={styles.exampleLabel}>Ejemplos de uso:</Text>
        {result.ejemplos ? (
          result.ejemplos.map((ex, i) => (
            <View key={i} style={styles.exampleRowWrapper}>
              <Ionicons name="caret-forward-outline" size={14} color="#FFB347" style={{ marginTop: 2 }} />
              <View style={styles.exampleTextContainer}>
                {renderHighlightedText(typeof ex === 'string' ? ex : ex.frase, styles.exampleText)}
                {typeof ex === 'object' && ex.traduccion && (
                  <View style={styles.exampleTranslationRow}>
                    <Ionicons name="arrow-forward" size={12} color="#A0C4FF" />
                    {renderHighlightedText(ex.traduccion, styles.exampleTranslationText)}
                  </View>
                )}
              </View>
            </View>
          ))
        ) : result.ejemplo ? (
          <View style={styles.exampleRowWrapper}>
            <Ionicons name="caret-forward-outline" size={14} color="#FFB347" />
            <Text style={styles.exampleText}>{result.ejemplo}</Text>
          </View>
        ) : (
          <Text style={styles.exampleText}>No hay ejemplos disponibles</Text>
        )}
      </View>

      <View style={styles.tagContainer}>
        {result.tags && result.tags.map((tag, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.tag}
            onPress={() => onTagClick(tag)}
          >
            <Text style={styles.tagText}>#{tag}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
};

export default ResultCard;
