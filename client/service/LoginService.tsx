import axios from 'axios';
import { LoginValues } from '../client-types/LoginValues';
import { UserResponse } from '../client-types/UserResponse';


const IP: string | undefined = process.env.EXPO_PUBLIC_IP_ADDRESS;

const LoginService = (loginValues: LoginValues): Promise<UserResponse> => {
    loginValues.email = loginValues.email?.toLowerCase()
    const url = `http://${IP}:3000/login`;
    return axios.post<UserResponse>(url, loginValues)
        .catch(error => {
            if (error.response && error.response.status !== 201) {
                console.log(error.response.data);
                return error.response.data;
            }
        });
}

export default LoginService;