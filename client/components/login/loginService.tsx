import axios from 'axios';
import { LoginValues } from './login';


const loginService = async (loginValues: LoginValues): Promise<boolean> => {
    const url = '/auth'
    try {
        const response = await axios.post(url, loginValues)
        if (response.status === 200) return true
        return false
    } catch (error) {
        console.log('login error', error)
        return false
    }
}

export default loginService;