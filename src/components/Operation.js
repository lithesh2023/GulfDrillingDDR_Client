import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import { ArrowBack, Title } from '@mui/icons-material';

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,

} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';

import axios from 'axios'
import OperationDialog from './OperationDialog';
import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const base_url = "http://localhost:4000/api/v1"

function EditToolbar(props) {
  const { setRows, setRowModesModel, show, well } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, operation_number: '', client: '', unit: '', lti_days: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'operation_number' },
    }));
  };

  return (
    <GridToolbarContainer>

      <Button color="primary" startIcon={<ArrowBack />} onClick={show}>
        {well.well_number}
      </Button>
      <Button color="warning" startIcon={<LaunchIcon />} onClick={handleClick}>
        Export
      </Button>
      <OperationDialog well_number={well.well_number} id={well._id} />

    </GridToolbarContainer>
  );
}

export default function Operation(props) {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [well, setWell] = React.useState({})
  const well_id = props.well_id

  const show = () => {
    props.setShowOperation(false);
    props.setShowWell(true)
  };
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
    await axios.delete(`${base_url}/operation/${id}`);
    setRows(rows.filter((row) => row.id !== id));
  };
  const handleLaunchClick = (id) => async () => {
    await axios.delete(`${base_url}/operation/${id}`);
    setRows(rows.filter((row) => row.id !== id));
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
    newRow.isNew !== true ? await axios.put(`${base_url}/operation/${newRow.id}`, newRow) : await axios.post(`${base_url}/operation`, newRow)
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: 'StartDate',
      headerName: 'Start Date',
      type: 'date',
      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      valueGetter: (row) => {
        return new Date(row.value);
      }
    },
    {
      field: 'Plan_HRS',
      headerName: 'Plan Hours',
      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'Actual_HRS',
      headerName: 'Actual Hours',
      width: 200,
      editable: false,

    },
    { field: 'Diff_HRS', headerName: 'Difference Hours', width: 180, editable: false },
    { field: 'operation_code', headerName: 'Operation Code', width: 150, editable: true },
    { field: 'description', headerName: 'Description', width: 150, editable: true },
    { field: 'createdBy', headerName: 'Created By', width: 100, type: 'number', editable: true },
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
      const response = await axios.get(`${base_url}/operation`);
      setRows(response.data);
      const well = await axios.get(`${base_url}/well/${well_id}`);
      setWell(well.data)

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
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={12}>
              <Typography component="h2" variant="h3" color="primary" gutterBottom>
                Well Details
              </Typography>
              <Typography component="p" variant="h4">
                # {well.well_number}
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                {well.rig_up_date}
              </Typography>
          </Grid>

        </Grid>
      </Box>
      <DataGrid
        headerTitle="Operations"
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, show, well },
        }}
      />

    </Box>
  );
}
