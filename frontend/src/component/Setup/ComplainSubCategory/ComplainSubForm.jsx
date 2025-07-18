import React, { useState, useEffect } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, Button, CircularProgress, Typography 
} from '@mui/material';
import { createSubCategory, updateSubCategory } from './api'; // Adjust path as needed

const ComplainSubForm = ({ categoryId, subCategory, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (subCategory) {
      setFormData({
        name: subCategory.name || '',
        description: subCategory.description || ''
      });
    }
  }, [subCategory]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (subCategory) {
        await updateSubCategory(categoryId, subCategory._id, formData);
      } else {
        await createSubCategory(categoryId, formData);
      }
      onClose();
    } catch (err) {
      setError('Failed to save subcategory');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {subCategory ? 'Edit Subcategory' : 'Add New Subcategory'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ComplainSubForm;