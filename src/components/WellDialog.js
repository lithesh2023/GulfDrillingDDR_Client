import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { TextField, Button, Container, Typography, Grid } from '@mui/material'

import { useSelector, useDispatch } from 'react-redux';

import { axiosPrivate } from '../api/axios';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


export default function WellDialog() {

  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const { unit } = user
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
   
    await axiosPrivate.post(`/well`, data)
    const response = await axiosPrivate.get(`/well`);
    dispatch({ type: 'GET_WELLS', payload: response.data });
    handleClose()
    setFormData({
      well_number: '',
      rig_up_date: '',
      job_type: '',
      client: '',
      unit: '',
      lti_days: ''
    })
  };
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    well_number: '',
    rig_up_date: '',
    job_type: '',
    client: '',
    unit: '',
    lti_days: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const today = new Date().toISOString().split('T')[0];


  return (
    <React.Fragment>
      <Button color='primary' onClick={handleClickOpen} size='small' variant='contained' startIcon={<AddIcon></AddIcon>}>
        Add well
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        {/* <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create Well
        </DialogTitle> */}
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
            <Typography variant="h4" align="center" gutterBottom>
              Well Details
            </Typography>
            <form onSubmit={handleSubmit}>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Well Number"
                    name="well_number"
                    value={formData.well_number}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Rig Up Date"
                    name="rig_up_date"
                    value={formData.rig_up_date}
                    onChange={handleChange}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      min: today,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Job Type"
                    name="job_type"
                    value={formData.job_type}
                    onChange={handleChange}
                    required

                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Client"
                    name="client"
                    value={formData.client}
                    onChange={handleChange}
                    required

                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Unit"
                    name="unit"
                    value={unit}
                    id="filled-disabled"
                    required
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    label="LTI Days"
                    name="lti_days"
                    value={formData.lti_days}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
