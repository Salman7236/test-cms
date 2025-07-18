import React from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

const CompanyFormModal = ({ open, handleClose, initialValues, onSubmit, error }) => {
  const [values, setValues] = React.useState(initialValues);

  React.useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {values._id ? 'Edit Company' : 'Create New Company'}
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Company Name"
            name="companyName"
            value={values.companyName || ''}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Abbreviation"
            name="companyAbbr"
            value={values.companyAbbr || ''}
            onChange={handleChange}
            margin="normal"
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Status</InputLabel>
            <Select
              name="companyStatus"
              value={values.companyStatus || 'Active'}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={handleClose}
              sx={{
                mr: 2,
                color: '#3949ab',
                borderColor: '#3949ab',
                '&:hover': {
                  backgroundColor: 'rgba(57, 73, 171, 0.04)'
                }
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#3949ab',
                '&:hover': {
                  backgroundColor: '#303f9f'
                }
              }}
            >
              {initialValues?._id ? 'Update' : 'Create'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default CompanyFormModal;