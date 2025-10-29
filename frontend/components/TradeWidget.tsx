import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  SwapHoriz as SwapHorizIcon,
} from '@mui/icons-material';

interface TradeWidgetProps {
  selectedBond?: {
    id: string;
    creator: string;
    currentPrice: number;
    volume24h: number;
    change24h: number;
  } | null;
}

const TradeWidget: React.FC<TradeWidgetProps> = ({ selectedBond }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');

  // Mock orderbook data
  const orderbookData = {
    bids: [
      { price: 12.45, amount: 150, total: 1867.5 },
      { price: 12.40, amount: 200, total: 2480 },
      { price: 12.35, amount: 100, total: 1235 },
      { price: 12.30, amount: 300, total: 3690 },
      { price: 12.25, amount: 250, total: 3062.5 },
    ],
    asks: [
      { price: 12.50, amount: 180, total: 2250 },
      { price: 12.55, amount: 120, total: 1506 },
      { price: 12.60, amount: 200, total: 2520 },
      { price: 12.65, amount: 150, total: 1897.5 },
      { price: 12.70, amount: 100, total: 1270 },
    ],
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleBuy = () => {
    // Implement buy logic
    console.log('Buy:', buyAmount);
  };

  const handleSell = () => {
    // Implement sell logic
    console.log('Sell:', sellAmount);
  };

  if (!selectedBond) {
    return (
      <Card
        sx={{
          background: 'linear-gradient(135deg, #1B73E815 0%, #4285F405 100%)',
          border: '1px solid #1B73E830',
          borderRadius: '12px',
          height: '100%',
        }}
      >
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <SwapHorizIcon sx={{ fontSize: 48, color: '#A0AEC0', mb: 2 }} />
          <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
            Select a Bond to Trade
          </Typography>
          <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
            Choose a creator bond from the marketplace to start trading
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #1B73E815 0%, #4285F405 100%)',
        border: '1px solid #1B73E830',
        borderRadius: '12px',
        height: '100%',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Bond Info Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
            {selectedBond.creator} Bond
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
              ${selectedBond.currentPrice.toFixed(2)}
            </Typography>
            <Chip
              icon={selectedBond.change24h >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
              label={`${selectedBond.change24h >= 0 ? '+' : ''}${selectedBond.change24h.toFixed(2)}%`}
              size="small"
              sx={{
                backgroundColor: selectedBond.change24h >= 0 ? '#00C85120' : '#FF3D7120',
                color: selectedBond.change24h >= 0 ? '#00C851' : '#FF3D71',
                border: `1px solid ${selectedBond.change24h >= 0 ? '#00C851' : '#FF3D71'}30`,
              }}
            />
          </Box>
          <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
            24h Volume: ${selectedBond.volume24h.toLocaleString()}
          </Typography>
        </Box>

        {/* Trading Tabs */}
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
            <Tab label="Trade" />
            <Tab label="Orderbook" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <Grid container spacing={2}>
            {/* Buy Section */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  border: '1px solid #00C85130',
                  borderRadius: '8px',
                  backgroundColor: '#00C85110',
                }}
              >
                <Typography variant="subtitle1" sx={{ color: '#00C851', mb: 2, fontWeight: 600 }}>
                  Buy Bonds
                </Typography>
                <TextField
                  label="Amount"
                  type="number"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                  InputProps={{
                    sx: {
                      backgroundColor: '#0B1426',
                      '& fieldset': { borderColor: '#2D3748' },
                      '&:hover fieldset': { borderColor: '#00C851' },
                      '&.Mui-focused fieldset': { borderColor: '#00C851' },
                    },
                  }}
                  InputLabelProps={{ sx: { color: '#A0AEC0' } }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleBuy}
                  disabled={!buyAmount}
                  sx={{
                    backgroundColor: '#00C851',
                    '&:hover': { backgroundColor: '#2E7D32' },
                    '&:disabled': { backgroundColor: '#2D3748', color: '#A0AEC0' },
                  }}
                >
                  Buy Bonds
                </Button>
                {buyAmount && (
                  <Typography variant="body2" sx={{ color: '#A0AEC0', mt: 1, textAlign: 'center' }}>
                    Total: ${(parseFloat(buyAmount) * selectedBond.currentPrice).toFixed(2)}
                  </Typography>
                )}
              </Box>
            </Grid>

            {/* Sell Section */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  border: '1px solid #FF3D7130',
                  borderRadius: '8px',
                  backgroundColor: '#FF3D7110',
                }}
              >
                <Typography variant="subtitle1" sx={{ color: '#FF3D71', mb: 2, fontWeight: 600 }}>
                  Sell Bonds
                </Typography>
                <TextField
                  label="Amount"
                  type="number"
                  value={sellAmount}
                  onChange={(e) => setSellAmount(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                  InputProps={{
                    sx: {
                      backgroundColor: '#0B1426',
                      '& fieldset': { borderColor: '#2D3748' },
                      '&:hover fieldset': { borderColor: '#FF3D71' },
                      '&.Mui-focused fieldset': { borderColor: '#FF3D71' },
                    },
                  }}
                  InputLabelProps={{ sx: { color: '#A0AEC0' } }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSell}
                  disabled={!sellAmount}
                  sx={{
                    backgroundColor: '#FF3D71',
                    '&:hover': { backgroundColor: '#C62828' },
                    '&:disabled': { backgroundColor: '#2D3748', color: '#A0AEC0' },
                  }}
                >
                  Sell Bonds
                </Button>
                {sellAmount && (
                  <Typography variant="body2" sx={{ color: '#A0AEC0', mt: 1, textAlign: 'center' }}>
                    Total: ${(parseFloat(sellAmount) * selectedBond.currentPrice).toFixed(2)}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Box>
            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
              Orderbook
            </Typography>
            <TableContainer
              component={Paper}
              sx={{
                backgroundColor: '#0B1426',
                border: '1px solid #2D3748',
                maxHeight: 400,
              }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#A0AEC0', borderColor: '#2D3748' }}>Price</TableCell>
                    <TableCell sx={{ color: '#A0AEC0', borderColor: '#2D3748' }}>Amount</TableCell>
                    <TableCell sx={{ color: '#A0AEC0', borderColor: '#2D3748' }}>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Asks (Sell Orders) */}
                  {orderbookData.asks.map((ask, index) => (
                    <TableRow key={`ask-${index}`}>
                      <TableCell sx={{ color: '#FF3D71', borderColor: '#2D3748' }}>
                        ${ask.price.toFixed(2)}
                      </TableCell>
                      <TableCell sx={{ color: 'white', borderColor: '#2D3748' }}>
                        {ask.amount}
                      </TableCell>
                      <TableCell sx={{ color: 'white', borderColor: '#2D3748' }}>
                        ${ask.total.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Spread */}
                  <TableRow>
                    <TableCell colSpan={3} sx={{ textAlign: 'center', borderColor: '#2D3748' }}>
                      <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                        Spread: ${(orderbookData.asks[0].price - orderbookData.bids[0].price).toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  {/* Bids (Buy Orders) */}
                  {orderbookData.bids.map((bid, index) => (
                    <TableRow key={`bid-${index}`}>
                      <TableCell sx={{ color: '#00C851', borderColor: '#2D3748' }}>
                        ${bid.price.toFixed(2)}
                      </TableCell>
                      <TableCell sx={{ color: 'white', borderColor: '#2D3748' }}>
                        {bid.amount}
                      </TableCell>
                      <TableCell sx={{ color: 'white', borderColor: '#2D3748' }}>
                        ${bid.total.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default TradeWidget;
