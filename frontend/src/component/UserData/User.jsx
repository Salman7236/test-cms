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
  Chip,
  Box,
  Tooltip,
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination,
  CircularProgress,
  Backdrop
} from '@mui/material';
import { Edit, Delete, Add, Lock, Call, Visibility, VisibilityOff } from '@mui/icons-material';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import { getUsers, createUser, updateUser, deleteUser } from './Api';
import UserFormModal from './UserFormModal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const User = () => {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState('');
  const [showPasswords, setShowPasswords] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      const usersArray = res.data.users;
      setUsers(usersArray);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [searchTerm, filterStatus]);

  const handleCreate = async (values) => {
    try {
      setError('');
      if (values._id) {
        await updateUser(values._id, values);
        toast.success('User updated successfully!');
      } else {
        await createUser(values);
        toast.success('User created successfully!');
      }
      fetchUsers();
      setOpenModal(false);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError('Username already exists. Please choose a different username.');
      } else {
        setError('An error occurred. Please try again.');
        console.error("Operation failed:", err);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      toast.success('User deleted successfully!');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const togglePasswordVisibility = (userId) => {
    setShowPasswords(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.userName?.toLowerCase().includes(searchTerm.toLowerCase());
    const status = user.userStatus?.toLowerCase() || 'inactive';
    const matchesStatus = filterStatus === 'all' || status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const paginatedUsers = filteredUsers.slice(
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
          top: 0
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Typography variant="h4" sx={{
            fontWeight: '600',
            color: '#92768f'
          }}>
            User Management
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 200 }}
            />
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
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
            backgroundColor: '#1a237e',
            '&:hover': {
              backgroundColor: '#303f9f'
            }
          }}
          onClick={() => {
            setEditingUser(null);
            setOpenModal(true);
          }}
        >
          Add New User
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
              aria-label="user table"
              sx={{
                minWidth: 800
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: '600', backgroundColor: '#92768f', color: 'white' }}>UserName</TableCell>
                  <TableCell sx={{ fontWeight: '600', backgroundColor: '#92768f', color: 'white' }}>Password</TableCell>
                  <TableCell sx={{ fontWeight: '600', backgroundColor: '#92768f', color: 'white' }}>Extension</TableCell>
                  <TableCell sx={{ fontWeight: '600', backgroundColor: '#92768f', color: 'white' }}>Phone</TableCell>
                  <TableCell sx={{ fontWeight: '600', backgroundColor: '#92768f', color: 'white' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: '600', backgroundColor: '#92768f', color: 'white' }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ textAlign: 'center', py: 3 }}>
                      <Typography variant="body2" color="textSecondary">
                        No users found matching the criteria.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedUsers.map(user => (
                    <TableRow
                      key={user._id}
                      sx={{
                        '&:nth-of-type(even)': { backgroundColor: '#f8f9fa' },
                        '&:hover': { backgroundColor: '#e8eaf6' }
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <Avatar sx={{ bgcolor: '#3949ab', width: 40, height: 40 }}>
                            {user.userName.charAt(0).toUpperCase()}
                          </Avatar>
                          <Typography sx={{ fontWeight: '500', color: '#1a237e' }}>
                            {user.userName}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Tooltip title={showPasswords[user._id] ? "Hide password" : "Show password"}>
                            <IconButton
                              onClick={() => togglePasswordVisibility(user._id)}
                              size="small"
                              sx={{ color: '#5c6bc0', '&:hover': { backgroundColor: 'rgba(92, 107, 192, 0.1)' } }}
                            >
                              {showPasswords[user._id] ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                            </IconButton>
                          </Tooltip>
                          {showPasswords[user._id] ? (
                            <Typography sx={{ fontFamily: 'monospace', color: '#1a237e' }}>
                              {user.userPwd}
                            </Typography>
                          ) : (
                            <Chip
                              icon={<Lock sx={{ fontSize: '1rem', color: '#5c6bc0' }} />}
                              label="••••••••"
                              variant="outlined"
                              size="small"
                              sx={{ borderColor: '#c5cae9', backgroundColor: '#e8eaf6' }}
                            />
                          )}
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Chip
                          icon={<LocalPoliceIcon sx={{ fontSize: '1rem', color: '#1a237e' }} />}
                          label={user.userExt}
                          size="small"
                          sx={{ borderColor: '#c5cae9', backgroundColor: '#e8eaf6', color: '#1a237e' }}
                        />
                      </TableCell>

                      <TableCell>
                        <Chip
                          icon={<Call sx={{ fontSize: '1rem', color: '#1a237e' }} />}
                          label={user.userCell || 'N/A'}
                          size="small"
                          sx={{ borderColor: '#c5cae9', backgroundColor: '#e8eaf6', color: '#1a237e' }}
                        />
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={user.userStatus || 'Unknown'}
                          size="small"
                          sx={{
                            fontWeight: '600',
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            ...(user.userStatus?.toLowerCase() === 'active' ? {
                              color: '#2e7d32',
                              backgroundColor: '#c8e6c9',
                              borderColor: '#a5d6a7'
                            } : {
                              color: '#c62828',
                              backgroundColor: '#ffcdd2',
                              borderColor: '#ef9a9a'
                            })
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Box sx={{ display: 'flex', gap: '8px' }}>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => {
                                setEditingUser({
                                  _id: user._id,
                                  userName: user.userName,
                                  userPwd: user.userPwd,
                                  userExt: user.userExt,
                                  userCell: user.userCell,
                                  userStatus: user.userStatus
                                });
                                setOpenModal(true);
                              }}
                              sx={{ color: '#3949ab', '&:hover': { backgroundColor: 'rgba(57, 73, 171, 0.1)' } }}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => handleDelete(user._id)}
                              sx={{ color: '#d32f2f', '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.1)' } }}
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
            count={filteredUsers.length}
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
              }
            }}
          />
        </Paper>
      </Box>

      <UserFormModal
        open={openModal}
        handleClose={() => {
          setOpenModal(false);
          setError('');
        }}
        initialValues={editingUser || {
          userName: '',
          userPwd: '',
          userExt: '',
          userCell: '',
          userStatus: 'Active'
        }}
        onSubmit={handleCreate}
        error={error}
      />
    </Container>
  );
};

export default User;