import "@/internacionalization/i18n";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/Input";
import { MapViewComponent } from "@/components/MapView";
import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  useColorScheme,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as RNLocalize from "react-native-localize";

import {
  GasStationDatabase,
  useGasStationDatabase,
} from "@/database/useGasStationDatabase";
import GasStationElement from "@/components/GasStationElement";
import LocationElement from "@/components/LocationElement";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { darkTheme, lightTheme } from "@/theme/theme";
import { Template } from "@/components/Template";
import { useCurrentLocation } from "@/hook/useCurrentLocation";

export default function Index() {
  const [name, setName] = useState("");
  const [ethanol_value, setEthanolValue] = useState("");
  const [gasoline_value, setGasolineValue] = useState("");
  const gasStationDatabase = useGasStationDatabase();

  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  const router = useRouter();

  const handleBackHome = () => {
    router.back();
  };

  const { latitude, longitude } = useCurrentLocation();

  const { t, i18n } = useTranslation();

  async function create() {
    try {
      if (isNaN(Number(ethanol_value))) {
        return Alert.alert("O valor do álcool precisa ser um número!");
      }
      if (isNaN(Number(gasoline_value))) {
        return Alert.alert("O valor da gasolina precisa ser um número!");
      }

      const response = await gasStationDatabase.create({
        name,
        ethanol_value: Number(ethanol_value),
        gasoline_value: Number(gasoline_value),
        latitude: Number(latitude),
        longitude: Number(longitude),
      });
      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setName("");
      setEthanolValue("");
      setGasolineValue("");
    }
  }

  return (
    <Template>
      <View style={{ ...styles.header, backgroundColor: theme.card }}>
        <TouchableOpacity onPress={handleBackHome}>
          <MaterialIcons name="arrow-back" size={30} color={theme.primary} />
        </TouchableOpacity>
        <Text style={{ ...styles.title, color: theme.text }}>
            {t('add_new_post')}
        </Text>
      </View>
    <View style={{marginTop: 80}}>
      {latitude && longitude ? (
        <MapViewComponent latitude={latitude} longitude={longitude}/>
      ) : null}

      <View style={styles.form}>
        <LocationElement />

        <Input
          placeholder={t("input_name_placeholder")}
          onChangeText={setName}
          value={name}
        />
        <Input
          placeholder= {t('input_gasoline_placeholder')}
          onChangeText={setGasolineValue}
          value={gasoline_value}
        />
        <Input
          placeholder={t('input_ethanol_placeholder')}
          onChangeText={setEthanolValue}
          value={ethanol_value}
        />

        <TouchableOpacity
          onPress={create}
          style={{
            backgroundColor: theme.primary, // Cor do tema
            padding: 12,
            borderRadius: 5,
            width: "80%",
            alignItems: "center",
            justifyContent: "center", // Para centralizar o texto dentro do botão
          }}
        >
          <Text style={{ fontSize: 16, color: "#fff" }}>{t('save_button')}</Text>{" "}
          {/* Definindo o tamanho da fonte e a cor do texto */}
        </TouchableOpacity>
      </View>
      </View>
    </Template>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    zIndex: 10,
  },
  logo: {
    width: 216,
    height: 30,
    resizeMode: "contain",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  form: {
    width: "100%",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  listContainer: {
    width: "80%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#C4C4CC", // Cor do texto
  },
});
