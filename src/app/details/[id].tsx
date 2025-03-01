import "@/internacionalization/i18n";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/Input";
import { MapViewComponent } from "@/components/MapView";
import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  Alert,
  useColorScheme,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
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
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { darkTheme, lightTheme } from "@/theme/theme";
import { Template } from "@/components/Template";
import { useCurrentLocation } from "@/hook/useCurrentLocation";
import EthanolOrGasoline from "@/components/EthanolOrGasoline";

export default function GasStation() {
  const [gasStation, setGasStation] = useState({
    name: "",
    created_at: "",
    ethanol_value: 0,
    gasoline_value: 0,
    latitude: 0,
    longitude: 0,
  });
  const params = useLocalSearchParams<{ id: string }>();

  const gasStationDatabase = useGasStationDatabase();

  useEffect(() => {
    if (params.id) {
      gasStationDatabase.show(params.id).then((response) => {
        if (response) {
          setGasStation({
            name: response.name,
            created_at: response.created_at,
            ethanol_value: response.ethanol_value,
            gasoline_value: response.gasoline_value,
            latitude: response.latitude || 0,
            longitude: response.longitude || 0,
          });
        }
      });
    }
  }, [params.id]);

  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  const date = new Date(gasStation.created_at);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")} às ${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  const router = useRouter();

  const handleBackHome = () => {
    router.back();
  };

  const { latitude, longitude } = useCurrentLocation();

  const { t, i18n } = useTranslation();

  return (
    <Template>
      <View style={{ ...styles.header, backgroundColor: theme.card }}>
        <TouchableOpacity onPress={handleBackHome}>
          <MaterialIcons name="arrow-back" size={30} color={theme.primary} />
        </TouchableOpacity>
        <Text style={{ ...styles.title, color: theme.text }}>{t('information')}</Text>
      </View>
      <Text style={styles.titleGasStation}>{gasStation.name}</Text>
      <Text style={styles.subtitle}>{t('created_at_label')} {formattedDate}</Text>
      {latitude && longitude ? (
        <MapViewComponent
          latitude={gasStation.latitude}
          longitude={gasStation.longitude}
        />
      ) : null}

      <LocationElement />

      <View style={styles.priceContainer}>
        <View style={styles.priceBox}>
          <Text style={styles.text}>{t('ethanol_label')}</Text>
          <Text style={styles.priceText}>R$ {gasStation.ethanol_value.toFixed(2)}</Text>
        </View>
        <View style={styles.priceBox}>
          <Text style={styles.text}>{t('gasoline_label')}</Text>
          <Text style={styles.priceText}>R$ {gasStation.gasoline_value.toFixed(2)}</Text>
        </View>
      </View>
      <EthanolOrGasoline
        ethanol_value={gasStation.ethanol_value}
        gasoline_value={gasStation.gasoline_value}
      />
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
  titleGasStation: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#C4C4CC", // Cor do texto
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: "#C4C4CC", // Cor do texto
  },
  priceBox: {
    alignItems: 'center',
},
priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C4C4CC',
},
text: {
    fontSize: 16,
    color: '#C4C4CC',
},
priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
},
});
