import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  Download as DownloadIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CreditCard as CreditCardIcon,
  AccountBalance as BankIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
  Receipt as ReceiptIcon,
  Payment as PaymentIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../components/Context/AuthContext';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'completed' | 'pending' | 'failed';
  category: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  brand?: string;
  bankName?: string;
  isDefault: boolean;
  expiryDate?: string;
}

interface BillingStats {
  totalSpent: number;
  monthlySpent: number;
  activeSubscriptions: number;
  upcomingPayments: number;
}

const BillingPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [addPaymentDialogOpen, setAddPaymentDialogOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-01-20',
      description: 'Creator Bond Purchase - Mark Johnson',
      amount: 1250.00,
      type: 'debit',
      status: 'completed',
      category: 'Investment',
    },
    {
      id: '2',
      date: '2024-01-18',
      description: 'Prediction Market Bet - Sarah Chen',
      amount: 500.00,
      type: 'debit',
      status: 'completed',
      category: 'Prediction',
    },
    {
      id: '3',
      date: '2024-01-15',
      description: 'Revenue Share Payout',
      amount: 320.50,
      type: 'credit',
      status: 'completed',
      category: 'Revenue',
    },
    {
      id: '4',
      date: '2024-01-12',
      description: 'Creator Bond Purchase - Alex Rodriguez',
      amount: 850.00,
      type: 'debit',
      status: 'pending',
      category: 'Investment',
    },
    {
      id: '5',
      date: '2024-01-10',
      description: 'Platform Fee',
      amount: 25.00,
      type: 'debit',
      status: 'completed',
      category: 'Fee',
    },
  ]);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      isDefault: true,
      expiryDate: '12/26',
    },
    {
      id: '2',
      type: 'bank',
      last4: '1234',
      bankName: 'Chase Bank',
      isDefault: false,
    },
  ]);

  const [billingStats] = useState<BillingStats>({
    totalSpent: 125000,
    monthlySpent: 12500,
    activeSubscriptions: 3,
    upcomingPayments: 2500,
  });

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPeriod = selectedPeriod === 'all' || 
                         (selectedPeriod === 'month' && new Date(transaction.date).getMonth() === new Date().getMonth()) ||
                         (selectedPeriod === 'year' && new Date(transaction.date).getFullYear() === new Date().getFullYear());
    return matchesSearch && matchesPeriod;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#00C851';
      case 'pending':
        return '#FFB800';
      case 'failed':
        return '#FF3D71';
      default:
        return '#A0AEC0';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'credit' ? '#00C851' : '#FF3D71';
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
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: 'white', mb: 1, fontWeight: 700 }}>
          Billing & Payments
        </Typography>
        <Typography variant="body1" sx={{ color: '#A0AEC0', mb: 3 }}>
          Manage your payment methods and view transaction history
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card
              sx={{
                background: 'linear-gradient(135deg, #1B73E815 0%, #4285F405 100%)',
                border: '1px solid #1B73E830',
                borderRadius: '12px',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      backgroundColor: '#1B73E820',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#1B73E8',
                      mr: 2,
                    }}
                  >
                    <MoneyIcon />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                      ${billingStats.totalSpent.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                      Total Spent
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card
              sx={{
                background: 'linear-gradient(135deg, #00C85115 0%, #4CAF5005 100%)',
                border: '1px solid #00C85130',
                borderRadius: '12px',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      backgroundColor: '#00C85120',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#00C851',
                      mr: 2,
                    }}
                  >
                    <TrendingUpIcon />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                      ${billingStats.monthlySpent.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                      This Month
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card
              sx={{
                background: 'linear-gradient(135deg, #FFB80015 0%, #FF980005 100%)',
                border: '1px solid #FFB80030',
                borderRadius: '12px',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      backgroundColor: '#FFB80020',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFB800',
                      mr: 2,
                    }}
                  >
                    <ReceiptIcon />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                      {billingStats.activeSubscriptions}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                      Active Subscriptions
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card
              sx={{
                background: 'linear-gradient(135deg, #FF3D7115 0%, #E91E6305 100%)',
                border: '1px solid #FF3D7130',
                borderRadius: '12px',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      backgroundColor: '#FF3D7120',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FF3D71',
                      mr: 2,
                    }}
                  >
                    <PaymentIcon />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                      ${billingStats.upcomingPayments.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                      Upcoming Payments
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Payment Methods */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card
              sx={{
                background: 'linear-gradient(135deg, #1B73E815 0%, #4285F405 100%)',
                border: '1px solid #1B73E830',
                borderRadius: '12px',
                mb: 3,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    Payment Methods
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setAddPaymentDialogOpen(true)}
                    size="small"
                    sx={{
                      backgroundColor: '#1B73E8',
                      '&:hover': { backgroundColor: '#1557B0' },
                    }}
                  >
                    Add
                  </Button>
                </Box>

                <List>
                  {paymentMethods.map((method, index) => (
                    <ListItem
                      key={method.id}
                      sx={{
                        backgroundColor: '#0B1426',
                        borderRadius: '8px',
                        mb: 1,
                        border: '1px solid #2D3748',
                      }}
                    >
                      <ListItemIcon>
                        {method.type === 'card' ? (
                          <CreditCardIcon sx={{ color: '#1B73E8' }} />
                        ) : (
                          <BankIcon sx={{ color: '#00C851' }} />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body1" sx={{ color: 'white' }}>
                              {method.type === 'card' 
                                ? `${method.brand} •••• ${method.last4}`
                                : `${method.bankName} •••• ${method.last4}`
                              }
                            </Typography>
                            {method.isDefault && (
                              <Chip
                                label="Default"
                                size="small"
                                sx={{
                                  backgroundColor: '#00C85120',
                                  color: '#00C851',
                                  border: '1px solid #00C85130',
                                }}
                              />
                            )}
                          </Box>
                        }
                        secondary={
                          method.type === 'card' && method.expiryDate ? (
                            <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                              Expires {method.expiryDate}
                            </Typography>
                          ) : null
                        }
                      />
                      <Box>
                        <IconButton size="small" sx={{ color: '#A0AEC0', mr: 1 }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#FF3D71' }}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Transaction History */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
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
                    Transaction History
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    size="small"
                    sx={{
                      borderColor: '#00C851',
                      color: '#00C851',
                      '&:hover': {
                        borderColor: '#00C851',
                        backgroundColor: '#00C85120',
                      },
                    }}
                  >
                    Export
                  </Button>
                </Box>

                {/* Search and Filter */}
                <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                  <TextField
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size="small"
                    sx={{
                      minWidth: 250,
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#0B1426',
                        borderRadius: '8px',
                        '& fieldset': { borderColor: '#2D3748' },
                        '&:hover fieldset': { borderColor: '#1B73E8' },
                        '&.Mui-focused fieldset': { borderColor: '#1B73E8' },
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                        '&::placeholder': { color: '#A0AEC0', opacity: 1 },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: '#A0AEC0' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <TextField
                    select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    size="small"
                    sx={{
                      minWidth: 120,
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#0B1426',
                        borderRadius: '8px',
                        '& fieldset': { borderColor: '#2D3748' },
                        '&:hover fieldset': { borderColor: '#1B73E8' },
                        '&.Mui-focused fieldset': { borderColor: '#1B73E8' },
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                    }}
                  >
                    <option value="all">All Time</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                  </TextField>
                </Box>

                {/* Transactions Table */}
                <TableContainer
                  component={Paper}
                  sx={{
                    backgroundColor: '#0B1426',
                    border: '1px solid #2D3748',
                    borderRadius: '8px',
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: '#A0AEC0', fontWeight: 600, borderColor: '#2D3748' }}>
                          Date
                        </TableCell>
                        <TableCell sx={{ color: '#A0AEC0', fontWeight: 600, borderColor: '#2D3748' }}>
                          Description
                        </TableCell>
                        <TableCell sx={{ color: '#A0AEC0', fontWeight: 600, borderColor: '#2D3748' }}>
                          Category
                        </TableCell>
                        <TableCell sx={{ color: '#A0AEC0', fontWeight: 600, borderColor: '#2D3748' }}>
                          Status
                        </TableCell>
                        <TableCell sx={{ color: '#A0AEC0', fontWeight: 600, borderColor: '#2D3748', textAlign: 'right' }}>
                          Amount
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id} hover>
                          <TableCell sx={{ color: 'white', borderColor: '#2D3748' }}>
                            {new Date(transaction.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell sx={{ color: 'white', borderColor: '#2D3748' }}>
                            {transaction.description}
                          </TableCell>
                          <TableCell sx={{ borderColor: '#2D3748' }}>
                            <Chip
                              label={transaction.category}
                              size="small"
                              sx={{
                                backgroundColor: '#1B73E820',
                                color: '#1B73E8',
                                border: '1px solid #1B73E830',
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ borderColor: '#2D3748' }}>
                            <Chip
                              label={transaction.status}
                              size="small"
                              sx={{
                                backgroundColor: `${getStatusColor(transaction.status)}20`,
                                color: getStatusColor(transaction.status),
                                border: `1px solid ${getStatusColor(transaction.status)}30`,
                              }}
                            />
                          </TableCell>
                          <TableCell 
                            sx={{ 
                              color: getTypeColor(transaction.type),
                              fontWeight: 600,
                              borderColor: '#2D3748',
                              textAlign: 'right'
                            }}
                          >
                            {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Add Payment Method Dialog */}
      <Dialog
        open={addPaymentDialogOpen}
        onClose={() => setAddPaymentDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#1A202C',
            border: '1px solid #2D3748',
          },
        }}
      >
        <DialogTitle sx={{ color: 'white' }}>
          Add Payment Method
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Alert severity="info" sx={{ backgroundColor: '#1B73E820', color: '#1B73E8', mb: 3 }}>
              Payment method integration will be implemented with a payment processor like Stripe.
            </Alert>
            
            <TextField
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              fullWidth
              sx={{ mb: 2 }}
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
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                label="Expiry Date"
                placeholder="MM/YY"
                sx={{ flex: 1 }}
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
              <TextField
                label="CVC"
                placeholder="123"
                sx={{ flex: 1 }}
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
            </Box>
            
            <TextField
              label="Cardholder Name"
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setAddPaymentDialogOpen(false)}
            sx={{ color: '#A0AEC0' }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => setAddPaymentDialogOpen(false)}
            variant="contained"
            sx={{
              backgroundColor: '#1B73E8',
              '&:hover': { backgroundColor: '#1557B0' },
            }}
          >
            Add Payment Method
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BillingPage;