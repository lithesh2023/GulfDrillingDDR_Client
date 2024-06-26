import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './components/listitems';

import Well from './components/Well';
import Operation from './components/Operation'

import Login from './components/Login';
import Registration from './components/Registration';
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import UserAvatar from './components/UserAvatar';
import Employees from './components/Employees'
import UserProfile from './components/UserProfile';
import CrewList from './components/CrewList';
import POBList from './components/POBList';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Lithesh Pulikkool
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function App() {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({})

  const toggleDrawer = () => {
    setOpen(!open);
  };
  function getUser(data) {
    setUser(data);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
              backgroundColor: '#19445b'
            }}
          >
            {localStorage.getItem('token') && <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>}
            <Avatar alt="Gulf Drilling DDR" src="/rig_icon.png" sx={{ width: 56, height: 56, borderRadius: 2, marginRight: 4 }} />
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Gulf Drilling DDR
            </Typography>
            {localStorage.getItem('token') && <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>}

            {localStorage.getItem('token') && <UserAvatar user={user}></UserAvatar>}
          </Toolbar>
        </AppBar>
        {localStorage.getItem('token') && <Drawer variant="permanent" open={open} >


          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>}
        <Box
          alignItems='center'
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          {/* <Login onData={getUser}/> */}
          <Container sx={{ mt: 4, mb: 4 }} >
            {/* <Grid container spacing={3}> */}
              {/* <Grid item > */}
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Routes>
                    <Route path="/" >
                      {/* <Route index element={<Login />} /> */}

                      <Route path="Login" element={<Login onData={getUser} />} />
                      <Route path="Register" element={<Registration />} />
                      <Route path="/" element={<PrivateRoute />}>
                        <Route path="Dashboard" element={<Dashboard user={user}/>} />
                        <Route path="Well" element={<Well user={user}/>} />
                        <Route path="Operation/:id" element={<Operation />} />
                        <Route path="Employees" element={<POBList></POBList>} />
                        <Route path="Profile" element={<UserProfile user={user}></UserProfile>} />
                      </Route>

                    </Route>
                  </Routes>

                </Paper>
              {/* </Grid> */}

            {/* </Grid>
            <Copyright sx={{ pt: 4 }} /> */}

          </Container>
        </Box>
      </Box>

    </ThemeProvider>
  );
}