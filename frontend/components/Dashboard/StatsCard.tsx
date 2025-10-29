import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ReactNode;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon,
  color,
}) => {
  return (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
        border: `1px solid ${color}30`,
        borderRadius: '12px',
        height: '100%',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '12px',
              backgroundColor: `${color}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: color,
            }}
          >
            {icon}
          </Box>
          <Chip
            icon={changeType === 'positive' ? <TrendingUpIcon /> : <TrendingDownIcon />}
            label={change}
            size="small"
            sx={{
              backgroundColor: changeType === 'positive' ? '#00C85120' : '#FF3D7120',
              color: changeType === 'positive' ? '#00C851' : '#FF3D71',
              border: `1px solid ${changeType === 'positive' ? '#00C851' : '#FF3D71'}30`,
            }}
          />
        </Box>
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
          {value}
        </Typography>
        <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
