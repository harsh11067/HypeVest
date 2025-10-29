import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { useRouter } from 'next/router';
import {
  Dashboard as DashboardIcon,
  TableChart as TableChartIcon,
  Receipt as ReceiptIcon,
  Build as BuildIcon,
  Person as PersonIcon,
  Lock as LockIcon,
  Rocket as RocketIcon,
  CreditCard as BillingIcon,
} from '@mui/icons-material';

const drawerWidth = 280;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const router = useRouter();
  
  const mainNavItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/', active: router.pathname === '/' },
    { text: 'Trading', icon: <TableChartIcon />, path: '/trading', active: router.pathname === '/trading' },
    { text: 'Billing', icon: <BillingIcon />, path: '/billing', active: router.pathname === '/billing' },
    { text: 'Settings', icon: <BuildIcon />, path: '/settings', active: router.pathname === '/settings' },
  ];

  const accountNavItems = [
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
    { text: 'Sign In', icon: <LockIcon />, path: '/signin' },
    { text: 'Sign Up', icon: <RocketIcon />, path: '/signup' },
  ];

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#0B1426',
          borderRight: '1px solid #2D3748',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #1B73E8 0%, #4285F4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
            }}
          >
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
              H
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
            HypeVest
          </Typography>
        </Box>

        {/* Main Navigation */}
        <List>
          {mainNavItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => router.push(item.path)}
                sx={{
                  borderRadius: '8px',
                  backgroundColor: item.active ? '#1B73E8' : 'transparent',
                  '&:hover': {
                    backgroundColor: item.active ? '#1557B0' : '#2D3748',
                  },
                }}
              >
                <ListItemIcon sx={{ color: item.active ? 'white' : '#A0AEC0' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    '& .MuiListItemText-primary': {
                      color: item.active ? 'white' : '#A0AEC0',
                      fontWeight: item.active ? 600 : 400,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 3, borderColor: '#2D3748' }} />

        {/* Account Pages */}
        <Typography
          variant="caption"
          sx={{ color: '#A0AEC0', px: 2, mb: 2, display: 'block' }}
        >
          ACCOUNT PAGES
        </Typography>
        <List>
          {accountNavItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => router.push(item.path)}
                sx={{
                  borderRadius: '8px',
                  backgroundColor: item.path === router.pathname ? '#1B73E8' : 'transparent',
                  '&:hover': {
                    backgroundColor: item.path === router.pathname ? '#1557B0' : '#2D3748',
                  },
                }}
              >
                <ListItemIcon sx={{ color: item.path === router.pathname ? 'white' : '#A0AEC0' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    '& .MuiListItemText-primary': {
                      color: item.path === router.pathname ? 'white' : '#A0AEC0',
                      fontWeight: item.path === router.pathname ? 600 : 400,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Help Card */}
        <Card sx={{ mt: 4, backgroundColor: '#1A202C', border: '1px solid #2D3748' }}>
          <CardContent sx={{ p: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'white', mb: 1 }}>
              Need help?
            </Typography>
            <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 2 }}>
              Please check our docs
            </Typography>
            <Button
              variant="contained"
              size="small"
              href="https://linera.dev/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                backgroundColor: '#1B73E8',
                '&:hover': { backgroundColor: '#1557B0' },
                textDecoration: 'none',
              }}
            >
              DOCUMENTATION
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
