import axios from 'axios';
import { RegisterValues } from './register';

const registerService = async (registerValues: RegisterValues): Promise<boolean> => {
    const url = '/auth'
    try {
        const response = await axios.post(url, registerValues)
        if (response.status === 200) return true
        return false
    } catch (error) {
        console.log('register error', error)
        return false
    }
}

export default registerService;