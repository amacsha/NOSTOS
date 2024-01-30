import axios from 'axios';
import { RegisterValues } from '../../client-types/RegisterValues';
import { Alert } from 'react-native';


const registerService = (registerForm: RegisterValues) => {
    const url: string = 'http://10.10.22.149:3000/user/createOneUser'
    return axios.post(url, registerForm)
        .catch(error => {
            if (error.response.status !== 201) {
                console.log(error.response.data)
                return error.response.data
            }
        });
}

export default registerService;