import * as SecureStore from 'expo-secure-store'
import { Alert } from 'react-native';


export async function save(key: string, value: string | null) {
    console.log('save', key, value)
    await SecureStore.setItemAsync(key, value!);
}

export async function getValueFor(key: string): Promise<boolean> {
    try {
        let result = await SecureStore!.getItemAsync(key);
        if (result) {
            Alert.alert("🔐 Here's your value 🔐 \n" + result);
            return true
        } else {
            Alert.alert('No values stored under that key.');
            return false
        }
        console.log('getValue', result)
    } catch (error) {
        console.log('Failed to get value for key:', error);
        return false;
    }
}