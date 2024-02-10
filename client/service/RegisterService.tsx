import axios from 'axios';
import { RegisterValues } from '../client-types/RegisterValues';
import { UserResponse } from '../client-types/UserResponse';

const IP: string | undefined = process.env.EXPO_PUBLIC_IP_ADDRESS;

const RegisterService = (registerForm: RegisterValues): Promise<UserResponse> => {
    registerForm.email = registerForm.email?.toLowerCase()
    const url = `http://${IP}:3000/user/createOneUser`
    return axios.post<UserResponse>(url, registerForm)
        .catch(error => {
            if (error.response && error.response.status !== 201) {
                console.log(error.response.data);
                return error.response.data;
            }
        });
}

export default RegisterService;