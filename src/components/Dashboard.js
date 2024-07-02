import * as React from 'react';
import { styled, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SmallBoxWidget from './SmallBoxWidget';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import Deposits from './Deposits';
import Title from './Title';

import InfoIcon from '@mui/icons-material/Info';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import { Divider, Slide, Typography } from '@mui/material';
import WellHoursChart from './WellHoursChart';
import { LocalGasStation, OilBarrel } from '@mui/icons-material';
import Slideshow from './Slideshow';
import{useSelector} from 'react-redux'

const defaultTheme = createTheme();
const base_url = process.env.REACT_APP_API_URL
export default function Dashboard(props) {
  const [userCount, setUserCount] = React.useState([]);
  const [wellCount, setWellCount] = React.useState([]);
  const [pobCount,setPObCount] = React.useState([]);
  const user = useSelector((state) => state.user.user)
  React.useEffect(() => {
    try {

      axios.get(`${base_url}/dashboard`, {
        headers: {
          'authorization': localStorage.getItem('token'),
        }
      }).then((results) => {
        setUserCount(results.data.userCount)
        setWellCount(results.data.wellCount)
        setPObCount(results.data.POB)
      }).catch((err) => {
        console.log('Error: ' + err)
      })


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);
  return (


    <Box>
      <Typography component="h4" variant="h4" color="primary" gutterBottom>
        Welcome {user.name} to the unit - {user.unit}
      </Typography>
      <Divider></Divider>

      <Container>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <SmallBoxWidget
              title="New Users"
              value={userCount}
              icon={<PersonIcon sx={{ fontSize: 60 }} />}
              color="primary"
              link="/Employees"
              footerText="View Details"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SmallBoxWidget
              title="POB"
              value={pobCount}
              icon={<PersonIcon sx={{ fontSize: 60 }} />}
              color="ff9a32"
              link="/Employees"
              footerText="View Details"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SmallBoxWidget
              title="Fuel"
              value="$12,345"
              icon={<TrendingUpIcon sx={{ fontSize: 60 }} />}
              color="secondary"
              link="/report"
              footerText="See More"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SmallBoxWidget
              title="Active wells"
              value={wellCount}
              icon={<InfoIcon sx={{ fontSize: 60 }} />}
              color="success"
              link="/Well"
              footerText="Current well details"
            />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} md={12} lg={12} sx={{ p: 2, }}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                backgroundColor: '#eeeeee'
              }}
            >
              <Slideshow />
            </Paper>
          </Grid>
        </Grid>

      </Container>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Bar Chart */}
          <Grid item xs={12} md={4} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',

                backgroundColor: '#eeeeee'
              }}
            ><Title><OilBarrel></OilBarrel>Actual vs Planned Hours</Title>
              <Divider></Divider>
              <WellHoursChart></WellHoursChart>
            </Paper>
          </Grid>
          {/*Line Chart */}
          <Grid item xs={12} md={4} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 'auto',
                backgroundColor: '#eeeeee'
              }}
            >
              <Title><LocalGasStation></LocalGasStation>Fuel Consumption</Title>
              <Divider></Divider>
              <Chart />
            </Paper>
          </Grid>


          <Grid item xs={12} md={4} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                backgroundColor: '#eeeeee'
              }}
            >
              <Deposits />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={6} sx={{ p: 2, }}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                backgroundColor: '#eeeeee'

              }}
            >

            </Paper>
          </Grid>
        </Grid>

      </Container>


    </Box>



  );
}