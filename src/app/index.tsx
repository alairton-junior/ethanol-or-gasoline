import { Input } from '@/components/Input';
import Switch from '@/components/Switch';
import { useState, useEffect } from 'react';
import { 
    View, 
    StyleSheet, 
    Button, 
    Alert, 
    FlatList, 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView,
    Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from "@/assets/logo.png"; 
import { GasStationDatabase, useGasStationDatabase } from "@/database/useGasStationDatabase";
import GasStationElement from '@/components/GasStationElement';

import { I18n } from 'i18n-js';

import i18n from '@/i18n'; // Importar a configuração de internacionalização

export default function Index() {
    const [name, setName] = useState("");
    const [ethanol_value, setEthanolValue] = useState("");
    const [gasoline_value, setGasolineValue] = useState("");
    const [gasStation, setGasStation] = useState<GasStationDatabase[]>([]);
    const gasStationDatabase = useGasStationDatabase();

    async function create() {
        try {
            if (isNaN(Number(ethanol_value))) {
                return Alert.alert(i18n.t('alert_ethanol_number'));
            }
            if (isNaN(Number(gasoline_value))) {
                return Alert.alert(i18n.t('alert_gasoline_number'));
            }
    
            const response = await gasStationDatabase.create({
                name, 
                ethanol_value: Number(ethanol_value), 
                gasoline_value: Number(gasoline_value)
            });
    
            Alert.alert(i18n.t('alert_product_registered') + " " + response.insertedRowId);
            list();
        } catch (error) {
            console.log(error);
        } finally {
            setName("");
            setEthanolValue("");
            setGasolineValue("");
        }
    }

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
    }, []);

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <SafeAreaView style={styles.header}>
                <Image source={Logo} style={styles.logo} />
            </SafeAreaView>
            
            <View style={styles.form}>
                <Input placeholder={i18n.t('input_name_placeholder')} onChangeText={setName} value={name} />
                <Input placeholder={i18n.t('input_gasoline_placeholder')} onChangeText={setGasolineValue} value={gasoline_value} keyboardType="numeric" />
                <Input placeholder={i18n.t('input_ethanol_placeholder')} onChangeText={setEthanolValue} value={ethanol_value} keyboardType="numeric" />
                <Button title={i18n.t('save_button')} onPress={create} />
            </View>
    
            <Switch/>
    
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
                    />
                )}
                style={styles.listContainer}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    header: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 120,
        backgroundColor: "#29292E",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        zIndex: 10,
    },
    container: {
        flex: 1,
        backgroundColor: "#202024",
        paddingTop: 140, // Ajuste para evitar sobreposição do header
        paddingHorizontal: 16,
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
});
