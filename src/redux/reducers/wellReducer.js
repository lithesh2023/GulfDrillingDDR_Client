const initialState = {
    wells: [],
    loading: false,
    error: null,
  };
  
  const wellReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_DATA_REQUEST':
        return { ...state, loading: true };
      case 'GET_WELLS':
        return { ...state, loading: false, wells: action.payload };
      case 'FETCH_DATA_FAILURE':
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  
  export default wellReducer;