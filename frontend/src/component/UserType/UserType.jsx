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
  TablePagination
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { getUserType, createUserType, updateUserType, deleteUserType } from './Api';
import UserTypeForm from './UserTypeForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserType = () => {
  const [userTypes, setUserTypes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingUserType, setEditingUserType] = useState(null);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchUserTypes = async () => {
    try {
      const res = await getUserType();
      const userTypesArray = res.data.userType;
      setUserTypes(userTypesArray);
    } catch (error) {
      console.error("Failed to fetch user types:", error);
      toast.error('Failed to load user types');
      setUserTypes([]);
    }
  };

  useEffect(() => {
    fetchUserTypes();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [searchTerm]);

  const handleCreate = async (values) => {
    try {
      setError('');

       const payload = {
      ...values,
      userType: values.userType.toLowerCase()
    };
      if (values._id) {
        await updateUserType(values._id, payload);
        toast.success('User type updated successfully!');
      } else {
        await createUserType(payload);
        toast.success('User type created successfully!');
      }
      fetchUserTypes();
      setOpenModal(false);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError('User type already exists.');
      } else {
        setError('An error occurred. Please try again.');
        console.error("Operation failed:", err);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUserType(id);
      toast.success('User type deleted successfully!');
      fetchUserTypes();
    } catch (error) {
      toast.error('Failed to delete user type');
    }
  }

  const filteredUserTypes = userTypes.filter(type => {
    const typeName = type.userType || '';
    return typeName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const paginatedUserTypes = filteredUserTypes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
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
        overflow: 'hidden'
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
          top: 0
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Typography variant="h4" sx={{
            fontWeight: '600',
            color: '#92768f' 
          }}>
            User Type Management
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search user types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            backgroundColor: '#92768f',
            '&:hover': {
              backgroundColor: '#92768f'
            }
          }}
          onClick={() => {
            setEditingUserType(null);
            setOpenModal(true);
          }}
        >
          Add New User Type
        </Button>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          overflow: 'hidden'
        }}
      >
        <Paper
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
        >
          <TableContainer
            sx={{
              flex: 1,
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                height: '8px',
                width: '8px'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#c5cae9',
                borderRadius: '4px'
              }
            }}
          >
            <Table
              stickyHeader
              aria-label="user type table"
              sx={{
                minWidth: 600
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: '600', backgroundColor: '#92768f', color: 'white' }}>User Type</TableCell>
                  <TableCell sx={{ fontWeight: '600', backgroundColor: '#92768f', color: 'white' }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedUserTypes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} sx={{ textAlign: 'center', py: 3 }}>
                      <Typography variant="body2" color="textSecondary">
                        {userTypes.length === 0 ? 'No user types found' : 'No matching user types found'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedUserTypes.map((type, index) => (
                    <TableRow
                      key={type._id}
                      sx={{
                        '&:nth-of-type(even)': { backgroundColor: '#f8f9fa' },
                        '&:hover': { backgroundColor: '#e8eaf6' }
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <Avatar sx={{ bgcolor: '#3949ab', width: 40, height: 40 }}>
                            {type.userType?.charAt(0)?.toUpperCase() || 'U'}
                          </Avatar>
                          <Typography sx={{ fontWeight: '500', color: '#3949ab' }}>
                            {type.userType}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box sx={{ display: 'flex', gap: '8px' }}>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => {
                                setEditingUserType({
                                  _id: type._id,
                                  userType: type.userType
                                });
                                setOpenModal(true);
                              }}
                              sx={{ 
                                color: '#3949ab',
                                '&:hover': { 
                                  backgroundColor: 'rgba(57, 73, 171, 0.1)' 
                                } 
                              }}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => handleDelete(type._id)}
                              sx={{ 
                                color: '#d32f2f',
                                '&:hover': { 
                                  backgroundColor: 'rgba(211, 47, 47, 0.1)' 
                                } 
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
            count={filteredUserTypes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
            sx={{
              borderTop: '1px solid #e0e0e0',
              '& .MuiTablePagination-toolbar': {
                padding: 2,
              },
              '& .MuiTablePagination-actions button': {
                color: '#3949ab'
              }
            }}
          />
        </Paper>
      </Box>

      <UserTypeForm
        open={openModal}
        handleClose={() => {
          setOpenModal(false);
          setError('');
        }}
        initialValues={editingUserType || {
          userType: ''
        }}
        onSubmit={handleCreate}
        error={error}
      />
    </Container>
  );
};

export default UserType;