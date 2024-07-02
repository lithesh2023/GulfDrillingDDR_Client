import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
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
        setUsers((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add Employee
            </Button>
        </GridToolbarContainer>
    );
}

const base_url = process.env.REACT_APP_API_URL
const Employees = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rowModesModel, setRowModesModel] = React.useState({});
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

    const handleDeleteClick = (id) => async() => {
        await axios.delete(`${base_url}/user/${id}`, {
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

    const processRowUpdate = async(newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setUsers(users.map((row) => (row.id === newRow.id ? updatedRow : row)));
        newRow.isNew !== true ? await axios.put(`${base_url}/user/${newRow.id}`, newRow, {
            headers: {
              'authorization': localStorage.getItem('token'),
            }
          }) : await axios.post(`${base_url}/user`, newRow, {
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
        // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 200, editable: true },
        { field: 'email', headerName: 'Email', width: 200, editable: true },
        { field: 'phone', headerName: 'Phone', width: 150, editable: true, type: 'number' },
        { field: 'role', headerName: 'Role', width: 100, editable: true, type: 'singleSelect', valueOptions: ['Admin', 'Manager', 'Employee'] },
        {
            field: 'designation', headerName: 'Designation', width: 175, editable: true, type: 'singleSelect', valueOptions: [
                "Admin",
                "Rig Manager",
                "Tool Pusher",
                "Driller",
                "Assistant Driller",
                "Derrickman",
                "Floorman",
                "Roustabout",
                "HSE Officer",
                "Electrician",
                "Mechanic",
                "Chief Electrician",
                "Chief Mechanic",
                "LD Driver",
                "Crane Operator",
                "HD Driver",
                "Guard"
            ]
        },
        { field: 'unit', headerName: 'Unit', width: 100, editable: true },
        { field: 'activation_code', headerName: 'Activation Code', width: 100, editable: true },

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
                const response = await axios.get(`${base_url}/user/`, {
                    headers: {
                        'authorization': localStorage.getItem('token'),
                    }
                });
                const userData = response.data.map((user) => ({
                    id: user._id,
                    name: user.firstname + ' ' + user.lastname,
                    email: user.email,
                    phone: user.phone,
                    activation_code:user.activation_code,
                    employee_number:user.employee_number,
                    designaton:user.designaton,
                    unit:user.unit,
                    role:user.role

                }));
                setUsers(userData);
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
            <Box sx={{ height: 400, width: '100%' , '& .MuiDataGrid-columnHeaders': {
          backgroundColor: '#20547b', color: 'black', fontWeight: 'large',
        },
        backgroundColor: '#f3f3f3'}}>
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
                          backgroundColor: '#20547b', color: 'white', fontWeight: 'large',
                        },
                      }}
                />
            </Box>
        </Container>
    );
};

export default Employees;
