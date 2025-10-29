import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  LinearProgress,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

interface ReferralCardProps {
  invited: number;
  bonus: number;
  safetyScore: number;
}

const ReferralCard: React.FC<ReferralCardProps> = ({
  invited,
  bonus,
  safetyScore,
}) => {
  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #FFB80015 0%, #FF980005 100%)',
        border: '1px solid #FFB80030',
        borderRadius: '12px',
        height: '100%',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
            Referral Tracking
          </Typography>
          <IconButton sx={{ color: '#A0AEC0' }}>
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
              Invited {invited} people
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
              Bonus {bonus.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ flexGrow: 1, mr: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <SecurityIcon sx={{ color: '#00C851', mr: 1, fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                Safety Score
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={safetyScore * 10}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: '#2D3748',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#00C851',
                  borderRadius: 4,
                },
              }}
            />
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              sx={{
                color: '#00C851',
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              {safetyScore}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#A0AEC0',
                fontSize: '0.75rem',
              }}
            >
              Total Score
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReferralCard;
