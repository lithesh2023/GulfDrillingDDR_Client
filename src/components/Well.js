import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import CustomizedDialog from './CustomizedDialog';
import { useNavigate } from 'react-router-dom';
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

import axios from 'axios'



const base_url = "http://localhost:4000/api/v1"

function EditToolbar(props) {
  const { setRows, setRowModesModel, user } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, well_number: '', client: '', unit: '', lti_days: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'well_number' },
    }));
  };

  return (
    <GridToolbarContainer>
      <CustomizedDialog unit={user.unit} />
      <GridToolbar></GridToolbar>
    </GridToolbarContainer>
  );
}

export default function Well(props) {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const { user } = props

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
    await axios.delete(`${base_url}/well/${id}`, {
      headers: {
        'authorization': localStorage.getItem('token'),
      }
    });
    setRows(rows.filter((row) => row.id !== id));
  };
  const handleLaunchClick = (id) => async () => {

    navigate(`/Operation/${id}`);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    newRow.isNew !== true ? await axios.put(`${base_url}/well/${newRow.id}`, newRow, {
      headers: {
        'authorization': localStorage.getItem('token'),
      }
    }) : await axios.post(`${base_url}/well`, newRow, {
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
    { field: 'well_number', headerName: 'Well Number', width: 100, editable: true },
    {
      field: 'rig_up_date',
      headerName: 'Rig Up Date',
      type: 'date',
      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      valueGetter: (row) => {
        return new Date(row ? row : '');
      },
    },
    {
      field: 'job_type',
      headerName: 'Job Type',
      width: 200,
      editable: true,

    },
    { field: 'client', headerName: 'Client', width: 180, editable: true },
    { field: 'unit', headerName: 'Unit', width: 150, editable: true },
    { field: 'lti_days', headerName: 'LTI days', width: 100, type: 'number', editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 200,
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
          <GridActionsCellItem
            icon={<LaunchIcon />}
            label="DDR"
            className="textPrimary"

            onClick={handleLaunchClick(id)}
            color="warning"
          />,

        ];
      },
    },
  ];

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${base_url}/well`, {
        headers: {
          'authorization': token,
        }
      });
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Call fetchData on component mount
  React.useEffect(() => {
    fetchData();
  }, [rowModesModel]);

  return (
    <Box
      sx={{
        height: 400,
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
      }}
    ><Box sx={{ flexGrow: 1, backgroundColor: '#ffffff' }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={12}>
            <Typography component="h2" variant="h5" color="primary" gutterBottom>
              Well Details
            </Typography>

          </Grid>

        </Grid>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, user, showQuickFilter: true},
        }}
      />

    </Box>
  );
}
