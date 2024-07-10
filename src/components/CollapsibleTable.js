import * as React from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LaunchIcon from '@mui/icons-material/Launch';
import SubOperationDialog from './SubOperationDialog';
import OperationDialog from './OperationDialog';

import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import {fetchOperations} from '../redux/actions/operationAction'
import {FileDownloadOutlined } from '@mui/icons-material';
import useAxiosPrivate from '../hooks/useAxiosPrivate';


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'set' }, backgroundColor: '#fffff' }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.operation_code}
        </TableCell>
        <TableCell align="right">{row.day_number}</TableCell>
        <TableCell align="right">{row.StartDate}</TableCell>
        <TableCell align="right">{row.Plan_HRS}</TableCell>
        <TableCell align="right">{row.Plan_HRS}</TableCell>
        <TableCell align="right">{row.description}</TableCell>
        <TableCell align="right"><SubOperationDialog data={{id:row.id,op_code:row.operation_code}}></SubOperationDialog></TableCell>
      </TableRow>
      <TableRow >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ p: 2, border: '1px dashed grey', width: '100%', backgroundColor: '#f8f8f8' }}>
              {/* <Typography variant="h6" gutterBottom component="div" >
                Sub Operation
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead sx={{ backgroundColor: '#4caf50' }}>
                  <TableRow>
                    <TableCell sx={{ color: 'white', fontWeight: 'large' }}>StartTime</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'large' }} align="right">EndTime</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'large' }} align="right">DiffHours</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'large' }} align="right">Category</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'large' }} align="right">Type</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'large' }} align="right">SubOpCode</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'large' }} align="right">Description</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'large' }} align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.subOpns ?
                    row.subOpns.map((subOpnRow) => (
                      <TableRow key={subOpnRow.StartTime} sx={{ backgroundColor: '#f3f3f3' }}>
                        <TableCell component="th" scope="row">
                          {subOpnRow.StartTime}
                        </TableCell>
                        <TableCell>{subOpnRow.EndTime}</TableCell>
                        <TableCell align="right">{subOpnRow.DiffHours}</TableCell>

                        <TableCell align="right">
                          {subOpnRow.Category}
                        </TableCell>
                        <TableCell align="right">
                          {subOpnRow.Type}
                        </TableCell>
                        <TableCell align="right">
                          {subOpnRow.SubOpCode}
                        </TableCell>
                        <TableCell align="right">
                          {subOpnRow.Description}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton>+</IconButton>
                        </TableCell>
                      </TableRow>
                    )) : ""}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };



export default function CollapsibleTable() {

 
  const dispatch = useDispatch()
  const axiosPrivate = useAxiosPrivate()
  const well = useSelector((state)=>state.operations.well)
  const rows = useSelector((state)=>state.operations.operations)
  
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/Well')
  }

  // Call fetchData on component mount
  React.useEffect(() => {
    
    dispatch(fetchOperations(well._id,axiosPrivate))
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Box sx={{ backgroundColor: '#fffff' }}>
        <OperationDialog well_number={well.well_number} id={well._id} ></OperationDialog>
        <Button startIcon={<LaunchIcon></LaunchIcon>} variant='contained' size='small' onClick={handleClick} sx={{margin:'4px'}}>Well</Button>
        <Button startIcon={<FileDownloadOutlined></FileDownloadOutlined>} variant='contained' size='small' sx={{margin:'4px'}}>Export</Button>
      </Box>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow sx={{
            p: 2, borderRadius: '6px', width: '100%', backgroundColor: '#20547b',
          }}>
            <TableCell />
            <TableCell sx={{ color: 'white', fontWeight: 'large', width:'20%' }}>Operation Code</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'large', width:'15%' }} align="right">Day Number</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'large', width:'15%' }} align="right">Date</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'large', width:'15%' }} align="right">Plan Hours</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'large', width:'15%' }} align="right">Actual Hours</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'large', width:'15%' }} align="right">Description</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'large', width:'15%' }} align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.operation_code} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
