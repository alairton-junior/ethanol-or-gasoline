import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useSwitchStorage (){
    const [isEnabled, setIsEnabled] = useState(false);

    // Função para carregar o estado salvo
    useEffect(() => {
        const loadSwitchState = async () => {
            try {
                const storedState = await AsyncStorage.getItem('switchState');
                if (storedState !== null) {
                    setIsEnabled(JSON.parse(storedState));
                }
            } catch (error) {
                console.error('Erro ao carregar estado:', error);
            }
        };

        loadSwitchState();
    }, []);

    // Função para alternar e salvar o estado do Switch
    const toggleSwitch = async () => {
        try {
            const newState = !isEnabled;
            setIsEnabled(newState);
            await AsyncStorage.setItem('switchState', JSON.stringify(newState));
        } catch (error) {
            console.error('Erro ao salvar estado:', error);
        }
    };
    return{
        isEnabled, toggleSwitch
    }
}