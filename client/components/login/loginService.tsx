import axios from 'axios';
import { LoginValues } from '../../client-types/LoginValues';



const loginService = async (loginValues: LoginValues) => {
    const url: string = 'http://localhost:3000/login'
    await axios.post(url, loginValues)
        .then(res => res.data)
        .catch(err => console.log(err));
}

export default loginService;