import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Tabs,
  Tab,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  YouTube as YouTubeIcon,
  AccountBalance as AccountBalanceIcon,
} from '@mui/icons-material';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (userType: 'creator' | 'buyer', data: any) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onLogin }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Creator form data
  const [creatorData, setCreatorData] = useState({
    name: '',
    email: '',
    youtubeChannelId: '',
    youtubeApiKey: '',
    walletAddress: '',
  });
  
  // Buyer form data
  const [buyerData, setBuyerData] = useState({
    name: '',
    email: '',
    walletAddress: '',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setError('');
  };

  const handleCreatorSubmit = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Validate required fields
      if (!creatorData.name || !creatorData.email || !creatorData.walletAddress) {
        throw new Error('Please fill in all required fields');
      }
      
      // Validate YouTube API key by fetching channel data
      if (creatorData.youtubeApiKey && creatorData.youtubeChannelId) {
        // Validate API key format
        if (!creatorData.youtubeApiKey.startsWith('AIza')) {
          throw new Error('Invalid YouTube API key format. Should start with "AIza"');
        }
        
        // Validate Channel ID format
        if (!creatorData.youtubeChannelId.startsWith('UC') || creatorData.youtubeChannelId.length !== 24) {
          throw new Error('Invalid Channel ID format. Should start with "UC" and be 24 characters long');
        }
        
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${creatorData.youtubeChannelId}&key=${creatorData.youtubeApiKey}`
        );
        
        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 403) {
            throw new Error('YouTube API quota exceeded or API key restrictions. Please check your API key settings.');
          } else if (response.status === 400) {
            throw new Error('Invalid YouTube API key or Channel ID. Please verify both are correct.');
          } else {
            throw new Error(`YouTube API error: ${errorData.error?.message || 'Unknown error'}`);
          }
        }
        
        const data = await response.json();
        if (!data.items || data.items.length === 0) {
          throw new Error('Channel not found. Please verify the Channel ID is correct.');
        }
        
        const channelData = data.items[0];
        const analytics = {
          channelId: creatorData.youtubeChannelId,
          channelName: channelData.snippet.title,
          subscriberCount: parseInt(channelData.statistics.subscriberCount || '0'),
          viewCount: parseInt(channelData.statistics.viewCount || '0'),
          videoCount: parseInt(channelData.statistics.videoCount || '0'),
        };
        
        // Register creator with relayer
        try {
          await fetch('http://localhost:3001/register-creator', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              creatorAddress: creatorData.walletAddress,
              channelId: creatorData.youtubeChannelId,
              bondTranches: [],
            }),
          });
        } catch (relayerError) {
          console.warn('Relayer not available, continuing without registration');
        }
        
        onLogin('creator', {
          ...creatorData,
          analytics,
        });
      } else {
        // Allow registration without YouTube data for now
        onLogin('creator', creatorData);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyerSubmit = () => {
    onLogin('buyer', buyerData);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#1A202C',
          border: '1px solid #2D3748',
        },
      }}
    >
      <DialogTitle sx={{ color: 'white', textAlign: 'center' }}>
        Welcome to HypeVest CreatorBank
      </DialogTitle>
      
      <DialogContent>
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
            <Tab
              icon={<YouTubeIcon />}
              label="Creator"
              iconPosition="start"
            />
            <Tab
              icon={<AccountBalanceIcon />}
              label="Investor"
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2, backgroundColor: '#FF3D7120', color: '#FF3D71' }}>
            {error}
          </Alert>
        )}

        {activeTab === 0 && (
          <Box>
            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
              Creator Registration
            </Typography>
            <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 3 }}>
              Connect your YouTube channel to start earning from your content
            </Typography>
            
            <TextField
              label="Creator Name"
              fullWidth
              value={creatorData.name}
              onChange={(e) => setCreatorData({ ...creatorData, name: e.target.value })}
              sx={{ mb: 2 }}
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
            
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={creatorData.email}
              onChange={(e) => setCreatorData({ ...creatorData, email: e.target.value })}
              sx={{ mb: 2 }}
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
            
            <TextField
              label="YouTube Channel ID"
              fullWidth
              value={creatorData.youtubeChannelId}
              onChange={(e) => setCreatorData({ ...creatorData, youtubeChannelId: e.target.value })}
              sx={{ mb: 2 }}
              placeholder="UCxxxxxxxxxxxxxxxxxxxxxx"
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
            
            <TextField
              label="YouTube API Key"
              fullWidth
              value={creatorData.youtubeApiKey}
              onChange={(e) => setCreatorData({ ...creatorData, youtubeApiKey: e.target.value })}
              sx={{ mb: 2 }}
              placeholder="AIzaSy..."
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
            
            <TextField
              label="Wallet Address"
              fullWidth
              value={creatorData.walletAddress}
              onChange={(e) => setCreatorData({ ...creatorData, walletAddress: e.target.value })}
              placeholder="0x..."
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
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
              Investor Registration
            </Typography>
            <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 3 }}>
              Start investing in your favorite creators and earn from their success
            </Typography>
            
            <TextField
              label="Investor Name"
              fullWidth
              value={buyerData.name}
              onChange={(e) => setBuyerData({ ...buyerData, name: e.target.value })}
              sx={{ mb: 2 }}
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
            
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={buyerData.email}
              onChange={(e) => setBuyerData({ ...buyerData, email: e.target.value })}
              sx={{ mb: 2 }}
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
            
            <TextField
              label="Wallet Address"
              fullWidth
              value={buyerData.walletAddress}
              onChange={(e) => setBuyerData({ ...buyerData, walletAddress: e.target.value })}
              placeholder="0x..."
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
          onClick={activeTab === 0 ? handleCreatorSubmit : handleBuyerSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: '#1B73E8',
            '&:hover': { backgroundColor: '#1557B0' },
          }}
        >
          {loading ? <CircularProgress size={20} /> : 'Sign In'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;

