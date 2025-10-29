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
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface RevenueChartProps {
  data: Array<{
    month: string;
    revenue: number;
  }>;
  title: string;
  change: string;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data, title, change }) => {
  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #1B73E815 0%, #4285F405 100%)',
        border: '1px solid #1B73E830',
        borderRadius: '12px',
        height: '100%',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
            {title}
          </Typography>
          <Chip
            icon={<TrendingUpIcon />}
            label={change}
            size="small"
            sx={{
              backgroundColor: '#00C85120',
              color: '#00C851',
              border: '1px solid #00C85130',
            }}
          />
        </Box>

        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B73E8" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#1B73E8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
              <XAxis 
                dataKey="month" 
                stroke="#A0AEC0"
                fontSize={12}
              />
              <YAxis 
                stroke="#A0AEC0"
                fontSize={12}
                domain={[0, 500]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1A202C',
                  border: '1px solid #2D3748',
                  borderRadius: '8px',
                  color: 'white',
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#1B73E8"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
