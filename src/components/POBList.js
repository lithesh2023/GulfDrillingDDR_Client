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
import axios from 'axios';
import POBDialog from './POBDialog';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
    stickyColumn: {
      position: 'sticky',
      left: 0,
      backgroundColor: 'white', // Ensures the sticky column has a background
      zIndex: 1, // Ensures it stays above other columns
    },
  });
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
            <POBDialog></POBDialog>
            <GridToolbar></GridToolbar>
        </GridToolbarContainer>
    );
}

const base_url = "http://localhost:4000/api/v1"
const POBList = () => {
    const classes = useStyles();
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const [users, setUsers] = useState([]);
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
        await axios.put(`${base_url}/employee/${id}`,{POBDate:'',unit:''}, {
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
        newRow.isNew !== true ? await axios.put(`${base_url}/employee/${newRow.empNumber}`, newRow, {
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

        { field: 'Name', headerName: 'Name', width: 175, editable: false ,headerClassName: 'sticky-header',
            cellClassName: 'sticky-column' },
        { field: 'empNumber', headerName: 'Employee Number', width: 150, editable: false },
        { field: 'POBDate', headerName: 'POB Date',type:'date', width: 150, editable: false ,valueGetter: (row) => {
            return new Date(row ? row : '');
          },},
        { field: 'crew', headerName: 'Crew', width: 150, editable: false, type: 'singleSelect', valueOptions: ['A CREW', 'B CREW', 'C CREW', 'D CREW', 'THIRD PARTY CREW'] },
        {
            field: 'Designation', headerName: 'Designation', width: 175, editable: false, type: 'singleSelect', valueOptions: designations
        },
        { field: 'unit', headerName: 'Unit', width: 150, editable: false, type: 'singleSelect', valueOptions: ['Hoist 1', 'Hoist 2', 'Hoist 3'] },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
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
                const response = await axios.get(`${base_url}/employee/POB`, {
                    headers: {
                        'authorization': localStorage.getItem('token'),
                    }
                });

                const employeeData = response?.data?.employees?.map((employee) => ({
                    id: employee._id,
                    Name: employee.Name,
                    empNumber: employee.empNumber,
                    Designation: employee.Designation,
                    unit: employee.unit,
                    crew: employee.crew,
                    POBDate:employee.POBDate
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
                backgroundColor: '#f3f3f3'
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
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#20547b', color: 'black', fontWeight: 'large',
                        },
                    }}
                />
            </Box>
        </Container>
    );
};

export default POBList;
