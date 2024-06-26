import * as React from 'react';
import PropTypes from 'prop-types';
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
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LaunchIcon from '@mui/icons-material/Launch';
import SubOperationDialog from './SubOperationDialog';
import OperationDialog from './OperationDialog';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const base_url = "http://localhost:4000/api/v1"


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'set' }, backgroundColor: '#dcdcdd' }}>
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
        <TableCell align="right"><SubOperationDialog id={row.id}></SubOperationDialog></TableCell>
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
                      <TableRow key={subOpnRow.StartTime} sx={{ backgroundColor: '#cfd7dd' }}>
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



export default function CollapsibleTable(props) {

  const [rows, setRows] = React.useState([]);
  const [well, setWell] = React.useState(props);


  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/Well')
  }

  // Call fetchData on component mount
  React.useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/operation${well._id ? '/' + well._id : ''}`, {
        headers: {
          'authorization': localStorage.getItem('token'),
        }
      });
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <TableContainer component={Paper}>
      <Box sx={{ backgroundColor: '#cfd7e3' }}>
        <OperationDialog well_number={well.well_number} id={well._id} ></OperationDialog>
        <Button startIcon={<LaunchIcon></LaunchIcon>} variant='outlined' onClick={handleClick}>Well</Button>
      </Box>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow sx={{
            p: 2, borderRadius: '6px', width: '100%', backgroundColor: '#20547b',
          }}>
            <TableCell />
            <TableCell sx={{ color: 'white', fontWeight: 'large' }}>Operation Code</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'large' }} align="right">Day Number</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'large' }} align="right">Date</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'large' }} align="right">Plan Hours</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'large' }} align="right">Actual Hours</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'large' }} align="right">Description</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'large' }} align="right">Action</TableCell>
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
