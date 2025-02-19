import { TextInput, Text, TextInputProps, StyleSheet} from 'react-native';

export function Input({...rest } : TextInputProps) {

    return <TextInput {...rest} style={styles.inputElement}/>
}


const styles = StyleSheet.create({
    inputElement: {   
        height: 60,
        backgroundColor: "#29292E",
        color: "#8D8D99",
        borderColor: "#dddddd",
        paddingHorizontal: 16,
        borderRadius: 8,
        fontSize: 14,
        width: "80%"
    } 
})