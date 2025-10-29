import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Chip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';

interface BondTranche {
  id: string;
  creator: string;
  creatorAvatar?: string;
  totalSupply: number;
  minted: number;
  totalCollected: number;
  revenueShare: number;
  maturityDate: string;
  currentPrice: number;
  category: string;
}

interface BondCardProps {
  tranche: BondTranche;
  onBuy: (trancheId: string, amount: number) => void;
}

const BondCard: React.FC<BondCardProps> = ({ tranche, onBuy }) => {
  const [buyDialogOpen, setBuyDialogOpen] = useState(false);
  const [buyAmount, setBuyAmount] = useState('');

  const progress = (tranche.minted / tranche.totalSupply) * 100;
  const remaining = tranche.totalSupply - tranche.minted;

  const handleBuy = () => {
    const amount = parseFloat(buyAmount);
    if (amount > 0 && amount <= remaining) {
      onBuy(tranche.id, amount);
      setBuyDialogOpen(false);
      setBuyAmount('');
    }
  };

  return (
    <>
      <Card
        sx={{
          background: 'linear-gradient(135deg, #1B73E815 0%, #4285F405 100%)',
          border: '1px solid #1B73E830',
          borderRadius: '12px',
          height: '100%',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 32px rgba(27, 115, 232, 0.2)',
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              src={tranche.creatorAvatar}
              sx={{
                width: 40,
                height: 40,
                mr: 2,
                backgroundColor: '#1B73E8',
              }}
            >
              {tranche.creator.charAt(0)}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                {tranche.creator}
              </Typography>
              <Chip
                label={tranche.category}
                size="small"
                sx={{
                  backgroundColor: '#1B73E820',
                  color: '#1B73E8',
                  border: '1px solid #1B73E830',
                }}
              />
            </Box>
          </Box>

          {/* Stats */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                Revenue Share
              </Typography>
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                {tranche.revenueShare}%
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                Current Price
              </Typography>
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                ${tranche.currentPrice.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                Maturity Date
              </Typography>
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                {tranche.maturityDate}
              </Typography>
            </Box>
          </Box>

          {/* Progress */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                Progress
              </Typography>
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                {tranche.minted.toLocaleString()} / {tranche.totalSupply.toLocaleString()}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
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
          </Box>

          {/* Action */}
          <Button
            variant="contained"
            fullWidth
            onClick={() => setBuyDialogOpen(true)}
            disabled={remaining <= 0}
            sx={{
              backgroundColor: '#1B73E8',
              '&:hover': { backgroundColor: '#1557B0' },
              '&:disabled': { backgroundColor: '#2D3748', color: '#A0AEC0' },
            }}
          >
            {remaining <= 0 ? 'Sold Out' : `Buy Bond - ${remaining.toLocaleString()} left`}
          </Button>
        </CardContent>
      </Card>

      {/* Buy Dialog */}
      <Dialog
        open={buyDialogOpen}
        onClose={() => setBuyDialogOpen(false)}
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
          Buy {tranche.creator} Bond
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 1 }}>
              Available: {remaining.toLocaleString()} bonds
            </Typography>
            <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 1 }}>
              Price per bond: ${tranche.currentPrice.toFixed(2)}
            </Typography>
            <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 2 }}>
              Revenue share: {tranche.revenueShare}%
            </Typography>
          </Box>
          <TextField
            label="Amount to buy"
            type="number"
            value={buyAmount}
            onChange={(e) => setBuyAmount(e.target.value)}
            fullWidth
            inputProps={{ min: 1, max: remaining }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#0B1426',
                '& fieldset': { borderColor: '#2D3748' },
                '&:hover fieldset': { borderColor: '#1B73E8' },
                '&.Mui-focused fieldset': { borderColor: '#1B73E8' },
              },
              '& .MuiInputLabel-root': { color: '#A0AEC0' },
              '& .MuiInputBase-input': { color: 'white' },
            }}
          />
          {buyAmount && (
            <Typography variant="body2" sx={{ color: '#A0AEC0', mt: 1 }}>
              Total cost: ${(parseFloat(buyAmount) * tranche.currentPrice).toFixed(2)}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setBuyDialogOpen(false)}
            sx={{ color: '#A0AEC0' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleBuy}
            variant="contained"
            disabled={!buyAmount || parseFloat(buyAmount) <= 0 || parseFloat(buyAmount) > remaining}
            sx={{
              backgroundColor: '#1B73E8',
              '&:hover': { backgroundColor: '#1557B0' },
            }}
          >
            Buy Bonds
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BondCard;
