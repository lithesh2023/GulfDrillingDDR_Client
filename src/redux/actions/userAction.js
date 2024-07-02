import axios from "axios";

const base_url = process.env.REACT_APP_API_URL

export const setUser = (userCredentials,navigate) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        try {
            const response = await axios.post(`${base_url}/user/login`, userCredentials)
    
            localStorage.setItem('token', response.data.token)
            dispatch({ type: 'SET_USER', payload: response.data.currentUser });
            dispatch({ type: 'SET_TOKEN', payload: response.data.token });
            navigate('/Dashboard')
        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};