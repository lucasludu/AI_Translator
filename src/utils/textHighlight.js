import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const renderHighlightedText = (text, textStyle, highlightStyle) => {
  if (!text) return null;
  if (typeof text !== 'string') return <Text style={textStyle}>{String(text)}</Text>;
  
  // Divide por etiquetas bien formadas O por aperturas mal formadas hasta el próximo espacio
  const parts = text.split(/(<v.*?<\/v>|<v[^\s]+)/g);
  
  return (
    <Text style={textStyle}>
      {parts.map((part, index) => {
        if (part.startsWith('<v')) {
          // Extrae la basura inicial, el verbo en sí, y cualquier puntuación o cierre al final
          const match = part.match(/^<v[^a-zA-ZáéíóúñÁÉÍÓÚÑ]*([a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+)(.*)$/);
          if (match) {
            const verb = match[1];
            const trailing = match[2].replace(/<\/v>$/, ''); // Limpia el tag de cierre si existe
            
            return (
              <Text key={index}>
                <Text style={[textStyle, styles.verbHighlight, highlightStyle]}>{verb}</Text>
                {trailing}
              </Text>
            );
          }
        }
        return part;
      })}
    </Text>
  );
};

const styles = StyleSheet.create({
  verbHighlight: {
    color: '#FFB347',
    backgroundColor: 'rgba(255, 179, 71, 0.15)',
    fontWeight: 'bold',
    borderRadius: 6,
  },
});
