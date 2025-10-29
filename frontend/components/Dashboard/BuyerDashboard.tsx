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
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Alert,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Search as SearchIcon,
  AttachMoney as AttachMoneyIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../Context/AuthContext';
import BondCard from '../BondCard';
import TradeWidget from '../TradeWidget';

interface BondTranche {
  id: string;
  creator: string;
  creatorName: string;
  totalSupply: number;
  minted: number;
  totalCollected: number;
  revenueShare: number;
  maturityDate: string;
  currentPrice: number;
  category: string;
  description: string;
  volume24h: number;
  change24h: number;
  creatorAvatar?: string;
}

interface PortfolioStats {
  totalInvested: number;
  totalValue: number;
  totalReturn: number;
  activeInvestments: number;
}

const BuyerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bonds, setBonds] = useState<BondTranche[]>([]);
  const [portfolio, setPortfolio] = useState<BondTranche[]>([]);
  const [selectedBond, setSelectedBond] = useState<BondTranche | null>(null);
  const [portfolioStats, setPortfolioStats] = useState<PortfolioStats>({
    totalInvested: 0,
    totalValue: 0,
    totalReturn: 0,
    activeInvestments: 0,
  });
  const [loading, setLoading] = useState(true);

  const categories = ['all', 'Tech Reviews', 'Gaming', 'Fitness', 'Lifestyle', 'Education'];

  useEffect(() => {
    fetchBonds();
    fetchPortfolio();
  }, []);

  const fetchBonds = async () => {
    try {
      setLoading(true);
      
      // Mock bond data - in real app, fetch from blockchain/relayer
      const mockBonds: BondTranche[] = [
        {
          id: '1',
          creator: '0x123...',
          creatorName: 'Mark Johnson',
          totalSupply: 10000,
          minted: 7500,
          totalCollected: 93750,
          revenueShare: 5,
          maturityDate: '2024-12-31',
          currentPrice: 12.50,
          category: 'Tech Reviews',
          description: 'Tech reviews and tutorials',
          volume24h: 125000,
          change24h: 2.5,
        },
        {
          id: '2',
          creator: '0x456...',
          creatorName: 'Sarah Chen',
          totalSupply: 5000,
          minted: 3200,
          totalCollected: 48640,
          revenueShare: 8,
          maturityDate: '2024-11-15',
          currentPrice: 15.20,
          category: 'Gaming',
          description: 'Gaming content and reviews',
          volume24h: 89000,
          change24h: -1.2,
        },
        {
          id: '3',
          creator: '0x789...',
          creatorName: 'Alex Rodriguez',
          totalSupply: 8000,
          minted: 1200,
          totalCollected: 18000,
          revenueShare: 3,
          maturityDate: '2025-03-20',
          currentPrice: 8.75,
          category: 'Fitness',
          description: 'Fitness and wellness content',
          volume24h: 45000,
          change24h: 5.8,
        },
        {
          id: '4',
          creator: '0xabc...',
          creatorName: 'Emma Wilson',
          totalSupply: 15000,
          minted: 9800,
          totalCollected: 147000,
          revenueShare: 4,
          maturityDate: '2024-10-30',
          currentPrice: 18.90,
          category: 'Lifestyle',
          description: 'Lifestyle and fashion content',
          volume24h: 210000,
          change24h: 3.2,
        },
      ];
      
      setBonds(mockBonds);
    } catch (error) {
      console.error('Error fetching bonds:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPortfolio = () => {
    // Mock portfolio data
    const mockPortfolio: BondTranche[] = [
      {
        id: '1',
        creator: '0x123...',
        creatorName: 'Mark Johnson',
        totalSupply: 10000,
        minted: 7500,
        totalCollected: 93750,
        revenueShare: 5,
        maturityDate: '2024-12-31',
        currentPrice: 12.50,
        category: 'Tech Reviews',
        description: 'Tech reviews and tutorials',
        volume24h: 125000,
        change24h: 2.5,
      },
    ];
    
    setPortfolio(mockPortfolio);
    
    // Calculate portfolio stats
    const totalInvested = mockPortfolio.reduce((sum, bond) => sum + (bond.currentPrice * 100), 0);
    const totalValue = mockPortfolio.reduce((sum, bond) => sum + (bond.currentPrice * 100 * 1.15), 0);
    
    setPortfolioStats({
      totalInvested,
      totalValue,
      totalReturn: ((totalValue - totalInvested) / totalInvested) * 100,
      activeInvestments: mockPortfolio.length,
    });
  };

  const filteredBonds = bonds.filter(bond => {
    const matchesSearch = bond.creatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bond.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || bond.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBuyBond = async (trancheId: string, amount: number) => {
    try {
      // In real app, this would call the Linera contract
      console.log('Buying bond:', trancheId, amount);
      
      // Simulate successful purchase
      const bond = bonds.find(b => b.id === trancheId);
      if (bond) {
        // Add to portfolio
        setPortfolio([...portfolio, bond]);
        
        // Update portfolio stats
        const newInvested = portfolioStats.totalInvested + (bond.currentPrice * amount);
        const newValue = portfolioStats.totalValue + (bond.currentPrice * amount * 1.15);
        
        setPortfolioStats({
          totalInvested: newInvested,
          totalValue: newValue,
          totalReturn: ((newValue - newInvested) / newInvested) * 100,
          activeInvestments: portfolio.length + 1,
        });
      }
    } catch (error) {
      console.error('Error buying bond:', error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
        mt: 8, 
        p: 3, 
        width: '100%',
        maxWidth: '100%',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: 'white', mb: 1, fontWeight: 700 }}>
          Welcome, {user?.name}!
        </Typography>
        <Typography variant="body1" sx={{ color: '#A0AEC0', mb: 3 }}>
          Discover and invest in your favorite creators
        </Typography>
      </Box>

      {/* Portfolio Stats */}
      {portfolio.length > 0 && (
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
                      ${portfolioStats.totalInvested.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                      Total Invested
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
                    <TrendingUpIcon />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                      ${portfolioStats.totalValue.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                      Portfolio Value
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
                  background: portfolioStats.totalReturn >= 0 
                    ? 'linear-gradient(135deg, #00C85115 0%, #4CAF5005 100%)'
                    : 'linear-gradient(135deg, #FF3D7115 0%, #E91E6305 100%)',
                  border: portfolioStats.totalReturn >= 0 
                    ? '1px solid #00C85130'
                    : '1px solid #FF3D7130',
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
                      backgroundColor: portfolioStats.totalReturn >= 0 ? '#00C85120' : '#FF3D7120',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: portfolioStats.totalReturn >= 0 ? '#00C851' : '#FF3D71',
                      mr: 2,
                    }}
                  >
                    {portfolioStats.totalReturn >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                      {portfolioStats.totalReturn >= 0 ? '+' : ''}{portfolioStats.totalReturn.toFixed(1)}%
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                      Total Return
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
                    <PeopleIcon />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                      {portfolioStats.activeInvestments}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                      Active Investments
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            </motion.div>
          </Grid>
        </Grid>
      )}

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: '#2D3748', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              color: '#A0AEC0',
              '&.Mui-selected': { color: '#1B73E8' },
            },
            '& .MuiTabs-indicator': { backgroundColor: '#1B73E8' },
          }}
        >
          <Tab label="Marketplace" />
          <Tab label="My Portfolio" />
          <Tab label="Prediction Markets" />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <Box>
          {/* Search and Filters */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search creators or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                minWidth: 300,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#1A202C',
                  borderRadius: '8px',
                  '& fieldset': { borderColor: '#2D3748' },
                  '&:hover fieldset': { borderColor: '#1B73E8' },
                  '&.Mui-focused fieldset': { borderColor: '#1B73E8' },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                  '&::placeholder': { color: '#A0AEC0', opacity: 1 },
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
            
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => setSelectedCategory(category)}
                  sx={{
                    backgroundColor: selectedCategory === category ? '#1B73E8' : '#2D3748',
                    color: selectedCategory === category ? 'white' : '#A0AEC0',
                    '&:hover': {
                      backgroundColor: selectedCategory === category ? '#1557B0' : '#3A4552',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
            {/* Bonds Grid - Centered and responsive */}
            <Box 
              sx={{ 
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                minWidth: 0, // Prevents flex item from overflowing
              }}
            >
              <Grid 
                container 
                spacing={{ xs: 2, sm: 3, md: 3 }}
                sx={{ 
                  maxWidth: '100%',
                  justifyContent: 'center',
                  '& .MuiGrid-item': {
                    display: 'flex',
                    justifyContent: 'center',
                  }
                }}
              >
                {filteredBonds.map((bond) => (
                  <Grid 
                    item 
                    xs={12} 
                    sm={6} 
                    md={4} 
                    lg={3} 
                    xl={2.4}
                    key={bond.id}
                    sx={{ 
                      display: 'flex',
                      justifyContent: 'center',
                      minWidth: { xs: '280px', sm: '300px', md: '320px' }
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => setSelectedBond(bond)}
                      style={{ 
                        cursor: 'pointer',
                        width: '100%',
                        maxWidth: '400px'
                      }}
                    >
                      <BondCard
                        tranche={bond}
                        onBuy={handleBuyBond}
                      />
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Trading Widget - Fixed width sidebar */}
            <Box 
              sx={{ 
                width: { xs: '100%', lg: '350px' },
                flexShrink: 0,
                position: { lg: 'sticky' },
                top: { lg: '100px' },
                height: { lg: 'fit-content' }
              }}
            >
              <TradeWidget selectedBond={selectedBond} />
            </Box>
          </Box>
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          {portfolio.length === 0 ? (
            <Alert severity="info" sx={{ backgroundColor: '#1B73E820', color: '#1B73E8' }}>
              No investments yet. Start by exploring the marketplace!
            </Alert>
          ) : (
            <Grid container spacing={3}>
              {portfolio.map((bond) => (
                <Grid item xs={12} sm={6} md={4} key={bond.id}>
                  <BondCard
                    tranche={bond}
                    onBuy={handleBuyBond}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      {activeTab === 2 && (
        <Box>
          <Typography variant="h5" sx={{ color: 'white', mb: 3 }}>
            Prediction Markets
          </Typography>
          <Typography sx={{ color: '#A0AEC0', mb: 4 }}>
            Place bets on creator milestones like subscriber goals, video views, and more.
          </Typography>
          
          {/* Mock prediction markets */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #1B73E815 0%, #4285F405 100%)',
                    border: '1px solid #1B73E830',
                    borderRadius: '12px',
                    p: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                    Mark Johnson reaches 1M subscribers
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 2 }}>
                    Will Mark Johnson reach 1 million subscribers by December 2024?
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#00C851' }}>
                        YES: 65%
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                        Pool: $12,500
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#FF3D71' }}>
                        NO: 35%
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                        Pool: $6,750
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: '#1B73E8',
                      '&:hover': { backgroundColor: '#1557B0' },
                    }}
                  >
                    Place Bet
                  </Button>
                </Card>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #00C85115 0%, #4CAF5005 100%)',
                    border: '1px solid #00C85130',
                    borderRadius: '12px',
                    p: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                    Sarah Chen's video hits 10M views
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 2 }}>
                    Will Sarah Chen's next video reach 10 million views within 30 days?
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#00C851' }}>
                        YES: 42%
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                        Pool: $8,200
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#FF3D71' }}>
                        NO: 58%
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                        Pool: $11,300
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: '#00C851',
                      '&:hover': { backgroundColor: '#2E7D32' },
                    }}
                  >
                    Place Bet
                  </Button>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default BuyerDashboard;

