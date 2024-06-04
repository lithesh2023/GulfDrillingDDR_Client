import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import { TextField, Button, Container, Typography, Grid } from '@mui/material'
import axios from 'axios'
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const base_url = "http://localhost:4000/api/v1"
export default function OperationDialog(props) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());
    data = {...data,well:props.id}
    await axios.post(`${base_url}/operation`, data)
    handleClose()
    setFormData({
      StartDate: '',
      Plan_HRS: '',
      day_number: '',
      operation_code: '',
      Diff_HRS: '',
      description: '',
      createdBy: '',
      well: ''
    })
  };
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    StartDate: '',
    Plan_HRS: '',
    day_number: '',
    operation_code: '',
    Diff_HRS: '',
    description: '',
    createdBy: '',
    well: '',
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



  return (
    <React.Fragment>
      <Button color='success' onClick={handleClickOpen}>
        Add Operation
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create Operation
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
            <Typography variant="h4" align="center" gutterBottom>
              Well Number  - {props.well_number}
            </Typography>
            <form onSubmit={handleSubmit}>

              <Grid container spacing={2}>
              <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Well ID"
                    name="well"
                    value={props.id}
                    onChange={handleChange}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Start Date"
                    name="StartDate"
                    value={formData.StartDate}
                    onChange={handleChange}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Day Number"
                    name="day_number"
                    value={formData.day_number}
                    onChange={handleChange}
                    required

                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Plan Hours"
                    name="Plan_HRS"
                    value={formData.Plan_HRS}
                    onChange={handleChange}
                    required
                    step=".01"
                  />
                </Grid>
                <Grid item xs={12}>

                  <TextField
                    select
                    label="Operation Code"
                    name="operation_code"
                    value={formData.operation_code}
                    onChange={handleChange}
                    fullWidth
                    required
                  >
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                    <MenuItem value="option3">Option 3</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Description"
                    name="description"
                    value={formData.description}
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
