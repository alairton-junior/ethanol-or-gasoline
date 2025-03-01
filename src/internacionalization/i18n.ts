import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import translationEn from "./locales/en.json";
import translationPt from "./locales/pt.json";

// Recursos de tradução
const resources = {
  "pt-BR": { translation: translationPt },
  "en-US": { translation: translationEn },
};

// Função para inicializar o i18n
const initI18n = async () => {
  // Obtém o idioma salvo no AsyncStorage
  let savedLanguage = await AsyncStorage.getItem("language");

  // Se não houver idioma salvo, usa o idioma do sistema
  if (!savedLanguage) {
    const systemLanguage = Localization.locale; // Obtém o idioma do sistema
    savedLanguage = systemLanguage.startsWith("pt") ? "pt-BR" : "en-US"; // Define o idioma padrão com base no sistema
  }

  // Inicializa o i18n
  i18n.use(initReactI18next).init({
    compatibilityJSON: "v4", // Compatibilidade com JSON v4
    resources, // Recursos de tradução
    lng: savedLanguage, // Idioma inicial
    fallbackLng: "en-US", // Idioma de fallback
    interpolation: {
      escapeValue: false, // Não escapa valores (útil para HTML)
    },
  });
};

// Função para alterar o idioma manualmente
export const changeLanguage = async (language: string) => {
  await AsyncStorage.setItem("language", language); // Salva o idioma no AsyncStorage
  i18n.changeLanguage(language); // Altera o idioma no i18n
};

// Inicializa o i18n
initI18n();

export default i18n;