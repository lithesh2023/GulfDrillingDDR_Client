import * as React from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';



import axios from 'axios'

import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import DetailPanelDataGrid from './CollapsibleTable'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const base_url = "http://localhost:4000/api/v1"



export default function Operation(props) {
  const [rows, setRows] = React.useState([]);

  const [well, setWell] = React.useState({})

  const { id } = useParams();







  const handleDeleteClick = (id) => async () => {
    await axios.delete(`${base_url}/operation/${id}`);
    setRows(rows.filter((row) => row.id !== id));
  };
  const handleLaunchClick = (id) => async () => {
   
    await axios.delete(`${base_url}/operation/${id}`, {
      headers: {
        'authorization': localStorage.getItem('token'),
      }
    });
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {


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




  // Call fetchData on component mount
  React.useEffect(() => {
    try {

      axios.get(`${base_url}/well/${id}`, {
        headers: {
          'authorization': localStorage.getItem('token'),
        }
      }).then((well) => {
        setWell(well.data)
      }).catch((err) => {
        console.log('Error: ' + err)
      })


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [props]);

  return (
    <Box
      sx={{

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
            <Typography component="h2" variant="h5" color="primary" gutterBottom>
              Operations Details
            </Typography>
            <Typography component="p" variant="h6">
             Well Number : # {well.well_number}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
             Rigup Date: {new Date(well.rig_up_date).toLocaleDateString("en-US")}
            </Typography>
          </Grid>

        </Grid>
      </Box>

     
      {well._id  && <DetailPanelDataGrid {...well}></DetailPanelDataGrid>}

    </Box>
  );
}
