import axios from 'axios';
import { LoginValues } from '../../client-types/LoginValues';

const IP = process.env.EXPO_PUBLIC_IP_ADDRESS;


const loginService = (loginValues) => {
    const url = `http://${IP}:3000/login`;
    return axios.post(url, loginValues)
        .catch(error => {
            if (error.response && error.response.status !== 201) {
                console.log(error.response.data);
                return error.response.data;
            }
        });
}

export default loginService;