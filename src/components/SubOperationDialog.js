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
export default function SubOperationDialog(props) {

  const [operationCode,setOperationCode] =React.useState([])
  const [category,setCategory] =React.useState([])
  const fetchData = async () => {
    try {
      const opCodeResult = await axios.get(`${base_url}/key/SubOperationCode`);
      
      setOperationCode(opCodeResult.data[0].values);
      const categoryResult = await axios.get(`${base_url}/key/Category`);
      
      setCategory(categoryResult.data[0].values);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Call fetchData on component mount
  React.useEffect(() => {
    fetchData();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());
    data = {...data,Operation:props.id}
    await axios.post(`${base_url}/sub-operation`, data)
    handleClose()
    setFormData({
      StartTime: '',
      EndTime: '',
      Type: '',
      SubOpCOde: '',
      Description: '',
      createdBy: '',
      Operation: ''
    })
  };
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    StartTime: '',
    EndTime: '',
    Type: '',
    SubOpCOde: '',
    Description: '',
    createdBy: '',
    Operation: ''
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
        +
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create Sub Operation
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
            Operation Code  - {props.id}
            </Typography>
            <form onSubmit={handleSubmit}>

              <Grid container spacing={2}>
              <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Operation ID"
                    name="Operation"
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
                    type="time"
                    label="Start Time"
                    name="StartTime"
                    value={formData.StartTime}
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
                    type="time"
                    label="End Time"
                    name="EndTime"
                    value={formData.EndTime}
                    onChange={handleChange}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                

                <Grid item xs={12}>
                  <TextField
                    select
                    label="Type"
                    name="Type"
                    value={formData.Type}
                    onChange={handleChange}
                    fullWidth
                    required
                  >
                    <MenuItem value="OPT">OPT</MenuItem>
                    <MenuItem value="NPT">NPT</MenuItem>
                  </TextField>
                </Grid>
                
                <Grid item xs={12}>

                  <TextField
                    select
                    label="Category"
                    name="Category"
                    value={formData.Category}
                    onChange={handleChange}
                    fullWidth
                    required
                  >
                    {category.map((code) => <MenuItem value={code}>{code}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    label="Sub Operation Code"
                    name="SubOpCode"
                    value={formData.SubOpCode}
                    onChange={handleChange}
                    fullWidth
                    required
                  >
                    {operationCode.map((code) => <MenuItem value={code}>{code}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Description"
                    name="Description"
                    value={formData.Description}
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
