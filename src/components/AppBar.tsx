import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, ButtonProps, Menu, MenuItem, Popover } from '@mui/material';
import { purple } from '@mui/material/colors';
import { useLocation } from 'react-router-dom';
import { MouseEvent, useCallback, useMemo, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth: number = 240;

type DashboardAppBarProps = {
  open: boolean;
  toggleDrawer: () => void;
  handleLogout: () => void;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
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

export const DashboardAppBar = ({ open, toggleDrawer, handleLogout }: DashboardAppBarProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, [setAnchorEl]);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const openPopup = useMemo(() => Boolean(anchorEl), [anchorEl]);
  const id = open ? 'simple-popover' : undefined;

  const location = useLocation();

  const routeName = useMemo(() => location.pathname.replace('/', '').toUpperCase(), [location])
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
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
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {routeName}
        </Typography>
        <div>
          <IconButton
            aria-describedby={id}
            onClick={handleClick}
            edge="start"
            color="inherit"
            aria-label="open drawer">
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={openPopup}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{ mt: 4 }}
          >
            <MenuItem onClick={handleClose} sx={{ minWidth: 150 }}>Profile</MenuItem>
            <MenuItem onClick={handleLogout} sx={{ minWidth: 150 }}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}