import * as SecureStore from 'expo-secure-store'
import { Alert } from 'react-native';


export async function save(key: string, value: string | null) {
    await SecureStore.setItemAsync(key, value!);
}


export function getValueFor(key: string): string | null {
    let result = SecureStore.getItem(key);
    if (result != null) {
        // Alert.alert("🔐 Here's your value 🔐 \n" + result);
        return result
    } else {
        // Alert.alert('No values stored under that key.');
        return null
    }
}