import axios from "axios";

const base_url = process.env.REACT_APP_API_URL

export const fetchOperations = (id,axiosPrivate) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        try {
            const response = await axiosPrivate.get(`/operation${id ? '/' + id : ''}`)
           
            dispatch({ type: 'FETCH_OPERATIONS', payload: response.data });

        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};
export const fetchOperationKey = (key,axiosPrivate) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        try {
            const response = await axiosPrivate.get(`/key/${key}`);

            dispatch({ type: `FETCH_OPERATION_${key}`, payload: response.data[0].values });

        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};


export const addOperation = (data,axiosPrivate) => {
    return async (dispatch) => {
        try {
             await axiosPrivate.post(`${base_url}/operation`,data)
            const response = await axiosPrivate.get(`${base_url}/operation${data.well ? '/' + data.well : ''}`)
            dispatch({ type: 'FETCH_OPERATIONS', payload: response.data });

        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};

export const setWell = (id,axiosPrivate) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        try {
            const response = await axiosPrivate.get(`/well/${id}`)
            
            dispatch({ type: 'SET_WELL', payload: response.data });

        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};

export const fetchSubOperations = (key,axiosPrivate) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        try {
            const response = await axiosPrivate.get(`/sub-operation/${key}`);

            dispatch({ type: `FETCH_SUB_OPERATIONS`, payload: response.data[0].values });

        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};

export const addSubOperation = (data,well,axiosPrivate) => {
   
    return async (dispatch) => {
        try {
             await axiosPrivate.post(`/sub-operation`,data)
            const response = await axiosPrivate.get(`${base_url}/operation${well?._id ? '/' + well._id : ''}`)
            dispatch({ type: 'FETCH_OPERATIONS', payload: response.data });

        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};