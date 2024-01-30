import axios from 'axios';
import { LoginValues } from '../../client-types/LoginValues';



const loginService = (loginValues: LoginValues) => {
    const url: string = 'http://10.10.22.149:3000/login'
    return axios.post(url, loginValues)
        .catch(error => {
            if (error.response.status !== 201) {
                console.log(error.response.data)
                return error.response.data
            }
        });
}

export default loginService;