import axios from 'axios';
import { RegisterValues } from '../client-types/RegisterValues';
import { UserResponse } from '../client-types/UserResponse';



const IP: string | undefined = process.env.EXPO_PUBLIC_IP_ADDRESS;

const RegisterService = (registerForm: RegisterValues): Promise<UserResponse> => {
    console.log(IP)
    const url: string = `http://${IP}:3000/user/createOneUser`
    return axios.post<UserResponse>(url, registerForm)
        .then(response => response.data)
        .catch(error => {
            if (error.response) {
                console.log(error.response.data)
                return error.response.data
            }
        });
}

export default RegisterService;