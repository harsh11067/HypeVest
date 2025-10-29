import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Mic as MicIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

interface CreatorProfileCardProps {
  creator: {
    name: string;
    avatar: string;
    subscribers: string;
    revenue: string;
    growth: string;
    category: string;
  };
}

const CreatorProfileCard: React.FC<CreatorProfileCardProps> = ({ creator }) => {
  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #1B73E815 0%, #4285F405 100%)',
        border: '1px solid #1B73E830',
        borderRadius: '12px',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={creator.avatar}
            sx={{
              width: 48,
              height: 48,
              mr: 2,
              border: '2px solid #1B73E8',
            }}
          >
            {creator.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
              {creator.name}
            </Typography>
            <Chip
              label={creator.category}
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
              Subscribers
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
              {creator.subscribers}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
              Monthly Revenue
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
              {creator.revenue}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TrendingUpIcon sx={{ color: '#00C851', mr: 1, fontSize: 16 }} />
            <Typography variant="body2" sx={{ color: '#00C851' }}>
              {creator.growth} growth this month
            </Typography>
          </Box>
        </Box>

        {/* AI Assistant Section */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
            Welcome back, {creator.name}!
          </Typography>
          <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 3 }}>
            Glad to see you again! Ask me anything about your creator performance.
          </Typography>
          
          {/* Jellyfish-like visual element */}
          <Box
            sx={{
              width: '100%',
              height: 120,
              background: 'linear-gradient(135deg, #1B73E820 0%, #4285F410 50%, #00C85110 100%)',
              borderRadius: '12px',
              position: 'relative',
              overflow: 'hidden',
              mb: 2,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #1B73E8 0%, #4285F4 50%, transparent 70%)',
                opacity: 0.6,
                animation: 'pulse 2s infinite',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '20%',
                left: '30%',
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: '#00C851',
                opacity: 0.4,
                animation: 'float 3s infinite',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: '30%',
                right: '25%',
                width: 15,
                height: 15,
                borderRadius: '50%',
                background: '#FFB800',
                opacity: 0.5,
                animation: 'float 2.5s infinite reverse',
              }}
            />
          </Box>

          <Button
            variant="contained"
            startIcon={<MicIcon />}
            sx={{
              backgroundColor: '#1B73E8',
              '&:hover': { backgroundColor: '#1557B0' },
              borderRadius: '8px',
            }}
          >
            Tap to record →
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CreatorProfileCard;
