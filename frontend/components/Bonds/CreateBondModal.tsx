import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../Context/AuthContext';

interface CreateBondModalProps {
  open: boolean;
  onClose: () => void;
  onCreateBond: (bondData: any) => void;
}

const CreateBondModal: React.FC<CreateBondModalProps> = ({ open, onClose, onCreateBond }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bondData, setBondData] = useState({
    totalSupply: '',
    revenueShare: '',
    maturityDate: '',
    initialPrice: '',
    category: '',
    description: '',
  });

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Validate inputs
      if (!bondData.totalSupply || !bondData.revenueShare || !bondData.maturityDate) {
        throw new Error('Please fill in all required fields');
      }
      
      if (parseInt(bondData.revenueShare) < 1 || parseInt(bondData.revenueShare) > 50) {
        throw new Error('Revenue share must be between 1% and 50%');
      }
      
      if (parseInt(bondData.totalSupply) < 100) {
        throw new Error('Total supply must be at least 100 bonds');
      }
      
      // In a real app, this would call the Linera contract
      const newBond = {
        id: Date.now().toString(),
        creator: user?.walletAddress,
        creatorName: user?.name,
        totalSupply: parseInt(bondData.totalSupply),
        revenueShare: parseInt(bondData.revenueShare),
        maturityDate: bondData.maturityDate,
        initialPrice: parseFloat(bondData.initialPrice) || 10.0,
        category: bondData.category || 'General',
        description: bondData.description,
        minted: 0,
        totalCollected: 0,
        status: 'active',
        createdAt: new Date().toISOString(),
      };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onCreateBond(newBond);
      
      // Reset form
      setBondData({
        totalSupply: '',
        revenueShare: '',
        maturityDate: '',
        initialPrice: '',
        category: '',
        description: '',
      });
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#1A202C',
          border: '1px solid #2D3748',
        },
      }}
    >
      <DialogTitle sx={{ color: 'white', textAlign: 'center' }}>
        Create New Creator Bond
      </DialogTitle>
      
      <DialogContent>
        <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 3, textAlign: 'center' }}>
          Create a bond that allows investors to buy a share of your future revenue
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3, backgroundColor: '#FF3D7120', color: '#FF3D71' }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Total Supply"
              type="number"
              fullWidth
              value={bondData.totalSupply}
              onChange={(e) => setBondData({ ...bondData, totalSupply: e.target.value })}
              placeholder="10000"
              helperText="Number of bonds to create"
              InputProps={{
                sx: {
                  backgroundColor: '#0B1426',
                  '& fieldset': { borderColor: '#2D3748' },
                  '&:hover fieldset': { borderColor: '#1B73E8' },
                  '&.Mui-focused fieldset': { borderColor: '#1B73E8' },
                },
              }}
              InputLabelProps={{ sx: { color: '#A0AEC0' } }}
              FormHelperTextProps={{ sx: { color: '#A0AEC0' } }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              label="Revenue Share (%)"
              type="number"
              fullWidth
              value={bondData.revenueShare}
              onChange={(e) => setBondData({ ...bondData, revenueShare: e.target.value })}
              placeholder="5"
              helperText="Percentage of revenue to share (1-50%)"
              InputProps={{
                sx: {
                  backgroundColor: '#0B1426',
                  '& fieldset': { borderColor: '#2D3748' },
                  '&:hover fieldset': { borderColor: '#1B73E8' },
                  '&.Mui-focused fieldset': { borderColor: '#1B73E8' },
                },
              }}
              InputLabelProps={{ sx: { color: '#A0AEC0' } }}
              FormHelperTextProps={{ sx: { color: '#A0AEC0' } }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              label="Maturity Date"
              type="date"
              fullWidth
              value={bondData.maturityDate}
              onChange={(e) => setBondData({ ...bondData, maturityDate: e.target.value })}
              InputLabelProps={{ shrink: true, sx: { color: '#A0AEC0' } }}
              InputProps={{
                sx: {
                  backgroundColor: '#0B1426',
                  '& fieldset': { borderColor: '#2D3748' },
                  '&:hover fieldset': { borderColor: '#1B73E8' },
                  '&.Mui-focused fieldset': { borderColor: '#1B73E8' },
                  color: 'white',
                },
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              label="Initial Price ($)"
              type="number"
              fullWidth
              value={bondData.initialPrice}
              onChange={(e) => setBondData({ ...bondData, initialPrice: e.target.value })}
              placeholder="10.00"
              helperText="Starting price per bond"
              InputProps={{
                sx: {
                  backgroundColor: '#0B1426',
                  '& fieldset': { borderColor: '#2D3748' },
                  '&:hover fieldset': { borderColor: '#1B73E8' },
                  '&.Mui-focused fieldset': { borderColor: '#1B73E8' },
                },
              }}
              InputLabelProps={{ sx: { color: '#A0AEC0' } }}
              FormHelperTextProps={{ sx: { color: '#A0AEC0' } }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Category"
              fullWidth
              value={bondData.category}
              onChange={(e) => setBondData({ ...bondData, category: e.target.value })}
              placeholder="Tech Reviews, Gaming, Lifestyle, etc."
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
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={bondData.description}
              onChange={(e) => setBondData({ ...bondData, description: e.target.value })}
              placeholder="Describe your content and why investors should buy your bonds..."
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
          </Grid>
        </Grid>

        {/* Bond Preview */}
        {bondData.totalSupply && bondData.revenueShare && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              backgroundColor: '#0B1426',
              border: '1px solid #2D3748',
              borderRadius: '8px',
            }}
          >
            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
              Bond Preview
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                  Total Supply
                </Typography>
                <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                  {bondData.totalSupply} bonds
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                  Revenue Share
                </Typography>
                <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                  {bondData.revenueShare}%
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                  Initial Price
                </Typography>
                <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                  ${bondData.initialPrice || '10.00'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                  Potential Revenue
                </Typography>
                <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                  ${(parseInt(bondData.totalSupply) * parseFloat(bondData.initialPrice || '10')).toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
      </DialogContent>
      
      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={onClose}
          sx={{ color: '#A0AEC0' }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: '#1B73E8',
            '&:hover': { backgroundColor: '#1557B0' },
          }}
        >
          {loading ? <CircularProgress size={20} /> : 'Create Bond'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBondModal;


