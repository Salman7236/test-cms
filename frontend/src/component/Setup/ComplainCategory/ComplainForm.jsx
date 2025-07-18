import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
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

const ComplainForm = ({ open, handleClose, initialValues, onSubmit, error }) => {
  const [formData, setFormData] = useState({
    name: ''
  });
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (initialValues) {
      setFormData({
        name: initialValues.name || '',
        status: initialValues.status || 'ACTIVE'
      });
    } else {
      setFormData({
        name: '',
        status: 'ACTIVE'
      });
    }
  }, [initialValues, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setFormError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name) {
      setFormError('Category name is required');
      return;
    }

    onSubmit(formData);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {initialValues?._id ? 'Edit Category' : 'Create New Category'}
        </Typography>

        {(error || formError) && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error || formError}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Category Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
            error={!!formError && !formData.name}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="INACTIVE">Inactive</MenuItem>
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

export default ComplainForm;