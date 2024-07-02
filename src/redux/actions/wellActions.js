// src/actions/dataActions.js
import axios from 'axios';

const base_url = process.env.REACT_APP_API_URL
export const getWells = () => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        try {
            const response = await axios.get(`${base_url}/well`, {
                headers: {
                    'authorization': localStorage.getItem('token'),
                }
            });
            dispatch({ type: 'GET_WELLS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};
export const addWell = (well) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        try {
            await axios.post(`${base_url}/well`, well, {
                headers: {
                    'authorization': localStorage.getItem('token'),
                }
            })
            const response = await axios.get(`${base_url}/well`, {
                headers: {
                    'authorization': localStorage.getItem('token'),
                }
            });
            dispatch({ type: 'GET_WELLS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }

    };
};
export const updateWell = (well) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });

        try {
            await axios.put(`${base_url}/well/${well.id}`, well, {
                headers: {
                    'authorization': localStorage.getItem('token'),
                }
            })
            const response = await axios.get(`${base_url}/well`, {
                headers: {
                    'authorization': localStorage.getItem('token'),
                }
            });
            dispatch({ type: 'GET_WELLS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};
export const deleteWell = (id) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });

        try {
            await axios.delete(`${base_url}/well/${id}`, {
                headers: {
                  'authorization': localStorage.getItem('token'),
                }
              });
            const response = await axios.get(`${base_url}/well`, {
                headers: {
                    'authorization': localStorage.getItem('token'),
                }
            });
            dispatch({ type: 'GET_WELLS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};