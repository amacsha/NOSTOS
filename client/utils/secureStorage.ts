import * as SecureStore from 'expo-secure-store'
import { Alert } from 'react-native';


export async function save(key: string, value: string | null) {
    console.log('save', key, value)
    await SecureStore.setItemAsync(key, value!);
}


export function getValueFor(key: string): boolean {
    let result = SecureStore.getItem(key);
    if (result != null) {
        // Alert.alert("🔐 Here's your value 🔐 \n" + result);
        return true
    } else {
        // Alert.alert('No values stored under that key.');
        return false
    }
    console.log('getValue', result)
}