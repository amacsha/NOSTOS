import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { RegisterValues } from '../../client-types/RegisterValues';
import { useAppDispatch } from '../../hooks';
import { setAuth } from '../../slices/authSlice';

const registerService = async (registerValues: RegisterValues) => {
    const url = '/auth'
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const response = await axios.post(url, registerValues)
        .then(res => {
            if (res.status === 200) dispatch(setAuth(res.data))
            navigate("/dashboard")
        })
        .catch(error => console.log('register error', error))

}

export default registerService;