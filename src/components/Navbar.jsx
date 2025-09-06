import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Slide,
  alpha,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'rgba(18, 18, 30, 0.95)'  // Very dark blue in dark mode
    : 'rgba(49, 53, 82, 0.95)', // Dark indigo in light mode
  boxShadow: 'none',
  backdropFilter: 'blur(10px)',
  borderBottom: theme.palette.mode === 'dark'
    ? `1px solid ${alpha('#2a2a40', 0.3)}`
    : `1px solid ${alpha('#3a3a5a', 0.3)}`,
  transition: 'all 0.3s ease',
}));

const NavButton = styled(Button)(({ theme, isactive }) => ({
  color: 'white',
  fontWeight: 500,
  margin: theme.spacing(0, 1),
  padding: theme.spacing(1, 2),
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  ...(isactive === 'true' && {
    background: alpha(theme.palette.secondary.main, 0.2),
  }),
  '&:hover': {
    background: alpha(theme.palette.secondary.main, 0.3),
  },
}));

const Navbar = ({ darkMode, setDarkMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Chat', path: '/chat' },
  ];

  return (
    <Slide direction="down" in={true} timeout={800}>
      <StyledAppBar position="sticky">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SmartToyIcon sx={{ mr: 1, color: 'white' }} />
            <Typography variant="h6" component="div" sx={{ 
              fontWeight: 700,
              color: 'white',
            }}>
              YouTube GPT
            </Typography>

            {!isMobile && (
              <Box sx={{ display: 'flex', ml: 4 }}>
                {menuItems.map((item) => (
                  <NavButton
                    key={item.text}
                    component={Link}
                    to={item.path}
                    isactive={(location.pathname === item.path).toString()}
                  >
                    {item.text}
                  </NavButton>
                ))}
              </Box>
            )}
          </Box>

          <Box display="flex" alignItems="center">
            <Box display="flex" alignItems="center" sx={{ mr: 2, color: 'white' }}>
              {darkMode ? '🌙' : '☀️'}
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                color="default"
                sx={{
                  '& .MuiSwitch-track': {
                    backgroundColor: alpha('#fff', 0.3),
                  },
                }}
              />
            </Box>
            
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon sx={{ color: 'white' }} />
              </IconButton>
            )}
          </Box>
        </Toolbar>

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            '& .MuiDrawer-paper': {
              background: alpha(theme.palette.primary.dark, 0.95),
              backdropFilter: 'blur(10px)',
              color: 'white',
              width: 250,
            },
          }}
        >
          <Box
            sx={{ p: 2 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <SmartToyIcon sx={{ mr: 1, color: 'white' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
                YouTube GPT
              </Typography>
            </Box>
            
            <List>
              {menuItems.map((item) => (
                <ListItem 
                  button 
                  key={item.text} 
                  component={Link} 
                  to={item.path}
                  selected={location.pathname === item.path}
                  sx={{
                    borderRadius: '8px',
                    mb: 1,
                    color: 'white',
                    '&.Mui-selected': {
                      background: alpha(theme.palette.secondary.main, 0.2),
                    },
                    '&:hover': {
                      background: alpha(theme.palette.secondary.main, 0.1),
                    },
                  }}
                >
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </StyledAppBar>
    </Slide>
  );
};

export default Navbar;