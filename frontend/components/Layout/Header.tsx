import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  TextField,
  InputAdornment,
  Avatar,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Search as SearchIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../Context/AuthContext';

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, onToggleSidebar }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [bellRinging, setBellRinging] = useState(false);
  const [bellColor, setBellColor] = useState('#A0AEC0');
  const [bellToggled, setBellToggled] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const handleBellClick = () => {
    setBellRinging(true);
    
    if (!bellToggled) {
      // First tap - turn blue and stay blue
      setBellColor('#1B73E8');
      setBellToggled(true);
    } else {
      // Second tap - turn back to gray
      setBellColor('#A0AEC0');
      setBellToggled(false);
    }
    
    setTimeout(() => {
      setBellRinging(false);
    }, 1000);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${sidebarOpen ? 280 : 0}px)` },
        ml: { sm: sidebarOpen ? '280px' : 0 },
        backgroundColor: '#0B1426',
        borderBottom: '1px solid #2D3748',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        {/* Breadcrumb */}
        <Typography variant="body2" sx={{ color: '#A0AEC0', mr: 2 }}>
          Pages / Dashboard / {user?.type === 'creator' ? 'Creator Dashboard' : 'Investor Dashboard'}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* Search Bar */}
        <TextField
          placeholder="Search creators or bonds..."
          size="small"
          sx={{
            mr: 2,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#1A202C',
              borderRadius: '8px',
              '& fieldset': {
                borderColor: '#2D3748',
              },
              '&:hover fieldset': {
                borderColor: '#1B73E8',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1B73E8',
              },
            },
            '& .MuiInputBase-input': {
              color: 'white',
              '&::placeholder': {
                color: '#A0AEC0',
                opacity: 1,
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#A0AEC0' }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Notifications */}
        <motion.div
          animate={bellRinging ? {
            rotate: [0, -10, 10, -10, 10, 0],
            scale: [1, 1.1, 1],
          } : {}}
          transition={{ duration: 0.5 }}
        >
          <IconButton 
            onClick={handleBellClick}
            sx={{ 
              mr: 1, 
              color: bellColor,
              transition: 'color 0.3s ease',
              '&:hover': {
                color: '#1B73E8',
                transform: 'scale(1.1)',
              },
            }}
          >
            <NotificationsIcon />
          </IconButton>
        </motion.div>

        {/* Settings */}
        <IconButton sx={{ mr: 2, color: '#A0AEC0' }}>
          <SettingsIcon />
        </IconButton>

        {/* User Profile */}
        {isAuthenticated && user ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                mr: 1,
                backgroundColor: user.type === 'creator' ? '#1B73E8' : '#00C851',
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            <Button
              variant="text"
              onClick={handleMenuOpen}
              sx={{
                color: '#A0AEC0',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: 'white',
                },
              }}
            >
              {user.name} ({user.type === 'creator' ? 'Creator' : 'Investor'})
            </Button>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  backgroundColor: '#1A202C',
                  border: '1px solid #2D3748',
                },
              }}
            >
              <MenuItem onClick={handleLogout} sx={{ color: '#A0AEC0' }}>
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                mr: 1,
                backgroundColor: '#2D3748',
              }}
            >
              ?
            </Avatar>
            <Button
              variant="text"
              sx={{
                color: '#A0AEC0',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: 'white',
                },
              }}
            >
              Not Signed In
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
