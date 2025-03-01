import React from "react";
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useCurrentLocation } from '@/hook/useCurrentLocation'; 
import { darkTheme, lightTheme } from "@/theme/theme";
import { useTranslation } from "react-i18next";

export default function LocationElement() {
    const { displayCurrentAddress } = useCurrentLocation();
   const colorScheme = useColorScheme(); 
       const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

       const { t } = useTranslation();
    return (
        <TouchableOpacity>
        <View style={[styles.container]}>
            <View style={{...styles.iconContainer, backgroundColor: theme.card}}>
                <MaterialIcons name="location-on" size={30} color={theme.primary} />
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.label, { color: theme.text }]}>{t('local_map')}</Text>
                <Text style={[styles.address, { color: theme.text, fontWeight: "bold" }]}>
                    {displayCurrentAddress}
                </Text>
            </View>
        </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", // Para alinhar ícone e texto na mesma linha
        padding: 16,
        borderRadius: 8,
        marginVertical: 8, // Adicionando espaçamento entre os elementos
        alignItems: "center", // Alinha os itens verticalmente
    },
    iconContainer: {
        padding: 12,
        borderRadius: 50,
        marginRight: 16, // Espaçamento entre o ícone e o texto
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: '500', // Texto em negrito, mas não tão pesado
        marginBottom: 4,
    },
    address: {
        fontSize: 16,
    },
});
