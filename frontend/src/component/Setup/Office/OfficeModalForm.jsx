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
import { getCompany } from '../Company/Api';

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

const OfficeModalForm = ({ open, handleClose, initialValues, onSubmit, error }) => {
  const [formData, setFormData] = useState({
    officeNo: '',
    floorNo: '1',
    officeStatus: 'ACTIVE',
    companyId: ''
  });
  const [formError, setFormError] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setFormData({
        officeNo: initialValues.officeNo || '',
        floorNo: initialValues.floorNo || 'First Floor',
        officeStatus: initialValues.officeStatus || 'ACTIVE',
        companyId: initialValues.companyId || ''
      });
    } else {
      setFormData({
        officeNo: '',
        floorNo: 'First Floor',
        officeStatus: 'ACTIVE',
        companyId: ''
      });
    }
  }, [initialValues, open]);

  const fetchCompanies = async () => {
    setLoadingCompanies(true);
    try {
      const response = await getCompany();
      setCompanies(response.data.companies || response.data || []);
    } catch (error) {
      console.error('Error fetching companies:', error);
      setFormError('Failed to load companies');
    } finally {
      setLoadingCompanies(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchCompanies();
    }
  }, [open]);

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

    
    if (!formData.officeNo) {
      setFormError('Office number is required');
      return;
    }

    if (!formData.companyId) {
      setFormError('Please select a company');
      return;
    }

    onSubmit(formData);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {initialValues?._id ? 'Edit Office' : 'Create New Office'}
        </Typography>

        {(error || formError) && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error || formError}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>

          <TextField
            fullWidth
            label="Office Number"
            name="officeNo"
            value={formData.officeNo}
            onChange={handleChange}
            margin="normal"
            required
            error={!!formError && !formData.officeNo}
          />

          {/* <TextField
            fullWidth
            label="Floor Number"
            name="floorNo"
            value={formData.floorNo}
            onChange={handleChange}
            margin="normal"
          /> */}

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Floor No</InputLabel>
            <Select
              name="floorNo" 
              value={formData.floorNo}
              label="Floor Number"
              onChange={handleChange}
            >
              <MenuItem value="First Floor">First Floor</MenuItem>
              <MenuItem value="Second Floor">Second Floor</MenuItem>
              <MenuItem value="Third Floor">Third Floor</MenuItem>
              <MenuItem value="Fourth Floor">Fourth Floor</MenuItem>
              <MenuItem value="Fixth Floor">Fixth Floor</MenuItem>
              <MenuItem value="Ground Floor">Ground Floor</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            margin="normal"
            required
            error={!!formError && !formData.companyId}
          >
            <InputLabel id="company-label">Company</InputLabel>
            <Select
              labelId="company-label"
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              label="Company *"
              required
              disabled={loadingCompanies}
            >
              {loadingCompanies ? (
                <MenuItem disabled>Loading companies...</MenuItem>
              ) : (
                companies.map(company => (
                  <MenuItem key={company._id} value={company._id}>
                    {company.companyName} ({company.companyAbbr || 'N/A'})
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Office Status</InputLabel>
            <Select
              name="officeStatus"
              value={formData.officeStatus}
              label="Office Status"
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

export default OfficeModalForm;
