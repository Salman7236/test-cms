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
import { Edit, Delete, Add } from '@mui/icons-material';
import { getOffices, createOffice, updateOffice, deleteOffice } from './Api';
import { createCompany } from '../Company/Api';
import OfficeModaForm from './OfficeModalForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';

const Office = () => {
  const [offices, setOffices] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingOffice, setEditingOffice] = useState(null);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);


  // Proper async function declaration
  const fetchOffices = async () => {
    try {
      setLoading(true);
      const res = await getOffices();
      // Handle both possible response structures
      const officesData = res.data?.office || res.data?.offices || [];
      setOffices(officesData);
    } catch (error) {
      console.error("Failed to fetch offices:", error);
      toast.error('Failed to load offices');
      setOffices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffices();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [searchTerm, filterStatus]);

  const handleCreate = async (values) => {
    try {
      setError('');
      const officeData = {
      officeNo: values.officeNo,
      floorNo: values.floorNo,
      officeStatus: values.officeStatus,
      companyId: values.companyId,
      trsTime: new Date()

      };
      console.log('Office Data:', officeData);
      

      if (values._id) {
        await updateOffice(values._id, officeData);
        toast.success('Office updated successfully!');
      } else {
        await createOffice(officeData);
        toast.success('Office created successfully!');
      }
      
      // Refresh data after successful operation
      await fetchOffices();
      setOpenModal(false);
      setEditingOffice(null);
    } catch (err) {
      console.error("Operation failed:", err);
      setError(
        err.response?.status === 409 
          ? 'Office number already exists.' 
          : 'An error occurred. Please try again.'
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOffice(id);
      toast.success('Office deleted successfully!');
      await fetchOffices(); // Refresh after deletion
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error('Failed to delete office');
    }
  };

  // handleEdit

  const handleEdit = (office) => {
    setEditingOffice(office);
    setOpenModal(true);
  };

  // Fixed filtering logic (moved after state declarations)
  const filteredOffices = offices.filter(office => {
    const matchesSearch = office.officeNo?.toLowerCase().includes(searchTerm.toLowerCase()) ?? true;
    const status = office.officeStatus?.toLowerCase() ?? 'inactive';
    const matchesStatus = filterStatus === 'all' || status === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const paginatedOffices = filteredOffices.slice(
    page * rowsPerPage, 
    page * rowsPerPage + rowsPerPage
  );
// Theme constants for maintainability
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
      }}
    >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={3}
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
            Office Management
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search offices..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(0); // Reset page on search
              }}
              sx={{ width: 200 }}
            />
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setPage(0); // Reset page on filter change
                }}
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
            backgroundColor: themeColors.primary,
            '&:hover': { backgroundColor: themeColors.primary },
          }}
          onClick={() => {
            setEditingOffice(null);
            setOpenModal(true);
          }}
        >
          Add New Office
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
            <Table stickyHeader aria-label="office table" sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  {/* <TableCell sx={{ fontWeight: '600', backgroundColor: themeColors.primary, color: 'white' }}>
                    Office Name
                  </TableCell> */}
                  <TableCell sx={{ fontWeight: '600', backgroundColor: themeColors.primary, color: 'white' }}>
                    Office No
                  </TableCell>
                  <TableCell sx={{ fontWeight: '600', backgroundColor: themeColors.primary, color: 'white' }}>
                    Floor No
                  </TableCell>
                  <TableCell sx={{ fontWeight: '600', backgroundColor: themeColors.primary, color: 'white' }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: '600', backgroundColor: themeColors.primary, color: 'white' }}>
                    Last Updated
                  </TableCell>
                  <TableCell sx={{ fontWeight: '600', backgroundColor: themeColors.primary, color: 'white' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedOffices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: 'center', py: 3 }}>
                      <Typography variant="body2" color="textSecondary">
                          No matching offices found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedOffices.map((office, index) => (
                    <TableRow
                      key={office._id}
                      sx={{
                        backgroundColor: index % 2 === 0 ? '#ffffff' : '#f5f5f5',
                        '&:hover': { backgroundColor: '#f3e5f5' },
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <Avatar sx={{ bgcolor: themeColors.secondary, width: 40, height: 40 }}>
                            {office.officeNo?.charAt(0)?.toUpperCase() || 'O'}
                          </Avatar>
                          <Typography sx={{ fontWeight: '500', color: themeColors.secondary }}>
                            {office.officeNo || 'N/A'}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ color: themeColors.secondary }}>
                          {office.floorNo || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={office.officeStatus || 'Unknown'}
                          size="small"
                          sx={{
                            fontWeight: '600',
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            ...(office.officeStatus?.toLowerCase() === 'active'
                              ? themeColors.activeStatus
                              : themeColors.inactiveStatus),
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ color: themeColors.secondary }}>
                          {office.trsTime && dayjs(office.trsTime).isValid()
                            ? dayjs(office.trsTime).format('DD/MM/YYYY HH:mm')
                            : 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: '8px' }}>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => handleEdit(office)}
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
                              onClick={() => handleDelete(office._id)}
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
            count={filteredOffices.length}
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

      <OfficeModaForm
        open={openModal}
        // handleClose={handleCloseModal}
        handleClose={() => {
          setOpenModal(false);
          setError('');
        }}
        initialValues={
          editingOffice || {
            officeNo: '',
            floorNo: '',
            officeStatus: 'ACTIVE',
            buildingId: '',
            officeTypeId: '',
            companyId: '',
          }
        }
        onSubmit={handleCreate}
        error={error}
      />
    </Container>
  );
};

export default Office;
