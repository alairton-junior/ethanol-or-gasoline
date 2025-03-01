import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useGasStationDatabase, GasStationDatabase } from '@/database/useGasStationDatabase';
import EthanolOrGasoline from './EthanolOrGasoline';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function GasStationElement({ id, name, ethanol_value, gasoline_value, created_at }: GasStationDatabase) {
    const { update, remove } = useGasStationDatabase();
    const [modalVisible, setModalVisible] = useState(false);
    const [newName, setNewName] = useState(name);
    const [newEthanol, setNewEthanol] = useState(String(ethanol_value));
    const [newGasoline, setNewGasoline] = useState(String(gasoline_value));
    const router = useRouter();

    const { t } = useTranslation();

    if (!created_at) return null;
    
    const date = new Date(created_at);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')} às ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

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
            {/*ts-ignore*/}
            <TouchableOpacity onPress={() => router.navigate("/details/" + id)}> 
                {/*ts-ignore*/}
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.text}>{t('created_at_label')} {formattedDate}</Text>
                <View style={styles.priceContainer}>
                    <View style={styles.priceBox}>
                        <Text style={styles.text}>{t('ethanol_label')}</Text>
                        <Text style={styles.priceText}>R$ {ethanol_value.toFixed(2)}</Text>
                    </View>
                    <View style={styles.priceBox}>
                        <Text style={styles.text}>{t('gasoline_label')}</Text>
                        <Text style={styles.priceText}>R$ {gasoline_value.toFixed(2)}</Text>
                    </View>
                </View>
                <EthanolOrGasoline ethanol_value={ethanol_value} gasoline_value={gasoline_value} />
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.buttonText}>{t('edit_button')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                    <Text style={styles.buttonText}>{t('delete_button')}</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>{t('edit_button')}</Text>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>{t('input_name_placeholder')}</Text>
                            <TextInput style={styles.input} value={newName} onChangeText={setNewName} placeholder="Digite o nome do posto" placeholderTextColor="#999" />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>{t('input_ethanol_placeholder')}</Text>
                            <TextInput style={styles.input} value={newEthanol} onChangeText={setNewEthanol} placeholder="Digite o preço do álcool" keyboardType="numeric" placeholderTextColor="#999" />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>{t('input_gasoline_placeholder')}</Text>
                            <TextInput style={styles.input} value={newGasoline} onChangeText={setNewGasoline} placeholder="Digite o preço da gasolina" keyboardType="numeric" placeholderTextColor="#999" />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
                                <Text style={styles.buttonText}>{t('save_button')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>{t('cancel_button')}</Text>
                            </TouchableOpacity>
                        </View>
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
        borderRadius: 8,
        marginTop: 16
    },
    title: {
        fontSize: 22,
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
    priceBox: {
        alignItems: 'center',
    },
    priceText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#C4C4CC',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    editButton: {
        flex: 1,
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginRight: 5,
    },
    deleteButton: {
        flex: 1,
        backgroundColor: '#FF5733',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginLeft: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
    },
    inputGroup: {
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 4,
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "#f9f9f9",
    },
    saveButton: {
        flex: 1,
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        marginRight: 5,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: "#FF5733",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        marginLeft: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});