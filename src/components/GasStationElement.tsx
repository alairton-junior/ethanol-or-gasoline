import { GasStationDatabase } from '@/database/useGasStationDatabase';
import { Text, View, StyleSheet } from 'react-native';

export default function GasStationElement({id, name, ethanolValue, gasolineValue, created_at} : GasStationDatabase) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.text}>Álcool: R$ {ethanolValue}</Text>
            <Text style={styles.text}>Gasolina: R$ {gasolineValue}</Text>
            
            {created_at && <Text style={styles.text}>Criado em: {created_at}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#29292E', 
        padding: 12,
        gap: 4,
        borderRadius: 8,
        color: '#C4C4CC',
        marginBottom: 16
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#C4C4CC',
    },
    text: {
        fontSize: 14,
        color: '#C4C4CC',
    },
  })