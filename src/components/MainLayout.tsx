import { useState, ReactNode, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUserId } from 'src/app/slices/auth';
import { DashboardAppBar } from './AppBar';
import { DashboardDrawer } from './DashboardDrawer';
import { user as getUser } from 'src/app/thunk/user';
import { RootState } from 'src/app/store';
import { setUserInfo } from 'src/app/slices/user';
import { CircularProgress } from '@mui/material';

const mdTheme = createTheme();

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();
  const { user_id } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user_id) {
      dispatch(getUser({ user_id }));
    }
  }, [user_id]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    dispatch(setToken({ token: null }));
    dispatch(setUserId({ user_id: null }));
    dispatch(setUserInfo(null));
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
  };

  if (!user) {
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '80vh' }}
    >
      <CircularProgress disableShrink />
    </Grid>
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <DashboardAppBar open={open} toggleDrawer={toggleDrawer} handleLogout={handleLogout} />
        <DashboardDrawer open={open} toggleDrawer={toggleDrawer} user={user} />
        <Box
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
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2}>
              {children}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}