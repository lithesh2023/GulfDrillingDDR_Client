const initialState = {
    fuel: [],
};

const crewReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CREW':
            return { ...state, crew: action.payload };
            case 'FETCH_POB_CREW':
            return { ...state, pob_crew: action.payload };
        case 'FETCH_DESIGNATIONS':
                return { ...state, designations: action.payload };
        default:
            return state;
    }
};

export default crewReducer;