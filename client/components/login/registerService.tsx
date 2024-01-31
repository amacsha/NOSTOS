import axios from 'axios';
import { RegisterValues } from '../../client-types/RegisterValues';

const IP = process.env.EXPO_PUBLIC_IP_ADDRESS;

const registerService = (registerForm: RegisterValues) => {
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