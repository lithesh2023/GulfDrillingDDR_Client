import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
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
    GridToolbar,
} from '@mui/x-data-grid';
import {
    randomId,
} from '@mui/x-data-grid-generator';
import { Box, Container } from '@mui/material';
import axios from 'axios';
function EditToolbar(props) {
    const { setUsers, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setUsers((oldRows) => [...oldRows, { id, Name: '', Designation: '', empNumber: '', crew: '', unit: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" variant='contained' size='small' startIcon={<AddIcon />} onClick={handleClick}>
                Add Employee
            </Button>
            <GridToolbar></GridToolbar>
        </GridToolbarContainer>
    );
}

const base_url = process.env.REACT_APP_API_URL
const CrewList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [designations, setDesignations] = React.useState([])
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => async () => {
        await axios.delete(`${base_url}/employee/${id}`, {
            headers: {
                'authorization': localStorage.getItem('token'),
            }
        });
        setUsers(users.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = users.find((row) => row.id === id);
        if (editedRow.isNew) {
            setUsers(users.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = async (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setUsers(users.map((row) => (row.id === newRow.id ? updatedRow : row)));
        newRow.isNew !== true ? await axios.put(`${base_url}/employee/${newRow.id}`, newRow, {
            headers: {
                'authorization': localStorage.getItem('token'),
            }
        }) : await axios.post(`${base_url}/employee`, newRow, {
            headers: {
                'authorization': localStorage.getItem('token'),
            }
        })
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };
    const columns = [

        { field: 'Name', headerName: 'Name', editable: true, width: 200 },
        { field: 'empNumber', headerName: 'Employee Number', editable: true, width: 200 },
        { field: 'crew', headerName: 'Crew', editable: true, type: 'singleSelect', width: 200, valueOptions: ['A CREW', 'B CREW', 'C CREW', 'D CREW', 'THIRD PARTY CREW'] },
        {
            field: 'Designation', headerName: 'Designation', editable: true, width: 270, type: 'singleSelect', valueOptions: designations
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 200,
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
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
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
                const response = await axios.get(`${base_url}/employee/`, {
                    headers: {
                        'authorization': localStorage.getItem('token'),
                    }
                });

                const employeeData = response?.data?.employees?.map((employee) => ({
                    id: employee._id,
                    Name: employee.Name,
                    empNumber: employee.empNumber,
                    Designation: employee.Designation,
                    crew: employee.crew
                }));
                setUsers(employeeData);

                const res = await axios.get(`${base_url}/key/designation`, {
                    headers: {
                        'authorization': localStorage.getItem('token'),
                    }
                });
                setDesignations(res.data[0].values)
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

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


            }}>
                <Box sx={{ flexGrow: 1, backgroundColor: '#ffffff' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={12}>
                            <Typography component="h2" variant="h5" color="primary" gutterBottom>
                                Crew List
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <DataGrid
                    rows={users}
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
                        toolbar: { setUsers, setRowModesModel },
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

export default CrewList;
