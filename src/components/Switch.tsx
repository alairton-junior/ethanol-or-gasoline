import { Switch as SwitchUI, TouchableOpacity, View, Text, useColorScheme} from 'react-native'
import { useState } from 'react'
import { useSwitchStorage } from '@/hook/useSwitchStorage'
import { darkTheme, lightTheme } from '@/theme/theme';

export default function Switch () {
    const { isEnabled, toggleSwitch } = useSwitchStorage();

      const colorScheme = useColorScheme(); 
        const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    const handleSelect = () => {
        toggleSwitch(); 
    };
    return(
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
        <TouchableOpacity
            style={{
                backgroundColor: isEnabled ? theme.card : theme.primary, // Cor diferente para selecionado
                padding: 10,
                borderRadius: 5,
                width: '45%',
                alignItems: 'center',
            }}
            onPress={() => handleSelect()}
        >
            <Text style={{ color: '#fff'}}>70%</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{
                backgroundColor: isEnabled ? theme.primary : theme.card, // Cor diferente para selecionado
                padding: 10,
                borderRadius: 5,
                width: '45%',
                alignItems: 'center',
            }}
            onPress={() => handleSelect()}
        >
            <Text style={{ color: '#fff'}}>75%</Text>
        </TouchableOpacity>
    </View>
    )
}

