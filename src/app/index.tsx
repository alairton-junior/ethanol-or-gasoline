import { Input } from '@/components/Input';
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

export default function Index() {
    const [name, setName] = useState("");
    const [ethanolValue, setEthanolValue] = useState("");
    const [gasolineValue, setGasolineValue] = useState("");
    const [gasStation, setGasStation] = useState<GasStationDatabase[]>([]);
    const gasStationDatabase = useGasStationDatabase();

    async function create() {
        try {
            if (isNaN(Number(ethanolValue))) {
                return Alert.alert("O valor do álcool precisa ser um número!");
            }
            if (isNaN(Number(gasolineValue))) {
                return Alert.alert("O valor da gasolina precisa ser um número!");
            }

            const response = await gasStationDatabase.create({
                name, 
                ethanolValue: Number(ethanolValue), 
                gasolineValue: Number(gasolineValue)
            });

            Alert.alert("Produto cadastrado com o ID: " + response.insertedRowId);
            list(); // Atualiza a lista automaticamente após cadastrar
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
                    <Input placeholder='Nome do Posto' onChangeText={setName} value={name} />
                    <Input placeholder='Preço da Gasolina (R$)' onChangeText={setGasolineValue} value={gasolineValue} keyboardType="numeric" />
                    <Input placeholder='Preço do Álcool (R$)' onChangeText={setEthanolValue} value={ethanolValue} keyboardType="numeric" />
                    
                    <Button title='Salvar' onPress={create} />
                </View>

                <FlatList
                    data={gasStation}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <GasStationElement
                            id={item.id}
                            name={item.name}
                            ethanolValue={item.ethanolValue}
                            gasolineValue={item.gasolineValue}
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
