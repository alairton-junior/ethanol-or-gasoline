import '@/internacionalization/i18n'
import { useTranslation } from 'react-i18next';
import { Link, useRouter } from 'expo-router';
import { Input } from '@/components/Input';
import Switch from '@/components/Switch';
import { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    FlatList, 
    Image,
    Text, View,
    useColorScheme
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as RNLocalize from "react-native-localize";

import Logo from "@/assets/logo.png"; 
import { GasStationDatabase, useGasStationDatabase } from "@/database/useGasStationDatabase";
import GasStationElement from '@/components/GasStationElement';
import FloatingBubbleButton from '@/components/FloatingBubbleButton';
import { Template } from '@/components/Template';
import { darkTheme, lightTheme } from '@/theme/theme';




export default function Index() {
    const [gasStation, setGasStation] = useState<GasStationDatabase[]>([]);
    const gasStationDatabase = useGasStationDatabase();

    const router = useRouter();
    const colorScheme = useColorScheme(); 
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    

    const handleNavigationToAddGasStation = () => {
        router.push('/addGasStation');
    }

    const { t } = useTranslation();


    async function list() {
        try {
            const response = await gasStationDatabase.list();
            setGasStation(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        list();
    }, [gasStation]);

    return (
        <Template>
            <View style={{...styles.header, backgroundColor: theme.card}}>
                <Image source={Logo} style={styles.logo} />
            </View>
            <FloatingBubbleButton onPress={ handleNavigationToAddGasStation}/>
            
            <View style={{gap: 12, marginTop: 80}}>
                <Text style={{...styles.text, color: theme.text}}>{t('title_switch')}</Text>
                <Switch/>
                <Text style={{...styles.text, color: theme.text}}>{t('list')}</Text>
            </View>

                <FlatList
                    data={gasStation}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <GasStationElement
                            id={item.id}
                            name={item.name}
                            ethanol_value={item.ethanol_value}
                            gasoline_value={item.gasoline_value}
                            created_at={item.created_at}
                            latitude={item.latitude}
                            longitude={item.longitude}
                        />
                    )}
                    style={styles.listContainer}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
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
        justifyContent: "center",
        paddingHorizontal: 24,
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
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});
