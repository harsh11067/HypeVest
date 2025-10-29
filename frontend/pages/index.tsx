import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
} from '@mui/material';
import {
  YouTube as YouTubeIcon,
  AccountBalance as AccountBalanceIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';

// Components
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';
import LoginModal from '../components/Auth/LoginModal';
import CreatorDashboard from '../components/Dashboard/CreatorDashboard';
import BuyerDashboard from '../components/Dashboard/BuyerDashboard';
import { useAuth } from '../components/Context/AuthContext';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin');
      return;
    }
  }, [isAuthenticated, router]);

  // Show loading while redirecting
  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0B1426 0%, #1A202C 50%, #2D3748 100%)',
        }}
      >
        <Typography variant="h6" sx={{ color: 'white' }}>
          Redirecting to sign in...
        </Typography>
      </Box>
    );
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogin = (userType: 'creator' | 'buyer', data: any) => {
    login(userType, data);
    setLoginModalOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0B1426' }}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ml: sidebarOpen ? '280px' : 0,
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Header sidebarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />
          
          <Container maxWidth="xl" sx={{ mt: 8, p: 3 }}>
            {/* Landing Page */}
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h2" sx={{ color: 'white', mb: 3, fontWeight: 700 }}>
                HypeVest CreatorBank
              </Typography>
              <Typography variant="h5" sx={{ color: '#A0AEC0', mb: 4 }}>
                Invest, trade, stake and sponsor creators in real-time
              </Typography>
              <Typography variant="body1" sx={{ color: '#A0AEC0', mb: 6, maxWidth: 600, mx: 'auto' }}>
                A decentralized creator finance platform where fans buy Creator Bonds, 
                trade them in an open market, and earn from creator revenue streams.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<YouTubeIcon />}
                  onClick={() => setLoginModalOpen(true)}
                  sx={{
                    backgroundColor: '#1B73E8',
                    '&:hover': { backgroundColor: '#1557B0' },
                    px: 4,
                    py: 2,
                  }}
                >
                  Sign In as Creator
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<AccountBalanceIcon />}
                  onClick={() => setLoginModalOpen(true)}
                  sx={{
                    backgroundColor: '#00C851',
                    '&:hover': { backgroundColor: '#2E7D32' },
                    px: 4,
                    py: 2,
                  }}
                >
                  Sign In as Investor
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>

        <LoginModal
          open={loginModalOpen}
          onClose={() => setLoginModalOpen(false)}
          onLogin={handleLogin}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0B1426' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: sidebarOpen ? '280px' : 0,
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '100%',
          overflow: 'hidden',
        }}
      >
        <Header sidebarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
          {user?.type === 'creator' ? (
            <CreatorDashboard />
          ) : (
            <BuyerDashboard />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
