import axios from "axios";

const base_url = process.env.REACT_APP_API_URL

export const fetchFuel = (data) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_FUEL', payload: data });
    };
};
export const addFuel = (fueldata,token) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        try {
            await axios.post(`${base_url}/fuel/add`, fueldata, {
                headers: {
                     'Authorization': `Bearer ${token}`,
                }
            })
            const response = await axios.get(`${base_url}/fuel`, {
                headers: {
                     'Authorization': `Bearer ${token}`,
                }
            })
            dispatch({ type: 'FETCH_FUEL', payload: response.data });

        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};
export const addFuelConsumption = (fueldata,token) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        try {
            await axios.post(`${base_url}/fuel/consume`, fueldata, {
                headers: {
                     'Authorization': `Bearer ${token}`,
                }
            })
            const response = await axios.get(`${base_url}/fuel`, {
                headers: {
                     'Authorization': `Bearer ${token}`,
                }
            })
            dispatch({ type: 'FETCH_FUEL', payload: response.data });

        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};
export const updateFuel = (fueldata,token) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        try {
            console.log("Fuel update",fueldata)
            await axios.put(`${base_url}/fuel/fuelconsumption/${fueldata.id}`, fueldata, {
                headers: {
                   'Authorization': `Bearer ${token}`,
                }
              })
            const response = await axios.get(`${base_url}/fuel/add`, {
                headers: {
                     'Authorization': `Bearer ${token}`,
                }
            })
            dispatch({ type: 'FETCH_FUEL', payload: response.data });

        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};