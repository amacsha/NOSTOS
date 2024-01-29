import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { LoginValues } from './login';
import { useAppDispatch } from '../../hooks';
import { setAuth } from '../../slices/authSlice';


const loginService = async (loginValues: LoginValues) => {
    const url = '/auth'
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const response = await axios.post(url, loginValues)
        .then(res => {
            if (res.status === 200) dispatch(setAuth(res.data))
            navigate("/dashboard")
        })
        .catch(err => console.log('login error', err))

}

export default loginService;