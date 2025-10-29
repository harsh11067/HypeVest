import React from 'react';
import { Box, Typography } from '@mui/material';

const TestPage: React.FC = () => {
  return (
    <Box sx={{ p: 4, backgroundColor: '#0B1426', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ color: 'white' }}>
        Test Page - No Profile Pictures
      </Typography>
      <Typography variant="body1" sx={{ color: '#A0AEC0', mt: 2 }}>
        This is a simple test page to verify the server is working.
      </Typography>
    </Box>
  );
};

export default TestPage;

