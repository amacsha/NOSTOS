import axios from 'axios';
import { RegisterValues } from '../../client-types/RegisterValues';


const registerService = async (registerValues: RegisterValues) => {
    const url: string = 'http://localhost:3000/user/createOneUser'
    await axios.post(url, registerValues)
        .then(res => res.data)
        .catch(err => console.log(err));
}

export default registerService;