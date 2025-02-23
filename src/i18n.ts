import i18n from 'i18n-js';
import * as Localization from 'expo-localization';
import en from './locales/en.json';
import pt from './locales/pt.json';

i18n.fallbacks = true;
i18n.translations = { en, pt };
i18n.locale = Localization.locale.startsWith('pt') ? 'pt' : 'en';

export default i18n;