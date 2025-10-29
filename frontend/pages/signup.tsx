import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Alert,
  Divider,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person as PersonIcon,
  Business as BusinessIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useAuth } from '../components/Context/AuthContext';

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'investor' as 'investor' | 'creator',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate registration and login
      login(formData.role === 'creator' ? 'creator' : 'buyer', {
        name: formData.name,
        email: formData.email,
        walletAddress: '0x' + Math.random().toString(16).substr(2, 40),
        analytics: formData.role === 'creator' ? {
          channelId: 'UC' + Math.random().toString(36).substr(2, 22),
          channelName: formData.name + ' Channel',
          subscriberCount: Math.floor(Math.random() * 1000000) + 10000,
          viewCount: Math.floor(Math.random() * 10000000) + 100000,
          videoCount: Math.floor(Math.random() * 1000) + 50,
        } : undefined,
      });
      
      router.push('/');
    }
  };

  const roleOptions = [
    {
      value: 'investor',
      label: 'Investor',
      description: 'Invest in creator bonds and prediction markets',
      icon: <BusinessIcon sx={{ fontSize: 40, color: '#1B73E8' }} />,
      color: '#1B73E8',
    },
    {
      value: 'creator',
      label: 'Creator',
      description: 'Create bonds and manage your creator economy',
      icon: <PersonIcon sx={{ fontSize: 40, color: '#00C851' }} />,
      color: '#00C851',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0B1426 0%, #1A202C 50%, #2D3748 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card
            sx={{
              background: 'rgba(26, 32, 44, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(45, 55, 72, 0.3)',
              borderRadius: '16px',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              {/* Header */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #1B73E8 0%, #4285F4 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                    }}
                  >
                    <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold' }}>
                      H
                    </Typography>
                  </Box>
                </motion.div>
                
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
                  Create Account
                </Typography>
                <Typography variant="body1" sx={{ color: '#A0AEC0' }}>
                  Join HypeVest and start your creator economy journey
                </Typography>
              </Box>

              {/* Role Selection */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ color: 'white', mb: 3, textAlign: 'center' }}>
                  Choose your role
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  {roleOptions.map((option) => (
                    <motion.div
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant={formData.role === option.value ? 'contained' : 'outlined'}
                        onClick={() => handleInputChange('role', option.value)}
                        sx={{
                          flex: 1,
                          p: 3,
                          borderRadius: '12px',
                          backgroundColor: formData.role === option.value 
                            ? `${option.color}20` 
                            : 'transparent',
                          borderColor: formData.role === option.value 
                            ? option.color 
                            : '#2D3748',
                          color: formData.role === option.value ? option.color : '#A0AEC0',
                          '&:hover': {
                            backgroundColor: formData.role === option.value 
                              ? `${option.color}30` 
                              : '#2D3748',
                            borderColor: option.color,
                          },
                        }}
                      >
                        <Box sx={{ textAlign: 'center' }}>
                          {option.icon}
                          <Typography variant="h6" sx={{ mt: 1, mb: 0.5, fontWeight: 600 }}>
                            {option.label}
                          </Typography>
                          <Typography variant="caption" sx={{ display: 'block', opacity: 0.8 }}>
                            {option.description}
                          </Typography>
                        </Box>
                      </Button>
                    </motion.div>
                  ))}
                </Box>
              </Box>

              <Divider sx={{ borderColor: '#2D3748', mb: 4 }} />

              {/* Sign Up Form */}
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                    InputProps={{
                      sx: {
                        backgroundColor: '#0B1426',
                        borderRadius: '12px',
                        '& fieldset': { borderColor: '#2D3748' },
                        '&:hover fieldset': { borderColor: '#1B73E8' },
                        '&.Mui-focused fieldset': { borderColor: '#1B73E8' },
                      },
                    }}
                    InputLabelProps={{ sx: { color: '#A0AEC0' } }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    InputProps={{
                      sx: {
                        backgroundColor: '#0B1426',
                        borderRadius: '12px',
                        '& fieldset': { borderColor: '#2D3748' },
                        '&:hover fieldset': { borderColor: '#1B73E8' },
                        '&.Mui-focused fieldset': { borderColor: '#1B73E8' },
                      },
                    }}
                    InputLabelProps={{ sx: { color: '#A0AEC0' } }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: '#A0AEC0' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        backgroundColor: '#0B1426',
                        borderRadius: '12px',
                        '& fieldset': { borderColor: '#2D3748' },
                        '&:hover fieldset': { borderColor: '#1B73E8' },
                        '&.Mui-focused fieldset': { borderColor: '#1B73E8' },
                      },
                    }}
                    InputLabelProps={{ sx: { color: '#A0AEC0' } }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                            sx={{ color: '#A0AEC0' }}
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        backgroundColor: '#0B1426',
                        borderRadius: '12px',
                        '& fieldset': { borderColor: '#2D3748' },
                        '&:hover fieldset': { borderColor: '#1B73E8' },
                        '&.Mui-focused fieldset': { borderColor: '#1B73E8' },
                      },
                    }}
                    InputLabelProps={{ sx: { color: '#A0AEC0' } }}
                  />
                </Box>

                <Box sx={{ mb: 4 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.agreeToTerms}
                        onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                        sx={{
                          color: '#1B73E8',
                          '&.Mui-checked': {
                            color: '#1B73E8',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                        I agree to the{' '}
                        <Button
                          variant="text"
                          sx={{
                            color: '#1B73E8',
                            textTransform: 'none',
                            p: 0,
                            minWidth: 'auto',
                            '&:hover': {
                              backgroundColor: 'transparent',
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          Terms and Conditions
                        </Button>
                        {' '}and{' '}
                        <Button
                          variant="text"
                          sx={{
                            color: '#1B73E8',
                            textTransform: 'none',
                            p: 0,
                            minWidth: 'auto',
                            '&:hover': {
                              backgroundColor: 'transparent',
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          Privacy Policy
                        </Button>
                      </Typography>
                    }
                  />
                  {errors.agreeToTerms && (
                    <Typography variant="caption" sx={{ color: '#FF3D71', mt: 1, display: 'block' }}>
                      {errors.agreeToTerms}
                    </Typography>
                  )}
                </Box>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: '#1B73E8',
                      borderRadius: '12px',
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#1557B0',
                      },
                    }}
                  >
                    Create Account
                  </Button>
                </motion.div>
              </form>

              {/* Footer */}
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                  Already have an account?{' '}
                  <Button
                    variant="text"
                    onClick={() => router.push('/signin')}
                    sx={{
                      color: '#1B73E8',
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: 'transparent',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Sign in here
                  </Button>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default SignUpPage;
