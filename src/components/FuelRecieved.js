import React, { useEffect, useState } from 'react';
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

import { Box, Container } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux'
import FuelDialog from './FuelDialog';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
function EditToolbar(props) {


  return (
    <GridToolbarContainer>
      <FuelDialog type='Receive'></FuelDialog>
      <GridToolbar></GridToolbar>
    </GridToolbarContainer>
  );
}


const FuelRecieved = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const axiosPrivate = useAxiosPrivate()
  const [loading, setLoading] = useState(true);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const fuelData = useSelector((state) => state.fuel.fuel)
  const user = useSelector((state) => state.user.user)
 
  const { unit } = user


  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  const receivedRows = fuelData?.fuelRecievedData
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    await axiosPrivate.delete(`/employee/${id}`);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = receivedRows.find((row) => row.id === id);
    if (editedRow.isNew) {

    }
  };

  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    if (newRow.isNew !== true) {
       axiosPrivate.put(`/fuel/fuelrecieve/${newRow.id}`).catch(err=>{
        console.error(err)
        navigate('/login',{state:{from:location},replace:true})
      })
    }
    else {
       axiosPrivate.post(`/fuel/add`, newRow).catch(err=>{
        console.error(err)
        navigate('/login',{state:{from:location},replace:true})
      })
    }
    axiosPrivate.get(`/fuel`).then((response)=>{
      dispatch({ type: 'FETCH_FUEL', payload: response.data });
    }).catch(err=>{
      console.error(err)
      navigate('/login',{state:{from:location},replace:true})
    })
    
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const columns = [

    {
      field: 'date', headerName: 'Date', type: 'date', editable: true, width: 250, valueGetter: (row) => {
        return new Date(row ? row : '');
      },
    },
    { field: 'location', headerName: 'Location', editable: true, type: 'singleSelect', width: 250, valueOptions: ['Camp', 'Rig Site'] },
    { field: 'volume', headerName: 'Fuel (Ltr)', editable: true, width: 250 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 250,
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

    axiosPrivate.get(`/fuel`).then((response) => {
      dispatch({ type: 'FETCH_FUEL', payload: response.data });
    }).catch(err => {
      navigate('/login', { state: { from: location }, replace: true });
    }).finally(() => {
      setLoading(false)
    })
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


      }}>
        <Box sx={{ flexGrow: 1, backgroundColor: '#ffffff' }}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={12}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Fuel Reception Tracker - {unit}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <DataGrid
          rows={receivedRows ? receivedRows : []}
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
            toolbar: { fuelData, setRowModesModel },
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

export default FuelRecieved;
