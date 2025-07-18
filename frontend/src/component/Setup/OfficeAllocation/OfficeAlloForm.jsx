import React, { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert
} from '@mui/material';
import dayjs from 'dayjs';
import 'react-toastify/dist/ReactToastify.css';

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

const OfficeAlloForm = ({ open, handleClose, initialValues, onSubmit, error, offices, companies }) => {
  const [formData, setFormData] = useState({
    officeId: '',
    deptId: '',
    fromDate: dayjs().format('YYYY-MM-DD'),
    toDate: dayjs().add(1, 'year').format('YYYY-MM-DD')
  });
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    console.log('Initial Values:', initialValues); // Debug initialValues
    console.log('Offices:', offices); // Debug offices
    console.log('Companies:', companies); // Debug companies
    if (initialValues) {
      setFormData({
        officeId: initialValues.officeId || '',
        deptId: initialValues.deptId || '',
        fromDate: initialValues.fromDate ? dayjs(initialValues.fromDate).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
        toDate: initialValues.toDate ? dayjs(initialValues.toDate).format('YYYY-MM-DD') : dayjs().add(1, 'year').format('YYYY-MM-DD')
      });
    } else {
      setFormData({
        officeId: '',
        deptId: '',
        fromDate: dayjs().format('YYYY-MM-DD'),
        toDate: dayjs().add(1, 'year').format('YYYY-MM-DD')
      });
    }
    setFormError(null);
  }, [initialValues, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.officeId) {
      setFormError('Office is required');
      return;
    }

    if (!formData.deptId) {
      setFormError('Company is required');
      return;
    }

    if (dayjs(formData.toDate).isBefore(dayjs(formData.fromDate))) {
      setFormError('End date must be after start date');
      return;
    }

    try {
      await onSubmit({
        ...formData,
        fromDate: new Date(formData.fromDate),
        toDate: new Date(formData.toDate)
      });
    } catch (err) {
      console.error("Form submission error:", err);
      setFormError(err.response?.data?.message || 'An error occurred during submission');
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {initialValues?._id ? 'Edit Office Allocation' : 'Create Office Allocation'}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {formError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formError}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal" required error={!!formError && formError.includes('Office')}>
            <InputLabel>Office *</InputLabel>
            <Select
              name="officeId"
              value={formData.officeId}
              label="Office"
              onChange={handleChange}
            >
              <MenuItem value="">Select Office</MenuItem>
              {offices && offices.length > 0 ? (
                offices.map(office => (
                  <MenuItem key={office._id} value={office._id}>
                    {office.officeNo || 'Unknown Office'}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No offices available</MenuItem>
              )}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" required error={!!formError && formError.includes('Company')}>
            <InputLabel>Company *</InputLabel>
            <Select
              name="deptId"
              value={formData.deptId}
              label="Company"
              onChange={handleChange}
            >
              <MenuItem value="">Select Company</MenuItem>
              {companies && companies.length > 0 ? (
                companies.map(company => (
                  <MenuItem key={company._id} value={company._id}>
                    {company.companyName || 'Unknown Company'}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No companies available</MenuItem>
              )}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" required>
            <InputLabel shrink>Start Date *</InputLabel>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              style={{ padding: '10px', marginTop: '16px', width: '100%', fontSize: '16px' }}
              required
            />
          </FormControl>

          <FormControl fullWidth margin="normal" required>
            <InputLabel shrink>End Date *</InputLabel>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              min={dayjs(formData.fromDate).add(1, 'day').format('YYYY-MM-DD')}
              style={{ padding: '10px', marginTop: '16px', width: '100%', fontSize: '16px' }}
              required
            />
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

export default OfficeAlloForm;