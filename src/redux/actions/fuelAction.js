import axios from "axios";

const base_url = process.env.REACT_APP_API_URL

export const fetchFuel = () => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        try {
            const response = await axios.get(`${base_url}/fuel`, {
                headers: {
                    'authorization': localStorage.getItem('token'),
                }
            })
            dispatch({ type: 'FETCH_FUEL', payload: response.data });

        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};
export const addFuel = (fueldata) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        try {
            await axios.post(`${base_url}/fuel/add`, fueldata, {
                headers: {
                    'authorization': localStorage.getItem('token'),
                }
            })
            const response = await axios.get(`${base_url}/fuel`, {
                headers: {
                    'authorization': localStorage.getItem('token'),
                }
            })
            dispatch({ type: 'FETCH_FUEL', payload: response.data });

        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};
export const addFuelConsumption = (fueldata) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        try {
            await axios.post(`${base_url}/fuel/consume`, fueldata, {
                headers: {
                    'authorization': localStorage.getItem('token'),
                }
            })
            const response = await axios.get(`${base_url}/fuel`, {
                headers: {
                    'authorization': localStorage.getItem('token'),
                }
            })
            dispatch({ type: 'FETCH_FUEL', payload: response.data });

        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};
export const updateFuel = (fueldata) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        try {
            console.log("Fuel update",fueldata)
            await axios.put(`${base_url}/fuel/fuelconsumption/${fueldata.id}`, fueldata, {
                headers: {
                  'authorization': localStorage.getItem('token'),
                }
              })
            const response = await axios.get(`${base_url}/fuel/add`, {
                headers: {
                    'authorization': localStorage.getItem('token'),
                }
            })
            dispatch({ type: 'FETCH_FUEL', payload: response.data });

        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};