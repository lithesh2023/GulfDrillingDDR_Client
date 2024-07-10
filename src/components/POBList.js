import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

import { Grid, Typography } from '@mui/material';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridToolbar
} from '@mui/x-data-grid';
import {
    randomId,
} from '@mui/x-data-grid-generator';
import { Box, Container } from '@mui/material';
import POBDialog from './POBDialog';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { fetchPOBCrew } from '../redux/actions/crewActions';

function EditToolbar(props) {
    const {  setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <POBDialog></POBDialog>
            <GridToolbar></GridToolbar>
        </GridToolbarContainer>
    );
}


const POBList = () => {
    const dispatch = useDispatch()
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()
   const users = useSelector(state => state.crew.pob_crew)
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    // const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [designations, setDesignations] = React.useState([])
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };


    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => async () => {
        try {
            await axiosPrivate.put(`/employee/${id}`, { POBDate: '', unit: '' }, {

            });
           
        }
        catch (error) {
            console.log('Error: ' + error)
            navigate('/login', { state: { from: location }, replace: true });
        }
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = users.find((row) => row.id === id);
        if (editedRow.isNew) {
            // setUsers(users.filter((row) => row.id !== id));
           
        }
    };

    const processRowUpdate = async (newRow) => {
        try {
            const updatedRow = { ...newRow, isNew: false };
            // setUsers(users.map((row) => (row.id === newRow.id ? updatedRow : row)));
            newRow.isNew !== true ? await axiosPrivate.put(`/employee/${newRow.empNumber}`, newRow) : await axiosPrivate.post(`/employee`, newRow)
            dispatch(fetchPOBCrew(axiosPrivate))
            return updatedRow;
        }
        catch (error) {
            console.log('Error: ' + error)
            navigate('/login', { state: { from: location }, replace: true });
        }
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };
    const columns = [

        {
            field: 'Name', headerName: 'Name', editable: false, width: 150,
        },
        { field: 'empNumber', headerName: 'Employee Number', editable: false, width: 150 },
        {
            field: 'POBDate', headerName: 'POB Date', type: 'date', editable: false, width: 150, valueGetter: (row) => {
                return new Date(row ? row : '');
            },
        },
        { field: 'crew', headerName: 'Crew', editable: false, width: 150, type: 'singleSelect', valueOptions: ['A CREW', 'B CREW', 'C CREW', 'D CREW', 'THIRD PARTY CREW'] },
        {
            field: 'Designation', headerName: 'Designation', width: 150, editable: false, type: 'singleSelect', valueOptions: designations
        },
        { field: 'unit', headerName: 'Unit', editable: false, width: 150, type: 'singleSelect', valueOptions: ['Hoist 1', 'Hoist 2', 'Hoist 3'] },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 150,
            cellClassName: 'actions',
            headerClassName: 'sticky-header',
            cellClassName: 'sticky-cell',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [

                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                dispatch(fetchPOBCrew(axiosPrivate))
                const res = await axiosPrivate.get(`/key/designation`);
                setDesignations(res.data[0].values)
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/login', { state: { from: location }, replace: true });

            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [dispatch]);

    return (
        <Container>
            <Box sx={{
                height: '100%',
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
                '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#20547b', color: 'black', fontWeight: 'large',
                },

            }}>
                <Box sx={{ flexGrow: 1, backgroundColor: '#ffffff' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={12}>
                            <Typography component="h2" variant="h5" color="primary" gutterBottom>
                                POB List on {formattedDate}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <DataGrid
                    rows={users?users:[]}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    loading={loading}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slots={{
                        toolbar: EditToolbar,
                    }}
                    slotProps={{
                        toolbar: {setRowModesModel },
                    }}
                    sx={{

                        '& .MuiDataGrid-root': {
                            minHeight: 300,
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            display: 'flex',
                            flexDirection: 'row',
                            backgroundColor: '#20547b', color: 'black', fontWeight: 'large',
                        },
                        '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
                            display: 'flex',
                            flex: 1,

                        },
                        '& .MuiDataGrid-columnHeader': {
                            backgroundColor: '#20547b', color: 'white', fontWeight: 14,
                        },

                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#20547b',
                            position: 'sticky',
                            top: 0,
                            zIndex: 1000,
                        },
                        '& .MuiDataGrid-columnHeader--sticky-right': {
                            backgroundColor: '#20547b',
                            zIndex: 1000,
                        },
                        '& .MuiDataGrid-cell--sticky-right': {
                            backgroundColor: '#20547b',
                            zIndex: 1000,
                        },
                        '& .sticky-header': {
                            position: 'sticky',
                            right: 0,
                            backgroundColor: '#20547b',
                            zIndex: 1000,
                        },
                        '& .sticky-cell': {
                            position: 'sticky',
                            right: 0,
                            backgroundColor: 'white',
                            zIndex: 1000,
                        },
                    }}
                />
            </Box>
        </Container>
    );
};

export default POBList;
