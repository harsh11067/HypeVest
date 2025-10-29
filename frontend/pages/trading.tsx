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
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Search as SearchIcon,
  AttachMoney as AttachMoneyIcon,
  People as PeopleIcon,
  Timeline as TimelineIcon,
  EmojiEvents as EmojiEventsIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../components/Context/AuthContext';

interface PredictionMarket {
  id: string;
  creator: string;
  creatorName: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  endDate: string;
  yesPrice: number;
  noPrice: number;
  totalVolume: number;
  category: string;
  status: 'active' | 'resolved' | 'cancelled';
}

interface BondTranche {
  id: string;
  creator: string;
  creatorName: string;
  currentPrice: number;
  volume24h: number;
  change24h: number;
  totalSupply: number;
  minted: number;
  revenueShare: number;
  category: string;
}

const TradingPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [predictionMarkets, setPredictionMarkets] = useState<PredictionMarket[]>([]);
  const [bondTranches, setBondTranches] = useState<BondTranche[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<PredictionMarket | null>(null);
  const [betDialogOpen, setBetDialogOpen] = useState(false);
  const [betAmount, setBetAmount] = useState('');
  const [betSide, setBetSide] = useState<'yes' | 'no'>('yes');

  const categories = ['all', 'Subscribers', 'Views', 'Revenue', 'Viral', 'Collaboration'];

  useEffect(() => {
    fetchPredictionMarkets();
    fetchBondTranches();
  }, []);

  const fetchPredictionMarkets = () => {
    // Mock prediction market data
    const mockMarkets: PredictionMarket[] = [
      {
        id: '1',
        creator: '0x123...',
        creatorName: 'Mark Johnson',
        title: 'Reach 2M Subscribers',
        description: 'Will Mark Johnson reach 2 million subscribers by end of 2024?',
        target: 2000000,
        current: 1200000,
        unit: 'subscribers',
        endDate: '2024-12-31',
        yesPrice: 0.65,
        noPrice: 0.35,
        totalVolume: 125000,
        category: 'Subscribers',
        status: 'active',
      },
      {
        id: '2',
        creator: '0x456...',
        creatorName: 'Sarah Chen',
        title: 'Hit 100M Views',
        description: 'Will Sarah Chen reach 100 million total views by Q2 2024?',
        target: 100000000,
        current: 75000000,
        unit: 'views',
        endDate: '2024-06-30',
        yesPrice: 0.45,
        noPrice: 0.55,
        totalVolume: 89000,
        category: 'Views',
        status: 'active',
      },
      {
        id: '3',
        creator: '0x789...',
        creatorName: 'Alex Rodriguez',
        title: 'Monthly Revenue $50K',
        description: 'Will Alex achieve $50K monthly revenue by March 2024?',
        target: 50000,
        current: 32000,
        unit: 'USD',
        endDate: '2024-03-31',
        yesPrice: 0.72,
        noPrice: 0.28,
        totalVolume: 156000,
        category: 'Revenue',
        status: 'active',
      },
    ];
    
    setPredictionMarkets(mockMarkets);
  };

  const fetchBondTranches = () => {
    // Mock bond data
    const mockBonds: BondTranche[] = [
      {
        id: '1',
        creator: '0x123...',
        creatorName: 'Mark Johnson',
        currentPrice: 12.50,
        volume24h: 125000,
        change24h: 2.5,
        totalSupply: 10000,
        minted: 7500,
        revenueShare: 5,
        category: 'Tech Reviews',
      },
      {
        id: '2',
        creator: '0x456...',
        creatorName: 'Sarah Chen',
        currentPrice: 15.20,
        volume24h: 89000,
        change24h: -1.2,
        totalSupply: 5000,
        minted: 3200,
        revenueShare: 8,
        category: 'Gaming',
      },
    ];
    
    setBondTranches(mockBonds);
  };

  const filteredMarkets = predictionMarkets.filter(market => {
    const matchesSearch = market.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         market.creatorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || market.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBet = () => {
    if (!selectedMarket || !betAmount) return;
    
    const amount = parseFloat(betAmount);
    if (amount <= 0) return;
    
    // In real app, this would call the Linera contract
    console.log('Placing bet:', {
      marketId: selectedMarket.id,
      side: betSide,
      amount: amount,
    });
    
    setBetDialogOpen(false);
    setBetAmount('');
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
          Trading & Prediction Markets
        </Typography>
        <Typography variant="body1" sx={{ color: '#A0AEC0', mb: 3 }}>
          Trade creator bonds and bet on creator milestones
        </Typography>
      </Box>

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
          <Tab label="Prediction Markets" />
          <Tab label="Bond Trading" />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <Box>
          {/* Search and Filters */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search markets or creators..."
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

          {/* Prediction Markets Grid */}
          <Grid container spacing={3}>
            {filteredMarkets.map((market, index) => (
              <Grid item xs={12} md={6} lg={4} key={market.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card
                    sx={{
                      background: 'linear-gradient(135deg, #1B73E815 0%, #4285F405 100%)',
                      border: '1px solid #1B73E830',
                      borderRadius: '12px',
                      height: '100%',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setSelectedMarket(market);
                      setBetDialogOpen(true);
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      {/* Header */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            backgroundColor: '#1B73E8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                          }}
                        >
                          <EmojiEventsIcon sx={{ color: 'white', fontSize: 20 }} />
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                            {market.creatorName}
                          </Typography>
                          <Chip
                            label={market.category}
                            size="small"
                            sx={{
                              backgroundColor: '#1B73E820',
                              color: '#1B73E8',
                              border: '1px solid #1B73E830',
                            }}
                          />
                        </Box>
                      </Box>

                      {/* Market Info */}
                      <Typography variant="h6" sx={{ color: 'white', mb: 1, fontWeight: 600 }}>
                        {market.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 2 }}>
                        {market.description}
                      </Typography>

                      {/* Progress */}
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                            Progress
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                            {Math.round((market.current / market.target) * 100)}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(market.current / market.target) * 100}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: '#2D3748',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#1B73E8',
                              borderRadius: 4,
                            },
                          }}
                        />
                        <Typography variant="caption" sx={{ color: '#A0AEC0', mt: 1, display: 'block' }}>
                          {market.current.toLocaleString()} / {market.target.toLocaleString()} {market.unit}
                        </Typography>
                      </Box>

                      {/* Prices */}
                      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <Box sx={{ flex: 1, textAlign: 'center' }}>
                          <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                            YES
                          </Typography>
                          <Typography variant="h6" sx={{ color: '#00C851', fontWeight: 700 }}>
                            ${market.yesPrice.toFixed(2)}
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 1, textAlign: 'center' }}>
                          <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                            NO
                          </Typography>
                          <Typography variant="h6" sx={{ color: '#FF3D71', fontWeight: 700 }}>
                            ${market.noPrice.toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Volume and End Date */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                          Volume: ${market.totalVolume.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                          Ends: {new Date(market.endDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          {/* Bond Trading Interface */}
          <Grid container spacing={3}>
            {bondTranches.map((bond, index) => (
              <Grid item xs={12} sm={6} md={4} key={bond.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card
                    sx={{
                      background: 'linear-gradient(135deg, #00C85115 0%, #4CAF5005 100%)',
                      border: '1px solid #00C85130',
                      borderRadius: '12px',
                      height: '100%',
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ color: 'white', mb: 1, fontWeight: 600 }}>
                        {bond.creatorName} Bond
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 2 }}>
                        {bond.category}
                      </Typography>

                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                            Price
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                            ${bond.currentPrice.toFixed(2)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                            24h Change
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: bond.change24h >= 0 ? '#00C851' : '#FF3D71', 
                              fontWeight: 600 
                            }}
                          >
                            {bond.change24h >= 0 ? '+' : ''}{bond.change24h.toFixed(2)}%
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                            Volume
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                            ${bond.volume24h.toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            flex: 1,
                            backgroundColor: '#00C851',
                            '&:hover': { backgroundColor: '#2E7D32' },
                          }}
                        >
                          Buy
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            flex: 1,
                            borderColor: '#FF3D71',
                            color: '#FF3D71',
                            '&:hover': { 
                              borderColor: '#C62828',
                              backgroundColor: '#FF3D7120',
                            },
                          }}
                        >
                          Sell
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Bet Dialog */}
      <Dialog
        open={betDialogOpen}
        onClose={() => setBetDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#1A202C',
            border: '1px solid #2D3748',
          },
        }}
      >
        <DialogTitle sx={{ color: 'white' }}>
          Place Bet - {selectedMarket?.title}
        </DialogTitle>
        <DialogContent>
          {selectedMarket && (
            <Box>
              <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 2 }}>
                {selectedMarket.description}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button
                  variant={betSide === 'yes' ? 'contained' : 'outlined'}
                  onClick={() => setBetSide('yes')}
                  sx={{
                    flex: 1,
                    backgroundColor: betSide === 'yes' ? '#00C851' : 'transparent',
                    borderColor: '#00C851',
                    color: betSide === 'yes' ? 'white' : '#00C851',
                    '&:hover': {
                      backgroundColor: betSide === 'yes' ? '#2E7D32' : '#00C85120',
                    },
                  }}
                >
                  YES (${selectedMarket.yesPrice.toFixed(2)})
                </Button>
                <Button
                  variant={betSide === 'no' ? 'contained' : 'outlined'}
                  onClick={() => setBetSide('no')}
                  sx={{
                    flex: 1,
                    backgroundColor: betSide === 'no' ? '#FF3D71' : 'transparent',
                    borderColor: '#FF3D71',
                    color: betSide === 'no' ? 'white' : '#FF3D71',
                    '&:hover': {
                      backgroundColor: betSide === 'no' ? '#C62828' : '#FF3D7120',
                    },
                  }}
                >
                  NO (${selectedMarket.noPrice.toFixed(2)})
                </Button>
              </Box>

              <TextField
                label="Bet Amount ($)"
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                fullWidth
                InputProps={{
                  sx: {
                    backgroundColor: '#0B1426',
                    '& fieldset': { borderColor: '#2D3748' },
                    '&:hover fieldset': { borderColor: '#1B73E8' },
                    '&.Mui-focused fieldset': { borderColor: '#1B73E8' },
                  },
                }}
                InputLabelProps={{ sx: { color: '#A0AEC0' } }}
              />

              {betAmount && (
                <Typography variant="body2" sx={{ color: '#A0AEC0', mt: 1 }}>
                  Potential payout: ${(parseFloat(betAmount) * (betSide === 'yes' ? selectedMarket.yesPrice : selectedMarket.noPrice)).toFixed(2)}
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setBetDialogOpen(false)}
            sx={{ color: '#A0AEC0' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleBet}
            variant="contained"
            disabled={!betAmount || parseFloat(betAmount) <= 0}
            sx={{
              backgroundColor: '#1B73E8',
              '&:hover': { backgroundColor: '#1557B0' },
            }}
          >
            Place Bet
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TradingPage;