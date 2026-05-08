export const SUPPORTED_LANGUAGES = [
  { id: 'en', name: 'Inglés', flag: 'https://flagcdn.com/w40/us.png' },
  { id: 'es', name: 'Español', flag: 'https://flagcdn.com/w40/es.png' },
  { id: 'pt', name: 'Portugués', flag: 'https://flagcdn.com/w40/br.png' },
  { id: 'fr', name: 'Francés', flag: 'https://flagcdn.com/w40/fr.png' },
  { id: 'it', name: 'Italiano', flag: 'https://flagcdn.com/w40/it.png' },
  { id: 'de', name: 'Alemán', flag: 'https://flagcdn.com/w40/de.png' },
];

export const AUTO_LANGUAGE = { id: 'auto', name: 'Detectar', flag: 'https://flagcdn.com/w40/un.png' };

export const getLanguage = (id) => {
  if (id === 'auto') return AUTO_LANGUAGE;
  return SUPPORTED_LANGUAGES.find(l => l.id === id) || AUTO_LANGUAGE;
};
