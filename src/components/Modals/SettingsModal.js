import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sharedStyles } from './Modals.styles';

const SettingsModal = ({ isVisible, onClose, colors, isDarkMode }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  
  // Corregimos la forma de obtener los estilos compartidos
  const modalStyles = sharedStyles(colors, isDarkMode);

  useEffect(() => {
    if (isVisible) {
      loadApiKey();
    }
  }, [isVisible]);

  const loadApiKey = async () => {
    try {
      const savedKey = await AsyncStorage.getItem('custom_groq_api_key');
      if (savedKey) setApiKey(savedKey);
    } catch (error) {
      console.error('Error loading API key:', error);
    }
  };

  const saveApiKey = async () => {
    try {
      if (apiKey.trim()) {
        await AsyncStorage.setItem('custom_groq_api_key', apiKey.trim());
      } else {
        await AsyncStorage.removeItem('custom_groq_api_key');
      }
      onClose();
    } catch (error) {
      console.error('Error saving API key:', error);
    }
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={[modalStyles.modalOverlay, { backgroundColor: 'rgba(0,0,0,0.8)' }]}>
          <TouchableOpacity 
            style={StyleSheet.absoluteFill} 
            activeOpacity={1} 
            onPress={onClose} 
          />
          <View style={[modalStyles.modalContent, styles.modalCustom]}>
            <View style={modalStyles.modalHeader}>
              <View style={styles.titleContainer}>
                <View style={[styles.iconCircle, { backgroundColor: colors.accent + '20' }]}>
                  <Ionicons name="settings" size={20} color={colors.accent} />
                </View>
                <Text style={modalStyles.modalTitle}>Ajustes</Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>API de Groq Personalizada</Text>
                <Text style={[styles.description, { color: isDarkMode ? '#CCC' : colors.subtext }]}>
                  Ingresa tu propia API Key para usar tus créditos personales. Se guardará de forma segura en este dispositivo.
                </Text>

                <View style={styles.inputWrapper}>
                  <Text style={[styles.label, { color: colors.accent }]}>Groq API Key</Text>
                  <View style={[styles.inputContainer, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#F5F7FA', borderColor: colors.border }]}>
                    <Ionicons name="key-outline" size={20} color={colors.subtext} style={{ marginRight: 10 }} />
                    <TextInput
                      style={[
                        styles.input, 
                        { color: colors.text },
                        Platform.OS === 'web' && { outlineStyle: 'none' }
                      ]}
                      placeholder="gsk_..."
                      placeholderTextColor="#666"
                      value={apiKey}
                      onChangeText={setApiKey}
                      secureTextEntry={!showKey}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <TouchableOpacity onPress={() => setShowKey(!showKey)} style={styles.eyeIcon}>
                      <Ionicons name={showKey ? "eye-off-outline" : "eye-outline"} size={22} color={colors.subtext} />
                    </TouchableOpacity>
                  </View>
                  <Text style={[styles.helpText, { color: isDarkMode ? '#999' : '#888' }]}>
                    La clave debe empezar con "gsk_". Consíguela en console.groq.com
                  </Text>
                </View>

                <TouchableOpacity 
                  style={[styles.saveButton, { backgroundColor: colors.accent }]} 
                  onPress={saveApiKey}
                >
                  <Text style={styles.saveButtonText}>Guardar Configuración</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.clearButton} 
                  onPress={() => setApiKey('')}
                >
                  <Text style={[styles.clearButtonText, { color: isDarkMode ? '#FF8A8A' : '#E53935' }]}>Restablecer Clave</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.infoBox, { backgroundColor: isDarkMode ? 'rgba(74, 144, 226, 0.2)' : '#F0F7FF' }]}>
                <Ionicons name="information-circle" size={20} color="#4A90E2" />
                <Text style={[styles.infoText, { color: isDarkMode ? '#99CCFF' : '#2C5E9E' }]}>
                  Si dejas este campo vacío, la app usará la clave del servidor por defecto.
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalCustom: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 25,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 25,
    opacity: 0.8,
  },
  inputWrapper: {
    marginBottom: 25,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1.5,
    paddingHorizontal: 15,
    height: 60,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  eyeIcon: {
    padding: 10,
  },
  helpText: {
    fontSize: 12,
    color: '#888',
    marginTop: 10,
    marginLeft: 4,
    fontStyle: 'italic',
  },
  saveButton: {
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    ...Platform.select({
      web: { boxShadow: '0px 10px 20px rgba(74, 144, 226, 0.3)' },
      default: { elevation: 4 }
    })
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
  clearButton: {
    padding: 15,
    alignItems: 'center',
    marginTop: 5,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  infoBox: {
    flexDirection: 'row',
    padding: 18,
    borderRadius: 18,
    marginTop: 25,
    marginBottom: 40,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 13,
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
    fontWeight: '500',
  }
});

export default SettingsModal;
