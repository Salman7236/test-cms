import { Box, Grid, Paper, Typography, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const cardData = [
  {
    title: 'Initiated',
    mainValue: 21,
    mainLabel: 'Complaints',
    mainColor: '#1E88E5', // blue
    // subLabel: 'Completed:',
    // subValue: 13,
  },
  {
    title: 'On-Hold',
    mainValue: 17,
    mainLabel: 'Complaints',
    mainColor: '#E53935', // red
    // subLabel: 'From yesterday:',
    // subValue: 9,
  },
  {
    title: 'In-Progress',
    mainValue: 24,
    mainLabel: 'Complaints',
    mainColor: '#FB8C00', // orange
    // subLabel: 'Closed today:',
    // subValue: 19,
  },
  {
    title: 'Resolved',
    mainValue: 38,
    mainLabel: 'Complaints',
    mainColor: '#43A047', // green
    // subLabel: 'Implemented:',
    // subValue: 16,
  }
];

const CardComponent = ({ title, mainValue, mainLabel, mainColor, subLabel, subValue }) => (
  <Paper
    elevation={3}
    sx={{
      p: 2,
      borderRadius: 2,
      minWidth: 200,
      height: 150,
      position: 'relative',
    }}
  >
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="subtitle2" color="text.secondary" >{title}</Typography>
      <IconButton size="small">
        <MoreVertIcon fontSize="small" />
      </IconButton>
    </Box>

    <Box textAlign="center" mt={2}>
      <Typography variant="h4" fontWeight="bold" sx={{ color: mainColor }}>
        {mainValue}
      </Typography>
      <Typography variant="subtitle1" sx={{ color: mainColor }}>
        {mainLabel}
      </Typography>
    </Box>

    <Box textAlign="center" mt={1}>
      <Typography variant="body2" color="text.secondary">
        {subLabel} <b>{subValue}</b>
      </Typography>
    </Box>
  </Paper>
);

export const DashboardCards = () => {
  return (
    <Box p={2} bgcolor="#f5f7fa" minHeight="100vh">
      <Grid container spacing={2} justifyContent="center">
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <CardComponent {...card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
