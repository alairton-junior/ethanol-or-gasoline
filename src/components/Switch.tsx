import { Switch as SwitchUI} from 'react-native'
import { useState } from 'react'
import { useSwitchStorage } from '@/hook/useSwitchStorage'

export default function Switch () {
    const { isEnabled, toggleSwitch } = useSwitchStorage();
    return(
        <SwitchUI value = {isEnabled} onValueChange={toggleSwitch}/>
    )
}

