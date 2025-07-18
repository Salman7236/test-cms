import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const cardData = [
  {
    title: 'Initiated',
    mainValue: 21,
    mainLabel: 'Complaints',
    mainColor: '#1E88E5',
    trend: 'up'
  },
  {
    title: 'On-Hold',
    mainValue: 17,
    mainLabel: 'Complaints',
    mainColor: '#E53935',
    trend: 'down'
  },
  {
    title: 'In-Progress',
    mainValue: 24,
    mainLabel: 'Complaints',
    mainColor: '#FB8C00',
    trend: 'up'
  },
  {
    title: 'Resolved',
    mainValue: 38,
    mainLabel: 'Complaints',
    mainColor: '#43A047',
    trend: 'up'
  },
];

const CardComponent = ({ title, mainValue, mainLabel, mainColor, trend }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: theme.shadows[6]
        }
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        <IconButton size="small">
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box
        textAlign="center"
        mt={2}
        flexGrow={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography variant="h4" fontWeight="bold" sx={{ color: mainColor }}>
          {mainValue}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: mainColor }}>
          {mainLabel}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: trend === 'up' ? theme.palette.success.main : theme.palette.error.main,
            display: 'block',
            mt: 1
          }}
        >
          {trend === 'up' ? '↑ 5.2% from last week' : '↓ 2.1% from last week'}
        </Typography>
      </Box>
    </Paper>
  );
};

const DashboardData = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const chartData = cardData.map(item => ({
    name: item.title,
    value: item.mainValue,
    color: item.mainColor
  }));

  return (
    <Box
      p={isMobile ? 1 : 3}
      bgcolor="#f5f7fa"
      sx={{
        minHeight: '100vh',
        boxSizing: 'border-box'
      }}
    >
      {/* Cards Section */}
      {/* Charts Section */}
      <Grid
        container
        spacing={isMobile ? 1 : 3}
        justifyContent="center" // ✅ Center grid items
        alignItems="center"
      >
        {/* Pie Chart */}
        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 2,
              width: isMobile ? '100%' : 500, // ✅ Increased fixed width
              height: isMobile ? 320 : 450,   // ✅ Increased height
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                boxShadow: theme.shadows[6]
              }
            }}
          >
            <Typography variant="h6" gutterBottom>
              Complaints Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={isMobile ? 100 : 130} // ✅ Increased radius
                  innerRadius={isMobile ? 60 : 80}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {chartData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  wrapperStyle={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                />
                <ReTooltip
                  formatter={(value, name, props) => [
                    value,
                    `${name}: ${((props.payload.percent || 0) * 100).toFixed(1)}%`
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 2,
              width: isMobile ? '100%' : 600, // ✅ Wider chart
              height: isMobile ? 320 : 450,   // ✅ Taller chart
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                boxShadow: theme.shadows[6]
              }
            }}
          >
            <Typography variant="h6" gutterBottom>
              Complaints Overview
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: isMobile ? 10 : 30,
                  left: 10,
                  bottom: 5
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: isMobile ? 12 : 14 }}
                />
                <YAxis
                  tick={{ fontSize: isMobile ? 12 : 14 }}
                />
                <ReTooltip />
                <Legend
                  wrapperStyle={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                />
                <Bar
                  dataKey="value"
                  name="Complaints"
                  radius={[4, 4, 0, 0]}
                >
                  {chartData.map((entry, idx) => (
                    <Cell key={`cell-bar-${idx}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

    </Box>
  );
};

export default DashboardData;