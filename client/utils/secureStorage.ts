import * as SecureStore from 'expo-secure-store'
import { Alert } from 'react-native';

export async function save(key: string, value: string) {
    console.log('save', key, value)
    await SecureStore.setItemAsync(key, value);
}

// export async function getValueFor(key: string): Promise<string | null> {
//     let result = await SecureStore.getItemAsync(key);
//     if (result) {
//         console.log("🔐 Here's your value 🔐 \n" + result);
//     } else {
//         console.log('No values stored under that key.');
//     }
//     console.log('getValue', result)
//     return result
// }

export async function getValueFor(key: string): Promise<boolean> {
    try {
        let result = await SecureStore!.getItemAsync(key);
        if (result) {
            Alert.alert("🔐 Here's your value 🔐 \n" + result);
        } else {
            Alert.alert('No values stored under that key.');
        }
        console.log('getValue', result)
        return true
    } catch (error) {
        console.log('Failed to get value for key:', error);
        return false;
    }
}