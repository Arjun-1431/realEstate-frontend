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
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Sidebar from './sidebar';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../Urls';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Powered By '}
      <Link color="inherit" href="" target="_blank">
        www.ArjunSingh.com
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

const defaultTheme = createTheme();

export default function CreateUser() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setContect] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Name validation
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(name)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Name',
        text: 'Please enter a valid name with only alphabetic characters and spaces.',
      });
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
      });
      return;
    }

    // Contact number validation
    const contactPattern = /^\d{10}$/;
    if (!contactPattern.test(mobile)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Contact Number',
        text: 'Please enter a valid 10-digit contact number.',
      });
      return;
    }

    // Check all fields
    if (!name || !password || !email || !mobile || !role) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'All fields are required!',
      });
      return;
    }

    try {
      await axios.post(`${baseUrl}/register`, { name, email, password, mobile, role });
      Swal.fire({
        title: 'Success!',
        text: 'Register successful',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Register failed',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      console.error('Error registering user:', error);
    }
  };

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" style={{ background: '#383B2A' }} open={open}>
          <Toolbar
            sx={{
              pr: '24px', 
            }}
          >
            <IconButton
              edge="start"
              color="primary"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon style={{ color: 'white' }} />
            </IconButton>
            <a href='/admindashboard'>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Admin Dashboard (Real-Estate)
              </Typography>
            </a>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
            style={{ background: '#383B2A' }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <Sidebar />
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          style={{ background: '#C0C999' }}
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    height: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  style={{ background: '#E3EBC0' }}
                >
                  <div style={{ background: '#191D0B' }} className="lg:m-10">
                    <form className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-10" onSubmit={handleSubmit}>
                      <h1 className="mb-6 text-xl font-semibold lg:text-2xl">Create a User</h1>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div>
                          <label> Full Name </label>
                          <input type="text" placeholder="Your Name" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" onChange={(e) => setName(e.target.value)} required />
                        </div>
                      </div>
                      <div>
                        <label> Email Address </label>
                        <input type="email" placeholder="Info@gmail.com" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" onChange={(e) => setEmail(e.target.value)} required />
                      </div>
                      <div>
                        <label> Password </label>
                        <input type="password" placeholder="******" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" onChange={(e) => setPassword(e.target.value)} required />
                      </div>
                      <div className="grid gap-3 lg:grid-cols-2">
                        
                        <div>
                          <label> Role </label>
                          <select className="w-full h-12 mt-2 rounded-md bg-gray-100 px-3" onChange={(e) => setRole(e.target.value)} required>
                            <option value="">Select Role</option>
                            <option value="user">User</option>
                          </select>
                        </div>

                        <div>
                          <label> Phone: <span className="text-sm text-gray-400">(optional)</span> </label>
                          <input type="text" placeholder="54354450543" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" onChange={(e) => setContect(e.target.value)} required/>
                        </div>
                      </div>
                      <div className="checkbox">
                        <input type="checkbox" id="checkbox1" required />
                        <label htmlFor="checkbox1">I agree to the <a href="#" target="_blank" className="text-blue-600">Terms and Conditions</a></label>
                      </div>
                      <div>
                        <button type="submit" className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white">Get Started</button>
                      </div>
                    </form>
                  </div>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
