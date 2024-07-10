// src/actions/dataActions.js
import axios from 'axios';
const base_url = process.env.REACT_APP_API_URL
export const getWells = (data) => {
    
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        try {
            dispatch({ type: 'GET_WELLS', payload: data });
        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};
export const addWell = (well,token) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        try {
            await axios.post(`${base_url}/well`, well, {
                headers: {
                     'Authorization': `Bearer ${token}`,
                }
            })
            const response = await axios.get(`${base_url}/well`, {
                headers: {
                     'Authorization': `Bearer ${token}`,
                }
            });
            dispatch({ type: 'GET_WELLS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }

    };
};
export const updateWell = (well,token) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });

        try {
            await axios.put(`${base_url}/well/${well.id}`, well, {
                headers: {
                     'Authorization': `Bearer ${token}`,
                }
            })
            const response = await axios.get(`${base_url}/well`, {
                headers: {
                     'Authorization': `Bearer ${token}`,
                }
            });
            dispatch({ type: 'GET_WELLS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};
export const deleteWell = (id,token) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });

        try {
            await axios.delete(`${base_url}/well/${id}`, {
                headers: {
                   'Authorization': `Bearer ${token}`,
                }
              });
            const response = await axios.get(`${base_url}/well`, {
                headers: {
                     'Authorization': `Bearer ${token}`,
                }
            });
            dispatch({ type: 'GET_WELLS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};