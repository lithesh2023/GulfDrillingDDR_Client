import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Container, Typography, Grid } from '@mui/material'
import axios from 'axios'

import { useGridApiRef, DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from '@mui/x-data-grid'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const base_url = "http://localhost:4000/api/v1"
const theme = createTheme();



export default function POBDialog(props) {

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = React.useState([])
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        {/* GridToolbarExport is omitted to hide the export button */}
        <Button color="primary" variant='contained' size='small' onClick={handleGetSelectedRows}>
          Add to POB
        </Button>

      </GridToolbarContainer>
    );
  }

  const apiRef = useGridApiRef();
  const handleGetSelectedRows = async () => {
    const selectedRows = apiRef.current.getSelectedRows();
    const selectedData = Array.from(selectedRows.values());

    const response = await axios.put(`${base_url}/employee/addCrew`, selectedData, {
      headers: {
        'authorization': localStorage.getItem('token'),
      }

    });
  };

  const columns = [
    {
      field: 'Name', headerName: 'Name', width: 175, editable: false, headerClassName: 'sticky-header',
      cellClassName: 'sticky-cell'
    },
    { field: 'empNumber', headerName: 'Employee Number', width: 150, editable: false },
    { field: 'crew', headerName: 'Crew', width: 150, editable: false },
    { field: 'Designation', headerName: 'Designation', width: 150, editable: false, }
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
          unit: employee.unit,
          crew: employee.crew
        }));
        setUsers(employeeData);

      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (

    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Button color='primary' onClick={handleClickOpen} variant='contained' size='small'>
          Add to POB list
        </Button>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Add to POB List
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Container>
              <DataGrid

                rows={users}
                columns={columns}
                checkboxSelection
                apiRef={apiRef}
                slots={{
                  toolbar: CustomToolbar
                }}
                slotProps={{
                  toolbar: { showQuickFilter: true },
                }}
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: 'white',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                  },
                  '& .MuiDataGrid-columnHeader--sticky-left': {
                    backgroundColor: 'white',
                    zIndex: 1000,
                  },
                  '& .MuiDataGrid-cell--sticky-left': {
                    backgroundColor: 'white',
                    zIndex: 1000,
                  },
                  '& .sticky-header': {
                    position: 'sticky',
                    left: 0,
                    backgroundColor: 'white',
                    zIndex: 1000,
                  },
                  '& .sticky-cell': {
                    position: 'sticky',
                    left: 0,
                    backgroundColor: 'white',
                    zIndex: 1000,
                  },
                }}
              />

            </Container>
          </DialogContent>
          <DialogActions>

          </DialogActions>
        </BootstrapDialog>
      </ThemeProvider>
    </React.Fragment>
  );
}
