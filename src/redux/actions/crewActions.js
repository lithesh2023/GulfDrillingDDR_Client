

export const fetchCrew = (axiosPrivate) => {
    return async (dispatch) => {
        const response = await axiosPrivate.get(`/employee/`)

                const employeeData = response?.data?.employees?.map((employee) => ({
                    id: employee._id,
                    Name: employee.Name,
                    empNumber: employee.empNumber,
                    Designation: employee.Designation,
                    crew: employee.crew
                }));
        dispatch({ type: 'FETCH_CREW', payload: employeeData });
    };
};
export const fetchPOBCrew = (axiosPrivate) => {
    return async (dispatch) => {
        const response = await axiosPrivate.get(`/employee/POB`)

        const employeeData = response?.data?.employees?.map((employee) => ({
            id: employee._id,
            Name: employee.Name,
            empNumber: employee.empNumber,
            Designation: employee.Designation,
            unit: employee.unit,
            crew: employee.crew,
            POBDate: employee.POBDate
        }));
        dispatch({ type: 'FETCH_POB_CREW', payload: employeeData });
    };
};
export const fetchDesignations = (axiosPrivate) =>{
    return async(dispatch) =>{
        const res = await axiosPrivate.get(`/key/designation`);
        dispatch({ type: 'FETCH_DESIGNATIONS', payload: res.data[0].values })
    }
}