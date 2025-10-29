import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  CameraAlt as CameraIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../components/Context/AuthContext';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  website: string;
  company: string;
  education: string;
  joinDate: string;
  lastActive: string;
  avatar: string;
  coverImage: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    instagram?: string;
  };
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    language: string;
    currency: string;
  };
  stats: {
    totalInvestments: number;
    totalReturns: number;
    activeBonds: number;
    predictionAccuracy: number;
  };
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Creator and investor passionate about the future of content creation and decentralized finance.',
    website: 'https://johndoe.com',
    company: 'HypeVest Creator',
    education: 'Stanford University',
    joinDate: '2023-01-15',
    lastActive: '2024-01-20',
    avatar: '',
    coverImage: '',
    socialLinks: {
      twitter: '@johndoe',
      linkedin: 'linkedin.com/in/johndoe',
      youtube: 'youtube.com/@johndoe',
      instagram: '@johndoe',
    },
    preferences: {
      notifications: true,
      darkMode: true,
      language: 'English',
      currency: 'USD',
    },
    stats: {
      totalInvestments: 125000,
      totalReturns: 18750,
      activeBonds: 8,
      predictionAccuracy: 78.5,
    },
  });

  const [tempData, setTempData] = useState<ProfileData>(profileData);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update profile data when user data is available
  useEffect(() => {
    if (user && mounted) {
      setProfileData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
      }));
    }
  }, [user, mounted]);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const handleEdit = () => {
    setTempData(profileData);
    setEditMode(true);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setEditMode(false);
    setEditDialogOpen(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setEditMode(false);
    setEditDialogOpen(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setTempData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedInputChange = (parent: string, field: string, value: any) => {
    setTempData(prev => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof ProfileData] as any),
        [field]: value,
      },
    }));
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
      {/* Cover Image and Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          sx={{
            background: 'linear-gradient(135deg, #1B73E815 0%, #4285F405 100%)',
            border: '1px solid #1B73E830',
            borderRadius: '12px',
            mb: 4,
            overflow: 'hidden',
          }}
        >
          {/* Cover Image */}
          <Box
            sx={{
              height: 200,
              backgroundImage: profileData.coverImage ? `url(${profileData.coverImage})` : 'linear-gradient(135deg, #1B73E8 0%, #4285F4 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {!profileData.coverImage && (
              <Typography variant="h6" sx={{ color: 'white', opacity: 0.7 }}>
                Cover Image
              </Typography>
            )}
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                display: 'flex',
                gap: 1,
              }}
            >
              <IconButton
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
                }}
              >
                <CameraIcon />
              </IconButton>
              <IconButton
                onClick={() => setEditDialogOpen(true)}
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
                }}
              >
                <EditIcon />
              </IconButton>
            </Box>
          </Box>

          <CardContent sx={{ p: 3, position: 'relative' }}>
            {/* Profile Avatar */}
            <Box
              sx={{
                position: 'absolute',
                top: -60,
                left: 24,
                display: 'flex',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <Avatar
                src={profileData.avatar}
                sx={{
                  width: 120,
                  height: 120,
                  border: '4px solid #0B1426',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  backgroundColor: profileData.avatar ? 'transparent' : '#1B73E8',
                }}
              >
                {!profileData.avatar && (
                  <PersonIcon sx={{ fontSize: 60, color: 'white' }} />
                )}
              </Avatar>
              <Box sx={{ mt: 8 }}>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
                  {profileData.name}
                </Typography>
                <Typography variant="body1" sx={{ color: '#A0AEC0', mb: 2 }}>
                  {profileData.bio}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label={profileData.company}
                    size="small"
                    sx={{
                      backgroundColor: '#1B73E820',
                      color: '#1B73E8',
                      border: '1px solid #1B73E830',
                    }}
                  />
                  <Chip
                    label={`Joined ${new Date(profileData.joinDate).getFullYear()}`}
                    size="small"
                    sx={{
                      backgroundColor: '#00C85120',
                      color: '#00C851',
                      border: '1px solid #00C85130',
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      <Grid container spacing={3}>
        {/* Left Column - Profile Details */}
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            {/* Personal Information */}
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #00C85115 0%, #4CAF5005 100%)',
                    border: '1px solid #00C85130',
                    borderRadius: '12px',
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                        Personal Information
                      </Typography>
                      <IconButton
                        onClick={handleEdit}
                        sx={{ color: '#1B73E8' }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <PersonIcon sx={{ color: '#A0AEC0', mr: 2 }} />
                          <Box>
                            <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                              Full Name
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'white' }}>
                              {profileData.name}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <EmailIcon sx={{ color: '#A0AEC0', mr: 2 }} />
                          <Box>
                            <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                              Email
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'white' }}>
                              {profileData.email}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <PhoneIcon sx={{ color: '#A0AEC0', mr: 2 }} />
                          <Box>
                            <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                              Phone
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'white' }}>
                              {profileData.phone}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <LocationIcon sx={{ color: '#A0AEC0', mr: 2 }} />
                          <Box>
                            <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                              Location
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'white' }}>
                              {profileData.location}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <WorkIcon sx={{ color: '#A0AEC0', mr: 2 }} />
                          <Box>
                            <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                              Company
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'white' }}>
                              {profileData.company}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <SchoolIcon sx={{ color: '#A0AEC0', mr: 2 }} />
                          <Box>
                            <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                              Education
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'white' }}>
                              {profileData.education}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                          <LinkIcon sx={{ color: '#A0AEC0', mr: 2, mt: 0.5 }} />
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 1 }}>
                              Website
                            </Typography>
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                color: '#1B73E8',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                              }}
                            >
                              {profileData.website}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Social Links */}
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #FFB80015 0%, #FF980005 100%)',
                    border: '1px solid #FFB80030',
                    borderRadius: '12px',
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
                      Social Links
                    </Typography>

                    <Grid container spacing={2}>
                      {Object.entries(profileData.socialLinks).map(([platform, link]) => (
                        <Grid item xs={12} sm={6} key={platform}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              p: 2,
                              backgroundColor: '#0B1426',
                              borderRadius: '8px',
                              border: '1px solid #2D3748',
                            }}
                          >
                            <Typography variant="body2" sx={{ color: '#A0AEC0', mr: 2, minWidth: 80 }}>
                              {platform.charAt(0).toUpperCase() + platform.slice(1)}:
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: '#1B73E8',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                              }}
                            >
                              {link}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Column - Stats and Settings */}
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            {/* Investment Stats */}
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #1B73E815 0%, #4285F405 100%)',
                    border: '1px solid #1B73E830',
                    borderRadius: '12px',
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
                      Investment Stats
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                          Total Invested
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                          ${profileData.stats.totalInvestments.toLocaleString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                          Total Returns
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#00C851', fontWeight: 700 }}>
                          +${profileData.stats.totalReturns.toLocaleString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                          Active Bonds
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                          {profileData.stats.activeBonds}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                          Prediction Accuracy
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#FFB800', fontWeight: 700 }}>
                          {profileData.stats.predictionAccuracy}%
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Preferences */}
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #00C85115 0%, #4CAF5005 100%)',
                    border: '1px solid #00C85130',
                    borderRadius: '12px',
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
                      Preferences
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={profileData.preferences.notifications}
                            onChange={(e) => handleNestedInputChange('preferences', 'notifications', e.target.checked)}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#1B73E8',
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#1B73E8',
                              },
                            }}
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <NotificationsIcon sx={{ color: '#A0AEC0', mr: 1, fontSize: 20 }} />
                            <Typography variant="body2" sx={{ color: 'white' }}>
                              Notifications
                            </Typography>
                          </Box>
                        }
                      />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={profileData.preferences.darkMode}
                            onChange={(e) => handleNestedInputChange('preferences', 'darkMode', e.target.checked)}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#1B73E8',
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#1B73E8',
                              },
                            }}
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <PaletteIcon sx={{ color: '#A0AEC0', mr: 1, fontSize: 20 }} />
                            <Typography variant="body2" sx={{ color: 'white' }}>
                              Dark Mode
                            </Typography>
                          </Box>
                        }
                      />
                    </Box>

                    <Divider sx={{ my: 2, borderColor: '#2D3748' }} />

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 1 }}>
                        Language
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'white' }}>
                        {profileData.preferences.language}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 1 }}>
                        Currency
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'white' }}>
                        {profileData.preferences.currency}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Edit Profile Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={handleCancel}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#1A202C',
            border: '1px solid #2D3748',
          },
        }}
      >
        <DialogTitle sx={{ color: 'white' }}>
          Edit Profile
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full Name"
                  value={tempData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
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
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  value={tempData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
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
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
                  value={tempData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
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
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Location"
                  value={tempData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
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
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Bio"
                  value={tempData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  fullWidth
                  multiline
                  rows={3}
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

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Company"
                  value={tempData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
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
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Education"
                  value={tempData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
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
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Website"
                  value={tempData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
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
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancel}
            startIcon={<CancelIcon />}
            sx={{ color: '#A0AEC0' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            startIcon={<SaveIcon />}
            variant="contained"
            sx={{
              backgroundColor: '#1B73E8',
              '&:hover': { backgroundColor: '#1557B0' },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage;
