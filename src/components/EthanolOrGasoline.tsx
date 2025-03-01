import { Switch as SwitchUI, TouchableOpacity, View, Text, useColorScheme} from 'react-native'
import { useEffect, useState } from 'react'
import { useSwitchStorage } from '@/hook/useSwitchStorage'
import { darkTheme, lightTheme } from '@/theme/theme';

export default function EthanolOrGasoline ({  ethanol_value, gasoline_value } : {  ethanol_value: number, gasoline_value: number}) {
    const { isEnabled } = useSwitchStorage(); // false é 70%, true é 75%

    const [isEthanolMoreProfitable, setIsEthanolMoreProfitable] = useState<boolean>(false);

    // Efeito para atualizar a rentabilidade sempre que o isEnabled, ethanol_value ou gasoline_value mudarem
    useEffect(() => {
      if (ethanol_value > 0 && gasoline_value > 0) {
        // Define o fator de rentabilidade dependendo da configuração
        const rentabilityFactor = isEnabled ? 0.70 : 0.75;
  
        // Verifica se o etanol é mais rentável
        setIsEthanolMoreProfitable(ethanol_value <= gasoline_value * rentabilityFactor);
      }
    }, [isEnabled, ethanol_value, gasoline_value]);


      const colorScheme = useColorScheme(); 
        const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    return(
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>

       { !isEthanolMoreProfitable ?
        <View
            style={{
                backgroundColor: theme.blue, // Cor diferente para selecionado
                padding: 10,
                borderRadius: 5,
                width: '100%',
                alignItems: 'center',
            }}
        > 
            <Text style={{ color: '#fff'}}>Gasolina é mais rentável</Text>
        </View> :
        <View
            style={{
                backgroundColor: theme.orange, // Cor diferente para selecionado
                padding: 10,
                borderRadius: 5,
                width: '100%',
                alignItems: 'center',
            }}
            
        >
            <Text style={{ color: '#fff'}}>Álcool é mais rentável</Text>
        </View> }
    </View>
    )
}

