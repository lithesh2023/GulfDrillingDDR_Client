import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { getWells, addWell, updateWell, deleteWell } from '../redux/actions/wellActions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import WellDialog from './WellDialog';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbar

} from '@mui/x-data-grid';
import useAxiosPrivate from '../hooks/useAxiosPrivate';


function EditToolbar(props) {
  const { setRowModesModel, user } = props;

  return (
    <GridToolbarContainer>
      <WellDialog />
      <GridToolbar></GridToolbar>
    </GridToolbarContainer>
  );
}

export default function Well() {

  const navigate = useNavigate();
  const location = useLocation()
  const axiosPrivate = useAxiosPrivate();
  const [rowModesModel, setRowModesModel] = React.useState({});
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.wells.wells)
  const user = useSelector((state) => state.user.user)
  const loading = useSelector((state) => state.wells.loading);
  const token = useSelector((state) => state.user.token)

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
    dispatch(deleteWell(id, token))
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
      // setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    // setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    newRow.isNew !== true ? dispatch(updateWell(newRow, token)) : dispatch(addWell(newRow, token));
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
    { field: 'status', headerName: 'Status', width: 100,type: 'singleSelect',valueOptions: ['Active', 'Completed', 'Not Started'], editable: true },
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



  // Call fetchData on component mount
  useEffect(() => {
    let isMounted = true;
    // const controller = new AbortController();
   
    axiosPrivate.get(`/well`, {
        // signal: controller.signal
      }).then((response) => {

        isMounted && dispatch(getWells(response.data));
      }).catch((err) => {
        console.log('Error: ' + err)
        navigate('/login', { state: { from: location }, replace: true });
      })
    return () => {
      isMounted = false;
      // controller.abort();
    }
  }, [dispatch]);

  return (
    <Box
      sx={{
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
          toolbar: { setRowModesModel, user, showQuickFilter: true },
        }}
        sx={{
          '& .MuiDataGrid-root': {
            minHeight: 300,
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#20547b', color: 'white', fontWeight: 14,
          },
          '& .MuiDataGrid-columnHeaders': {
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#20547b', color: 'black', fontWeight: 'large',
          },
        }}
      />

    </Box>
  );
}
