import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, CircularProgress, Typography, Box 
} from '@mui/material';
import { getSubCategories, deleteSubCategory } from './api'; 
import ComplainSubForm from '../ComplainSubCategory/ComplainSubForm';

const ComplainSubCategory = ({ categoryId }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const fetchSubCategories = async () => {
    try {
      setLoading(true);
      const response = await getSubCategories(categoryId);
      setSubCategories(response.data);
    } catch (err) {
      setError('Failed to fetch subcategories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, [categoryId]);

  const handleDelete = async (subCategoryId) => {
    if (window.confirm('Are you sure you want to delete this subcategory?')) {
      try {
        await deleteSubCategory(categoryId, subCategoryId);
        fetchSubCategories();
      } catch (err) {
        setError('Failed to delete subcategory');
      }
    }
  };

  const handleEdit = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setOpenForm(true);
  };

  const handleFormClose = () => {
    setOpenForm(false);
    setSelectedSubCategory(null);
    fetchSubCategories();
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Subcategories Report
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => setOpenForm(true)} 
        sx={{ mb: 2 }}
      >
        Add New Subcategory
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subCategories.map((subCategory) => (
              <TableRow key={subCategory._id}>
                <TableCell>{subCategory.name}</TableCell>
                <TableCell>{subCategory.description || 'N/A'}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    onClick={() => handleEdit(subCategory)} 
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    onClick={() => handleDelete(subCategory._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openForm && (
        <ComplainSubForm 
          categoryId={categoryId}
          subCategory={selectedSubCategory}
          onClose={handleFormClose}
        />
      )}
    </Box>
  );
};

export default ComplainSubCategory;