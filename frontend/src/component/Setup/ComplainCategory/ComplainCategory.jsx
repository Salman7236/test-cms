import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Typography,
  TableContainer,
  Avatar,
  Box,
  Tooltip,
  Container,
  TextField,
  TablePagination,
  CircularProgress,
  Backdrop
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { getCategory, createCategory, updateCategory, deleteCategory } from './Api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import ComplainForm from './ComplainForm';

const ComplainCategory = () => {
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);


  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategory();
      console.log('API Response:', res); // Already present, ensure you check this
      const categoriesData = res.data?.complainCategory || res.data || [];
      console.log('Parsed Categories:', categoriesData); // Add this to verify
      setCategories(categoriesData);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error('Failed to load complaint categories');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [searchTerm, filterStatus]);

  const handleCreate = async (values) => {
    try {
      setError('');
      const categoryData = {
        ...values,
        trsTime: new Date()
      };

      if (values._id) {
        await updateCategory(values._id, categoryData);
        toast.success('Category updated successfully!');
      } else {
        await createCategory(categoryData);
        toast.success('Category created successfully!');
      }

      await fetchCategories();
      setOpenModal(false);
      setEditingCategory(null);
    } catch (err) {
      console.error("Operation failed:", err);
      setError(
        err.response?.status === 409
          ? 'Category already exists.'
          : 'An error occurred. Please try again.'
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      toast.success('Category deleted successfully!');
      await fetchCategories();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error('Failed to delete category');
    }
  };


  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? true;
    const status = category.status?.toLowerCase() ?? 'inactive';
    const matchesStatus = filterStatus === 'all' || status === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const paginatedCategories = filteredCategories.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const themeColors = {
    primary: '#92768f',
    secondary: '#6a1b9a',
    activeStatus: { color: '#2e7d32', bg: '#c8e6c9', border: '#a5d6a7' },
    inactiveStatus: { color: '#c62828', bg: '#ffcdd2', border: '#ef9a9a' },
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        p: 0,
        backgroundColor: '#f5f7fa',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'auto',
          maxWidth: 'calc(100% - 32px)',
          zIndex: 1400
        }}
        toastStyle={{
          borderRadius: '8px',
          padding: '12px 24px',
          margin: '0 auto 8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          fontSize: '14px',
          fontWeight: '500'
        }}
      />

      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: 'absolute'
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>


      {loading && (
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000
        }}>
          <CircularProgress size={60} thickness={4} sx={{ color: '#92768f' }} />
        </Box>
      )}

      <Box
        sx={{
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          p: 3,
          borderRadius: 0,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          zIndex: 1200,
          position: 'sticky',
          top: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: '600', color: themeColors.primary }}>
            Complaint Categories
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(0);
              }}
              sx={{ width: 200 }}
            />
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            borderRadius: 1,
            textTransform: 'none',
            px: 3,
            py: 1,
            backgroundColor: themeColors.primary,
            '&:hover': { backgroundColor: themeColors.primary },
          }}
          onClick={() => {
            setEditingCategory(null);
            setOpenModal(true);
          }}
        >
          Add New Category
        </Button>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          overflow: 'hidden',
        }}
      >
        <Paper
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <TableContainer
            sx={{
              flex: 1,
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                height: '8px',
                width: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: themeColors.primary,
                borderRadius: '4px',
              },
            }}
          >
            <Table stickyHeader aria-label="category table" sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: '600', backgroundColor: themeColors.primary, color: 'white' }}>
                    Category Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: '600', backgroundColor: themeColors.primary, color: 'white' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: 'center', py: 3 }}>
                      <Typography variant="body2" color="textSecondary">
                        'No matching categories found'
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedCategories.map((category, index) => (
                    <TableRow
                      key={category._id}
                      sx={{
                        backgroundColor: index % 2 === 0 ? '#ffffff' : '#f5f5f5',
                        '&:hover': { backgroundColor: '#f3e5f5' },
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <Avatar sx={{ bgcolor: themeColors.secondary, width: 40, height: 40 }}>
                            {category.category?.charAt(0)?.toUpperCase() || 'C'}
                          </Avatar>
                          <Typography sx={{ fontWeight: '500', color: themeColors.secondary }}>
                            {category.category || 'N/A'}
                          </Typography>
                        </Box>
                      </TableCell>
                      {/* <TableCell>
                        <Typography sx={{ color: themeColors.secondary }}>
                          {category.description || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={category.status || 'Unknown'}
                          size="small"
                          sx={{
                            fontWeight: '600',
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            ...(category.status?.toLowerCase() === 'active'
                              ? themeColors.activeStatus
                              : themeColors.inactiveStatus),
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ color: themeColors.secondary }}>
                          {category.trsTime && dayjs(category.trsTime).isValid()
                            ? dayjs(category.trsTime).format('DD/MM/YYYY HH:mm')
                            : 'N/A'}
                        </Typography>
                      </TableCell> */}
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: '8px' }}>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => handleEdit(category)}
                              sx={{
                                color: themeColors.secondary,
                                '&:hover': { backgroundColor: 'rgba(106, 27, 154, 0.1)' },
                              }}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => handleDelete(category._id)}
                              sx={{
                                color: '#d32f2f',
                                '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.1)' },
                              }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredCategories.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
            sx={{
              borderTop: '1px solid #e0e0e0',
              '& .MuiTablePagination-toolbar': { padding: 2 },
              '& .MuiTablePagination-actions button': { color: themeColors.secondary },
            }}
          />
        </Paper>
      </Box>

      {/* You'll need to create a CategoryModalForm component similar to OfficeModalForm */}
      <ComplainForm
        open={openModal}
        handleClose={() => {
          setOpenModal(false);
          setError('');
        }}
        initialValues={
          editingCategory || {
            name: '',
            status: 'ACTIVE'
          }
        }
        onSubmit={handleCreate}
        error={error}
      />
    </Container>
  );
};

export default ComplainCategory;