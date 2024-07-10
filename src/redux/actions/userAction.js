
export const setUser = (data,navigate,from) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        try {
            dispatch({ type: 'SET_USER', payload: data.currentUser });
            dispatch({ type: 'SET_TOKEN', payload: data.token });
            navigate(from, {replace:true})

        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
        }
    };
};