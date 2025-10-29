import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Grid,
} from '@mui/material';
import {
  YouTube as YouTubeIcon,
  AccountBalance as AccountBalanceIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useAuth } from '../components/Context/AuthContext';

const SignInPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'creator' as 'creator' | 'buyer',
    youtubeChannelId: '',
    youtubeApiKey: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        walletAddress: '0x' + Math.random().toString(16).substr(2, 40),
        youtubeChannelId: formData.youtubeChannelId,
        youtubeApiKey: formData.youtubeApiKey,
      };

      login(formData.userType, userData);
      router.push('/');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0B1426 0%, #1A202C 50%, #2D3748 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{ color: 'white', fontWeight: 700, mb: 2 }}>
            Welcome to HypeVest
          </Typography>
          <Typography variant="h5" sx={{ color: '#A0AEC0', mb: 4 }}>
            Choose your role to get started
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {/* Creator Card */}
          <Grid item xs={12} md={5}>
            <Card
              sx={{
                background: 'rgba(26, 32, 44, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(45, 55, 72, 0.3)',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(27, 115, 232, 0.3)',
                  border: '1px solid #1B73E8',
                },
              }}
              onClick={() => setFormData({ ...formData, userType: 'creator' })}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <YouTubeIcon sx={{ fontSize: 60, color: '#1B73E8', mb: 2 }} />
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                  Creator
                </Typography>
                <Typography variant="body1" sx={{ color: '#A0AEC0', mb: 3 }}>
                  Monetize your content and connect with your audience through Creator Bonds
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: formData.userType === 'creator' ? '#1B73E8' : 'transparent',
                    border: '2px solid #1B73E8',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#1B73E8',
                    },
                  }}
                >
                  {formData.userType === 'creator' ? 'Selected' : 'Select Creator'}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Investor Card */}
          <Grid item xs={12} md={5}>
            <Card
              sx={{
                background: 'rgba(26, 32, 44, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(45, 55, 72, 0.3)',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(0, 200, 81, 0.3)',
                  border: '1px solid #00C851',
                },
              }}
              onClick={() => setFormData({ ...formData, userType: 'buyer' })}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <AccountBalanceIcon sx={{ fontSize: 60, color: '#00C851', mb: 2 }} />
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                  Investor
                </Typography>
                <Typography variant="body1" sx={{ color: '#A0AEC0', mb: 3 }}>
                  Invest in your favorite creators and earn from their success
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: formData.userType === 'buyer' ? '#00C851' : 'transparent',
                    border: '2px solid #00C851',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#00C851',
                    },
                  }}
                >
                  {formData.userType === 'buyer' ? 'Selected' : 'Select Investor'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Sign In Form */}
        <Card
          sx={{
            background: 'rgba(26, 32, 44, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(45, 55, 72, 0.3)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            mt: 4,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3, textAlign: 'center' }}>
              Sign In as {formData.userType === 'creator' ? 'Creator' : 'Investor'}
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3, backgroundColor: '#FF3D7120', color: '#FF3D71' }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
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
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
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
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
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

              {formData.userType === 'creator' && (
                <>
                  <TextField
                    fullWidth
                    label="YouTube Channel ID"
                    name="youtubeChannelId"
                    value={formData.youtubeChannelId}
                    onChange={handleChange}
                    placeholder="UCxxxxxxxxxxxxxxxxxxxxxx"
                    sx={{ mb: 3 }}
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
                    fullWidth
                    label="YouTube API Key"
                    name="youtubeApiKey"
                    value={formData.youtubeApiKey}
                    onChange={handleChange}
                    placeholder="AIzaSy..."
                    sx={{ mb: 3 }}
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
                </>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  backgroundColor: formData.userType === 'creator' ? '#1B73E8' : '#00C851',
                  '&:hover': { 
                    backgroundColor: formData.userType === 'creator' ? '#1557B0' : '#2E7D32' 
                  },
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>
            </form>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                Don't have an account?{' '}
                <Button
                  onClick={() => router.push('/signup')}
                  sx={{ color: '#1B73E8', textTransform: 'none', p: 0 }}
                >
                  Sign up here
                </Button>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default SignInPage;