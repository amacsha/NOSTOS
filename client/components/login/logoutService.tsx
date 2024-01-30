import { Button } from 'react-native';
import { useAppDispatch } from '../../hooks';
import { setAuth, initialState } from '../../slices/authSlice';
import { save } from "../../utils/secureStorage";


const LogoutService = () => {

    const dispatch = useAppDispatch();

    function logout() {
        console.log('before')
        dispatch(setAuth(initialState));
        save('accessToken', '');
        console.log('after')
    }

    return (
        <Button title="logout" onPress={logout} />
    )
}

export default LogoutService;
