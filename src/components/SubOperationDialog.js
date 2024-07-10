import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';

import { TextField, Button, Container, Typography, Grid, Divider } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import { fetchOperationKey ,addSubOperation} from '../redux/actions/operationAction'
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function SubOperationDialog(props) {
  const dispatch = useDispatch()
  const subOpCode = useSelector((state) => state.operations.SubOperationCode)
  const category = useSelector((state) => state.operations.Category)
  const well = useSelector((state)=> state.operations.well)
  const token = useSelector((state) => state.user.token)
  const axiosPrivate = useAxiosPrivate()

  // Call fetchData on component mount
  React.useEffect(() => {
    dispatch(fetchOperationKey('SubOperationCode',axiosPrivate))
    dispatch(fetchOperationKey('Category',axiosPrivate))
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());
    data = { ...data, Operation: props.data.id }
    dispatch(addSubOperation(data,well,axiosPrivate))
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
      <Button color='success' size='small' onClick={handleClickOpen} startIcon={<AddIcon></AddIcon>}>
        Add
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#4caf50' }} id="customized-dialog-title">
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
            <Typography variant="h6" align="center" gutterBottom>
              Operation Code : {props.data.op_code}
            </Typography>
            <Divider sx={{ my: 1 }}></Divider>
            <form onSubmit={handleSubmit}>

              <Grid container spacing={2}>
                {/* <Grid item xs={12}>
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
                </Grid> */}
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
                    {category?.map((code) => <MenuItem value={code}>{code}</MenuItem>)}
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
                    {subOpCode?.map((code) => <MenuItem value={code}>{code}</MenuItem>)}
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
