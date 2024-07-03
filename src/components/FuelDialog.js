import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { TextField, Button, Container, Typography, Grid, MenuItem } from '@mui/material'

import { useSelector, useDispatch } from 'react-redux';
import { addFuel, addFuelConsumption } from '../redux/actions/fuelAction'


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


export default function FuelDialog(props) {

  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const { unit } = user
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    (props.type === 'Consume') ? dispatch(addFuelConsumption(data)) : dispatch(addFuel(data))


    handleClose()
    setFormData({
      date: '',
      type: '',
      number: '',
      location: '',
      volume: '',
      unit: '',
    })
  };
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    date: '',
    number: '',
    type: '',
    location: '',
    volume: '',
    unit: '',
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
        Add Fuel {props.type === "Consume" ?'Consumption':'Filling'}
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        {/* <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create Fuel Consumption
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
              Fuel {props.type === "Consume" ?'Consumption':'Filling'} Details
            </Typography>
            <form onSubmit={handleSubmit}>

              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Date"
                    name="date"
                    value={formData.date}
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
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    select
                  >
                    <MenuItem value='Camp'>Camp</MenuItem>
                    <MenuItem value='Rig'>Rig</MenuItem>
                  </TextField>
                </Grid>
                {props.type === "Consume" && <Grid item xs={12}>
                  <TextField
                    select
                    label="Type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    fullWidth
                    required
                  >
                    <MenuItem value='Vehice'>Vehicle</MenuItem>
                    <MenuItem value='Asset'>Asset</MenuItem>
                  </TextField>
                </Grid>}
                {props.type === "Consume" && <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Vehicle/Equipment Number"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    required

                  />
                </Grid>}
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
                    type="text"
                    label="Fuel (Ltr)"
                    name="volume"
                    value={formData.volume}
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
