import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Divider,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

interface Order {
  id: string;
  amount: string;
  description: string;
  date: string;
  time: string;
  status: 'completed' | 'pending' | 'processing';
}

interface OrdersCardProps {
  orders: Order[];
  title: string;
  change: string;
}

const OrdersCard: React.FC<OrdersCardProps> = ({ orders, title, change }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#00C851';
      case 'pending': return '#FFB800';
      case 'processing': return '#1B73E8';
      default: return '#A0AEC0';
    }
  };

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

        {orders.map((order, index) => (
          <Box key={order.id}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Box>
                <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                  {order.amount}, {order.description}
                </Typography>
                <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                  {order.date} {order.time}
                </Typography>
              </Box>
              <Chip
                label={order.status}
                size="small"
                sx={{
                  backgroundColor: `${getStatusColor(order.status)}20`,
                  color: getStatusColor(order.status),
                  border: `1px solid ${getStatusColor(order.status)}30`,
                  textTransform: 'capitalize',
                }}
              />
            </Box>
            <Typography variant="body2" sx={{ color: '#1B73E8', mb: 2 }}>
              New order #{order.id}
            </Typography>
            
            {index < orders.length - 1 && (
              <Divider sx={{ borderColor: '#2D3748', mb: 2 }} />
            )}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default OrdersCard;
