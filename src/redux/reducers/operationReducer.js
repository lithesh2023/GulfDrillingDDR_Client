const initialState = {
    operations: [],
};

const operationReducer = (state = initialState, action) => {
    const matches = action.type.match(/^FETCH_OPERATION_(.+)$/);

    if (matches) {
        const key = matches[1];
        return {
            ...state,
            [key]: action.payload,
        };
    }

    switch (action.type) {
        case 'SET_WELL':
            return { ...state, well: action.payload };
        case 'FETCH_OPERATIONS':
            return { ...state, operations: action.payload };
        case 'FETCH_SUB_OPERATIONS':
            return {...state , subOperations:action.payload}
        default:
            return state;
    }
};

export default operationReducer;