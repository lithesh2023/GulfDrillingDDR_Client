import axios from "axios";

const base_url = process.env.REACT_APP_API_URL

export const fetchOperations = (id) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        try {
            const response = await axios.get(`${base_url}/operation${id ? '/' + id : ''}`, {
                headers: {
                    'authorization': localStorage.getItem('token'),
                }
            })
            console.log("Operations",response.data)
            dispatch({ type: 'FETCH_OPERATIONS', payload: response.data });

        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};
export const fetchOperationKey = (key) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        try {
            const response = await axios.get(`${base_url}/key/${key}`, {
                headers: {
                  'authorization': localStorage.getItem('token'),
                }
              });

            dispatch({ type: `FETCH_OPERATION_${key}`, payload: response.data[0].values });

        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};


export const addOperation = (data) => {
    return async (dispatch) => {
        try {
             await axios.post(`${base_url}/operation`,data, {
                headers: {
                    'authorization': localStorage.getItem('token'),
                }
            })
            const response = await axios.get(`${base_url}/operation${data.well ? '/' + data.well : ''}`, {
                headers: {
                    'authorization': localStorage.getItem('token'),
                }
            })
            dispatch({ type: 'FETCH_OPERATIONS', payload: response.data });

        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};

export const setWell = (id) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        try {
            const response = await axios.get(`${base_url}/well/${id}`, {
                headers: {
                    'authorization': localStorage.getItem('token'),
                }
            })
            
            dispatch({ type: 'SET_WELL', payload: response.data });

        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};

export const fetchSubOperations = (key) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        try {
            const response = await axios.get(`${base_url}/sub-operation/${key}`, {
                headers: {
                  'authorization': localStorage.getItem('token'),
                }
              });

            dispatch({ type: `FETCH_SUB_OPERATIONS`, payload: response.data[0].values });

        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};

export const addSubOperation = (data,well) => {
    console.log("well in action",well)
    return async (dispatch) => {
        try {
             await axios.post(`${base_url}/sub-operation`,data, {
                headers: {
                    'authorization': localStorage.getItem('token'),
                }
            })
            const response = await axios.get(`${base_url}/operation${well?._id ? '/' + well._id : ''}`, {
                headers: {
                    'authorization': localStorage.getItem('token'),
                }
            })
            dispatch({ type: 'FETCH_OPERATIONS', payload: response.data });

        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};