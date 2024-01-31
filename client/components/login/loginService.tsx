import axios, { AxiosResponse } from 'axios';
import { LoginValues } from '../../client-types/LoginValues';
import { LoginResponse } from '../../client-types/LoginResponse';

const IP: string | undefined = process.env.EXPO_PUBLIC_IP_ADDRESS;

const loginService = (loginValues: LoginValues) => {
    console.log(IP)
    const url = `http://${IP}:3000/login`;
    return axios.post<LoginResponse>(url, loginValues)
        .catch(error => {
            if (error.response && error.response.status !== 201) {
                console.log(error.response.data);
                return error;
                // } else {`
                //     throw new Error('Unexpected error')
            }
        });
}

export default loginService;