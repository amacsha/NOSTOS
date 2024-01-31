import axios from 'axios';
import { RegisterValues } from '../../client-types/RegisterValues';

const IP: string | undefined = process.env.EXPO_PUBLIC_IP_ADDRESS;

const registerService = (registerForm: RegisterValues) => {
    console.log(IP)
    const url: string = `http://${IP}:3000/user/createOneUser`
    return axios.post(url, registerForm)
        .catch(error => {
            if (error.response.status !== 201) {
                console.log(error.response.data)
                return error.response.data
            }
        });
}

export default registerService;