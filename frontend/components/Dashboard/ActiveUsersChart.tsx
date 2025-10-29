import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Grid,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Rocket as RocketIcon,
  ShoppingCart as ShoppingCartIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ActiveUsersChartProps {
  data: Array<{
    week: string;
    users: number;
  }>;
  title: string;
  change: string;
  stats: {
    users: string;
    clicks: string;
    sales: string;
    items: string;
  };
}

const ActiveUsersChart: React.FC<ActiveUsersChartProps> = ({ 
  data, 
  title, 
  change, 
  stats 
}) => {
  const statItems = [
    { label: 'Users', value: stats.users, icon: <PeopleIcon />, color: '#1B73E8' },
    { label: 'Clicks', value: stats.clicks, icon: <RocketIcon />, color: '#00C851' },
    { label: 'Sales', value: stats.sales, icon: <ShoppingCartIcon />, color: '#FFB800' },
    { label: 'Items', value: stats.items, icon: <DescriptionIcon />, color: '#FF3D71' },
  ];

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #00C85115 0%, #4CAF5005 100%)',
        border: '1px solid #00C85130',
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

        <Box sx={{ height: 200, mb: 3 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
              <XAxis 
                dataKey="week" 
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
              <Bar 
                dataKey="users" 
                fill="#00C851"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Grid container spacing={2}>
          {statItems.map((item, index) => (
            <Grid item xs={6} key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    backgroundColor: `${item.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.color,
                    mr: 2,
                  }}
                >
                  {item.icon}
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                    {item.label}
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ActiveUsersChart;
