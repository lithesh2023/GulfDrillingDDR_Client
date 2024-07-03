const initialState = {
    fuel: [],
};

const fuelReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_FUEL':
            return { ...state, fuel: action.payload };
        default:
            return state;
    }
};

export default fuelReducer;