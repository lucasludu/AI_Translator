import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SUPPORTED_LANGUAGES, getLanguage, AUTO_LANGUAGE } from '../../constants/languages';

const LanguageSelector = ({ sourceLang, targetLang, onSourceChange, onTargetChange, onSwap, colors, isDarkMode }) => {
  const styles = createStyles(colors, isDarkMode);
  
  const source = getLanguage(sourceLang);
  const target = getLanguage(targetLang);

  return (
    <View style={styles.container}>
      <View style={styles.selectorRow}>
        {/* Source Language */}
        <TouchableOpacity style={styles.langPicker} onPress={() => onSourceChange('auto')}>
          <View style={styles.langContent}>
            <Image source={{ uri: source.flag }} style={styles.flagIcon} />
            <Text style={styles.langText}>{source.name}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.swapButton} onPress={onSwap}>
          <Ionicons name="swap-horizontal" size={20} color="#4A90E2" />
        </TouchableOpacity>

        {/* Target Language */}
        <TouchableOpacity style={styles.langPicker}>
          <View style={styles.langContent}>
            <Image source={{ uri: target.flag }} style={styles.flagIcon} />
            <Text style={styles.langText}>{target.name}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        {/* Opción Auto para origen */}
        <TouchableOpacity
          style={[
            styles.pill,
            sourceLang === 'auto' && styles.pillActiveAuto
          ]}
          onPress={() => onSourceChange('auto')}
        >
          <Image source={{ uri: AUTO_LANGUAGE.flag }} style={styles.flagIconPill} />
          <Text style={[
            styles.pillText,
            sourceLang === 'auto' && styles.pillTextActive
          ]}>
            Detectar
          </Text>
        </TouchableOpacity>

        {SUPPORTED_LANGUAGES.map((lang) => (
          <TouchableOpacity
            key={lang.id}
            style={[
              styles.pill,
              targetLang === lang.id && styles.pillActive
            ]}
            onPress={() => onTargetChange(lang.id)}
          >
            <Image source={{ uri: lang.flag }} style={styles.flagIconPill} />
            <Text style={[
              styles.pillText,
              targetLang === lang.id && styles.pillTextActive
            ]}>
              {lang.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const createStyles = (colors, isDarkMode) => StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  selectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  langPicker: {
    flex: 1,
    alignItems: 'center',
  },
  langContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  flagIcon: {
    width: 20,
    height: 15,
    borderRadius: 2,
    marginRight: 8,
  },
  langText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  swapButton: {
    padding: 10,
    backgroundColor: isDarkMode ? 'rgba(74, 144, 226, 0.1)' : '#F0F7FF',
    borderRadius: 15,
  },
  scrollContainer: {
    marginTop: 5,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.card,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pillActive: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  pillActiveAuto: {
    backgroundColor: isDarkMode ? '#333' : '#E8E8E8',
    borderColor: '#4A90E2',
  },
  flagIconPill: {
    width: 18,
    height: 13,
    borderRadius: 2,
    marginRight: 6,
  },
  pillText: {
    fontSize: 14,
    color: colors.subtext,
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#FFF',
  },
});

export default LanguageSelector;
