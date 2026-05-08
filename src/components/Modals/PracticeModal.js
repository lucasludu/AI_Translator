import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring, 
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { sharedStyles } from './Modals.styles';

const { width } = Dimensions.get('window');

const PracticeModal = ({ isVisible, onClose, favorites, colors, isDarkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const rotateY = useSharedValue(0);

  const currentItem = favorites[currentIndex];

  useEffect(() => {
    if (isVisible) {
      setCurrentIndex(0);
      setIsFlipped(false);
      rotateY.value = 0;
    }
  }, [isVisible]);

  const flipCard = () => {
    rotateY.value = withSpring(isFlipped ? 0 : 180, { damping: 15 });
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    if (currentIndex < favorites.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      rotateY.value = 0;
    } else {
      onClose(); // Terminó la sesión
    }
  };

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const spin = interpolate(rotateY.value, [0, 180], [0, 180], Extrapolate.CLAMP);
    return {
      transform: [{ rotateY: `${spin}deg` }],
      opacity: rotateY.value <= 90 ? 1 : 0,
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const spin = interpolate(rotateY.value, [0, 180], [-180, 0], Extrapolate.CLAMP);
    return {
      transform: [{ rotateY: `${spin}deg` }],
      opacity: rotateY.value > 90 ? 1 : 0,
    };
  });

  if (!currentItem) return null;

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={[sharedStyles.modalOverlay, { backgroundColor: 'rgba(0,0,0,0.9)' }]}>
        <View style={styles.header}>
          <Text style={styles.progressText}>
            Frase {currentIndex + 1} de {favorites.length}
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          <TouchableOpacity activeOpacity={1} onPress={flipCard} style={styles.cardWrapper}>
            {/* Front Card */}
            <Animated.View style={[styles.card, { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF' }, frontAnimatedStyle]}>
              <Text style={styles.cardLabel}>Original</Text>
              <Text style={[styles.cardText, { color: colors.text }]}>
                {currentItem.original.replace(/<v[^>]*>|<\/v>/g, '')}
              </Text>
              <Text style={styles.hintText}>Toca para ver la traducción</Text>
            </Animated.View>

            {/* Back Card */}
            <Animated.View style={[styles.card, styles.cardBack, { backgroundColor: '#4A90E2' }, backAnimatedStyle]}>
              <Text style={[styles.cardLabel, { color: 'rgba(255,255,255,0.7)' }]}>Traducción</Text>
              <Text style={[styles.cardText, { color: '#FFF' }]}>
                {currentItem.traduccion.replace(/<v[^>]*>|<\/v>/g, '')}
              </Text>
              <Ionicons name="checkmark-circle" size={40} color="#FFF" style={{ marginTop: 20 }} />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.nextButton} onPress={nextCard}>
            <Text style={styles.nextButtonText}>
              {currentIndex === favorites.length - 1 ? 'Finalizar' : 'Siguiente frase'}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    position: 'absolute',
    top: 0,
  },
  progressText: {
    color: '#AAA',
    fontSize: 16,
    fontWeight: '600',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 100, // Espacio para el header
    paddingBottom: 120, // Espacio para el footer
  },
  cardWrapper: {
    width: width * 0.85,
    flex: 1, // Permite que la tarjeta tome la altura restante de forma segura
    maxHeight: 450,
    minHeight: 300, // Evita que se encoja demasiado en pantallas extremas
    position: 'relative',
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 30,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
      }
    }),
  },
  cardBack: {
    transform: [{ rotateY: '180deg' }],
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#4A90E2',
    marginBottom: 20,
    position: 'absolute',
    top: 30,
  },
  cardText: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 38,
  },
  hintText: {
    position: 'absolute',
    bottom: 30,
    color: '#999',
    fontSize: 14,
  },
  footer: {
    width: '100%',
    padding: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  nextButton: {
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 10,
  },
});

export default PracticeModal;
