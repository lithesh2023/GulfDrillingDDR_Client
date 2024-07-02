import * as React from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';

import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import DetailPanelDataGrid from './CollapsibleTable'
import { useDispatch, useSelector } from 'react-redux'
import { setWell } from '../redux/actions/operationAction';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));





export default function Operation() {
  const { id } = useParams();
  const dispatch = useDispatch()
  
  
  React.useEffect(() => {
    dispatch(setWell(id))
  }, [dispatch]);
  const well = useSelector((state) => state.operations.well)
  const store = useSelector((state)=>state)

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
              Well Number : # {well?.well_number}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              Rigup Date: {new Date(well?.rig_up_date).toLocaleDateString("en-US")}
            </Typography>
          </Grid>

        </Grid>
      </Box>


      {well?._id && <DetailPanelDataGrid {...well}></DetailPanelDataGrid>}

    </Box>
  );
}
