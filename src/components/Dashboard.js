import * as React from 'react';
import { styled, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SmallBoxWidget from './SmallBoxWidget';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import Deposits from './Deposits';


import InfoIcon from '@mui/icons-material/Info';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonIcon from '@mui/icons-material/Person';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {


  return (


    <Box>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <Chart />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <Deposits />
            </Paper>
          </Grid>

        </Grid>
      </Container>
      
      <Container>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <SmallBoxWidget
              title="New Users"
              value="1,234"
              icon={<PersonIcon />}
              color="primary"
              link="/Employees"
              footerText="View Details"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SmallBoxWidget
              title="Sales"
              value="$12,345"
              icon={<TrendingUpIcon />}
              color="secondary"
              link="/sales"
              footerText="See More"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SmallBoxWidget
              title="Active wells"
              value="12"
              icon={<InfoIcon />}
              color="success"
              link="/Well"
              footerText="Current well details"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>



  );
}