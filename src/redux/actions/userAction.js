import axios from "axios";

const base_url = 'http://localhost:4000/api/v1'

export const setUser = (userCredentials,navigate,login) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        try {
            const response = await axios.post(`${base_url}/user/login`, userCredentials)
            console.log(response.data)
            localStorage.setItem('token', response.data.token)
            dispatch({ type: 'SET_USER', payload: response.data.currentUser });
            dispatch({ type: 'SET_TOKEN', payload: response.data.token });
            login()
            navigate('/Dashboard')
        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};