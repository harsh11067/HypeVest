import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  LinearProgress,
  Alert,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  AttachMoney as AttachMoneyIcon,
  YouTube as YouTubeIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../Context/AuthContext';
import CreateBondModal from '../Bonds/CreateBondModal';

interface CreatorStats {
  totalRevenue: number;
  totalBondsSold: number;
  activeBonds: number;
  monthlyRevenue: number;
  revenueGrowth: number;
}

interface BondTranche {
  id: string;
  totalSupply: number;
  minted: number;
  revenueShare: number;
  maturityDate: string;
  currentPrice: number;
  totalCollected: number;
  status: 'active' | 'completed' | 'pending';
}

const CreatorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<CreatorStats>({
    totalRevenue: 0,
    totalBondsSold: 0,
    activeBonds: 0,
    monthlyRevenue: 0,
    revenueGrowth: 0,
  });
  const [bonds, setBonds] = useState<BondTranche[]>([]);
  const [loading, setLoading] = useState(true);
  const [createBondOpen, setCreateBondOpen] = useState(false);

  useEffect(() => {
    if (user?.type === 'creator') {
      fetchCreatorData();
    }
  }, [user]);

  const fetchCreatorData = async () => {
    try {
      setLoading(true);
      
      // Fetch analytics from relayer
      if (user?.walletAddress) {
        const analyticsResponse = await fetch(`http://localhost:3001/analytics/${user.walletAddress}`);
        if (analyticsResponse.ok) {
          const analytics = await analyticsResponse.json();
          
          // Calculate estimated revenue based on subscriber count
          const estimatedMonthlyRevenue = Math.floor(analytics.subscriberCount * 0.01); // $0.01 per subscriber
          
          setStats({
            totalRevenue: estimatedMonthlyRevenue * 12,
            totalBondsSold: 0, // Will be fetched from blockchain
            activeBonds: 0,
            monthlyRevenue: estimatedMonthlyRevenue,
            revenueGrowth: 15.5, // Mock growth
          });
        }
      }
      
      // Mock bond data - in real app, fetch from blockchain
      setBonds([
        {
          id: '1',
          totalSupply: 10000,
          minted: 7500,
          revenueShare: 5,
          maturityDate: '2024-12-31',
          currentPrice: 12.50,
          totalCollected: 93750,
          status: 'active',
        },
        {
          id: '2',
          totalSupply: 5000,
          minted: 3200,
          revenueShare: 8,
          maturityDate: '2024-11-15',
          currentPrice: 15.20,
          totalCollected: 48640,
          status: 'active',
        },
      ]);
      
    } catch (error) {
      console.error('Error fetching creator data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBond = (bondData: any) => {
    // In real app, this would call the Linera contract
    console.log('Creating bond:', bondData);
    
    // Add new bond to the list immediately
    const newBond: BondTranche = {
      id: (bonds.length + 1).toString(),
      totalSupply: bondData.totalSupply,
      minted: 0,
      revenueShare: bondData.revenueShare,
      maturityDate: bondData.maturityDate,
      currentPrice: bondData.initialPrice,
      totalCollected: 0,
      status: 'active',
    };
    
    setBonds([...bonds, newBond]);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      activeBonds: prev.activeBonds + 1,
    }));
    
    setCreateBondOpen(false);
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ mt: 8, p: 3 }}>
        <Typography variant="h4" sx={{ color: 'white', textAlign: 'center' }}>
          Loading your dashboard...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 8, p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: 'white', mb: 1, fontWeight: 700 }}>
          Welcome back, {user?.name}!
        </Typography>
        <Typography variant="body1" sx={{ color: '#A0AEC0', mb: 3 }}>
          Manage your creator bonds and track your performance
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateBondOpen(true)}
          sx={{
            backgroundColor: '#1B73E8',
            '&:hover': { backgroundColor: '#1557B0' },
          }}
        >
          Create New Bond
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card
              sx={{
                background: 'linear-gradient(135deg, #1B73E815 0%, #4285F405 100%)',
                border: '1px solid #1B73E830',
                borderRadius: '12px',
              }}
            >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    backgroundColor: '#1B73E820',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#1B73E8',
                    mr: 2,
                  }}
                >
                  <AttachMoneyIcon />
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                    ${stats.totalRevenue.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                    Total Revenue
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card
              sx={{
                background: 'linear-gradient(135deg, #00C85115 0%, #4CAF5005 100%)',
                border: '1px solid #00C85130',
                borderRadius: '12px',
              }}
            >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    backgroundColor: '#00C85120',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00C851',
                    mr: 2,
                  }}
                >
                  <PeopleIcon />
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                    {stats.totalBondsSold.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                    Bonds Sold
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card
              sx={{
                background: 'linear-gradient(135deg, #FFB80015 0%, #FF980005 100%)',
                border: '1px solid #FFB80030',
                borderRadius: '12px',
              }}
            >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    backgroundColor: '#FFB80020',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFB800',
                    mr: 2,
                  }}
                >
                  <YouTubeIcon />
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                    {user?.analytics?.subscriberCount?.toLocaleString() || '0'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                    Subscribers
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card
              sx={{
                background: 'linear-gradient(135deg, #FF3D7115 0%, #E91E6305 100%)',
                border: '1px solid #FF3D7130',
                borderRadius: '12px',
              }}
            >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    backgroundColor: '#FF3D7120',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FF3D71',
                    mr: 2,
                  }}
                >
                  <TrendingUpIcon />
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                    +{stats.revenueGrowth}%
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                    Growth Rate
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* YouTube Analytics */}
      {user?.analytics && (
        <Card
          sx={{
            background: 'linear-gradient(135deg, #1B73E815 0%, #4285F405 100%)',
            border: '1px solid #1B73E830',
            borderRadius: '12px',
            mb: 4,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 600 }}>
              YouTube Analytics
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: '#1B73E8', fontWeight: 700 }}>
                    {user.analytics.subscriberCount.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                    Subscribers
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: '#00C851', fontWeight: 700 }}>
                    {user.analytics.viewCount.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                    Total Views
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: '#FFB800', fontWeight: 700 }}>
                    {user.analytics.videoCount.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                    Videos
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Active Bonds */}
      <Card
        sx={{
          background: 'linear-gradient(135deg, #00C85115 0%, #4CAF5005 100%)',
          border: '1px solid #00C85130',
          borderRadius: '12px',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 600 }}>
            Your Active Bonds
          </Typography>
          
          {bonds.length === 0 ? (
            <Alert severity="info" sx={{ backgroundColor: '#1B73E820', color: '#1B73E8' }}>
              No bonds created yet. Create your first bond to start earning!
            </Alert>
          ) : (
            <Grid container spacing={3}>
              {bonds.map((bond, index) => (
                <Grid item xs={12} md={6} key={bond.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <Card
                    sx={{
                      backgroundColor: '#0B1426',
                      border: '1px solid #2D3748',
                      borderRadius: '8px',
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ color: 'white' }}>
                          Bond #{bond.id}
                        </Typography>
                        <Chip
                          label={bond.status}
                          size="small"
                          sx={{
                            backgroundColor: bond.status === 'active' ? '#00C85120' : '#FFB80020',
                            color: bond.status === 'active' ? '#00C851' : '#FFB800',
                            border: `1px solid ${bond.status === 'active' ? '#00C851' : '#FFB800'}30`,
                          }}
                        />
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                            Revenue Share
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                            {bond.revenueShare}%
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                            Total Collected
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                            ${bond.totalCollected.toLocaleString()}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                            Progress
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                            {Math.round((bond.minted / bond.totalSupply) * 100)}%
                          </Typography>
                        </Box>
                        
                        <LinearProgress
                          variant="determinate"
                          value={(bond.minted / bond.totalSupply) * 100}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: '#2D3748',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#00C851',
                              borderRadius: 4,
                            },
                          }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* Create Bond Modal */}
      <CreateBondModal
        open={createBondOpen}
        onClose={() => setCreateBondOpen(false)}
        onCreateBond={handleCreateBond}
      />
    </Container>
  );
};

export default CreatorDashboard;

