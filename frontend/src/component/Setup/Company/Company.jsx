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
import { getCompany, createCompany, updateCompany, deleteCompany } from './Api';
import CompanyFormModal from '../Company/CompanyModalForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await getCompany();
      console.log(res);
      
      setCompanies(res.data.companies || []);
    } catch (error) {
      console.error("Failed to fetch companies:", error);
      toast.error('Failed to load companies');
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [searchTerm, filterStatus]);

  const handleCreate = async (values) => {
    try {
      setError('');
      const companyData = {
        ...values,
        trsTime: new Date()
      };

      if (values._id) {
        await updateCompany(values._id, companyData);
        toast.success('Company updated successfully!');
      } else {
        await createCompany(companyData);
        toast.success('Company created successfully!');
      }
      fetchCompanies();
      setOpenModal(false);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError('Company name already exists. Please choose a different name.');
      } else {
        setError('An error occurred. Please try again.');
        console.error("Operation failed:", err);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCompany(id);
      toast.success('Company deleted successfully!');
      fetchCompanies();
    } catch (error) {
      toast.error('Failed to delete company');
    }
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = 
      company.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.companyAbbr?.toLowerCase().includes(searchTerm.toLowerCase());
    const status = company.companyStatus?.toLowerCase() || 'inactive';
    const matchesStatus = filterStatus === 'all' || status === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const paginatedCompanies = filteredCompanies.slice(
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
            Companies Management
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search companies..."
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
            setEditingCompany(null);
            setOpenModal(true);
          }}
        >
          Add New Company
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
              aria-label="company table"
              sx={{
                minWidth: 800
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: '600', backgroundColor: '#92768f', color: 'white' }}>Company Name</TableCell>
                  <TableCell sx={{ fontWeight: '600', backgroundColor: '#92768f', color: 'white' }}>Abbreviation</TableCell>
                  <TableCell sx={{ fontWeight: '600', backgroundColor: '#92768f', color: 'white' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: '600', backgroundColor: '#92768f', color: 'white' }}>Last Updated</TableCell>
                  <TableCell sx={{ fontWeight: '600', backgroundColor: '#92768f', color: 'white' }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedCompanies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: 'center', py: 3 }}>
                      <Typography variant="body2" color="textSecondary">
                        No companies found.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedCompanies.map(company => (
                    <TableRow
                      key={company._id}
                      sx={{
                        '&:nth-of-type(even)': { backgroundColor: '#f8f9fa' },
                        '&:hover': { backgroundColor: '#e8eaf6' }
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <Avatar sx={{ bgcolor: '#3949ab', width: 40, height: 40 }}>
                            {company.companyName?.charAt(0)?.toUpperCase() || 'C'}
                          </Avatar>
                          <Typography sx={{ fontWeight: '500', color: '#1a237e' }}>
                            {company.companyName}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell sx={{ whiteSpace: 'nowrap' }}>
                        <Chip
                          // icon={<BusinessIcon sx={{ fontSize: '1rem', color: '#1a237e' }} />}
                          label={company.companyAbbr || 'N/A'}
                          size="small"
                          sx={{ borderColor: '#c5cae9', backgroundColor: '#e8eaf6', color: '#1a237e' }}
                        />
                      </TableCell>

                      <TableCell sx={{ whiteSpace: 'nowrap' }}>
                        <Chip
                          label={company.companyStatus || 'Unknown'}
                          size="small"
                          sx={{
                            fontWeight: '600',
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            ...(company.companyStatus?.toLowerCase() === 'active' ? {
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

                      <TableCell sx={{ whiteSpace: 'nowrap' }}>
                        <Typography sx={{ color: '#1a237e' }}>
                          {company.trsTime ? dayjs(company.trsTime).format('DD/MM/YYYY HH:mm') : 'N/A'}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ whiteSpace: 'nowrap' }}>
                        <Box sx={{ display: 'flex', gap: '8px' }}>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => {
                                setEditingCompany({
                                  _id: company._id,
                                  companyName: company.companyName,
                                  companyAbbr: company.companyAbbr,
                                  companyStatus: company.companyStatus
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
                              onClick={() => handleDelete(company._id)}
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
            count={filteredCompanies.length}
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

      <CompanyFormModal
        open={openModal}
        handleClose={() => {
          setOpenModal(false);
          setError('');
        }}
        initialValues={editingCompany || { 
          companyName: '', 
          companyAbbr: '', 
          companyStatus: 'Active' 
        }}
        onSubmit={handleCreate}
        error={error}
      />
    </Container>
  );
};

export default Company;