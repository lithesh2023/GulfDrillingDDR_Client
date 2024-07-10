import axios from '../api/axios';
import { useDispatch } from 'react-redux';
import {setUser} from '../redux/actions/userAction'
const useRefreshToken = () => {
    const dispatch = useDispatch()
    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });

        dispatch(setUser(response.data))
        return response.data.token;
    }
    return refresh;
};

export default useRefreshToken;