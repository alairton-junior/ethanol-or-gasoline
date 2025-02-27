import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useGasStationDatabase, GasStationDatabase } from '@/database/useGasStationDatabase';

export default function GasStationElement({ id, name, ethanol_value, gasoline_value, created_at }: GasStationDatabase) {
    const { update, remove } = useGasStationDatabase();
    const [modalVisible, setModalVisible] = useState(false);
    const [newName, setNewName] = useState(name);
    const [newEthanol, setNewEthanol] = useState(String(ethanol_value));
    const [newGasoline, setNewGasoline] = useState(String(gasoline_value));

    async function handleUpdate() {
        await update(id, {
            name: newName,
            ethanol_value: parseFloat(newEthanol),
            gasoline_value: parseFloat(newGasoline)
        });
        setModalVisible(false);
    }

    async function handleDelete() {
        await remove(id);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.text}>Álcool: R$ {ethanol_value}</Text>
            <Text style={styles.text}>Gasolina: R$ {gasoline_value}</Text>
            {created_at && <Text style={styles.text}>Criado em: {created_at}</Text>}

            {/* Botões de Editar e Excluir */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                    <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
            </View>

            {/* Modal de Edição */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>Editar Posto</Text>
                        <TextInput style={styles.input} value={newName} onChangeText={setNewName} placeholder="Nome do posto" />
                        <TextInput style={styles.input} value={newEthanol} onChangeText={setNewEthanol} placeholder="Preço do Álcool" keyboardType="numeric" />
                        <TextInput style={styles.input} value={newGasoline} onChangeText={setNewGasoline} placeholder="Preço da Gasolina" keyboardType="numeric" />

                        <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
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
    },    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    editButton: {
        backgroundColor: "#4CAF50",
        padding: 8,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: "#E53935",
        padding: 8,
        borderRadius: 5,
    },
    buttonText: {
        color: "#FFF",
        textAlign: "center",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    input: {
        width: "100%",
        borderBottomWidth: 1,
        marginBottom: 10,
        padding: 8,
    },
    saveButton: {
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: "100%",
    },
    cancelButton: {
        backgroundColor: "#E53935",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: "100%",
    },
});