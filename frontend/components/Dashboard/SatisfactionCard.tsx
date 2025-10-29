import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import {
  SentimentSatisfied as SentimentSatisfiedIcon,
} from '@mui/icons-material';

interface SatisfactionCardProps {
  rate: number;
  title: string;
  subtitle: string;
}

const SatisfactionCard: React.FC<SatisfactionCardProps> = ({
  rate,
  title,
  subtitle,
}) => {
  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #00C85115 0%, #4CAF5005 100%)',
        border: '1px solid #00C85130',
        borderRadius: '12px',
        height: '100%',
      }}
    >
      <CardContent sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 600 }}>
          {title}
        </Typography>
        
        <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
          <CircularProgress
            variant="determinate"
            value={rate}
            size={120}
            thickness={4}
            sx={{
              color: '#00C851',
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              },
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="h4"
              component="div"
              sx={{ color: 'white', fontWeight: 700 }}
            >
              {rate}%
            </Typography>
            <SentimentSatisfiedIcon
              sx={{
                color: '#00C851',
                fontSize: 24,
                mt: 1,
              }}
            />
          </Box>
        </Box>
        
        <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SatisfactionCard;
