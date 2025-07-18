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
import { getOfficesAllocation, createOfficeAllocation, deleteOfficeAllocation, updateOfficeAllocation } from '../OfficeAllocation/Api';
import OfficeAlloForm from '../OfficeAllocation/OfficeAlloForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getOffices } from '../Office/Api';
import { getCompany } from '../Company/Api';
import dayjs from 'dayjs';

const OfficeAllocation = () => {
  const [offices, setOffices] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingAllocation, setEditingAllocation] = useState(null);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompany, setFilterCompany] = useState('all');
  const [filterOffice, setFilterOffice] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [allocations, setAllocations] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [allocationsRes, officesRes, companiesRes] = await Promise.all([
        getOfficesAllocation(),
        getOffices(),
        getCompany()
      ]);
      console.log('Allocations:', allocationsRes.data.officeAlloc); // Debug allocations
      console.log('Offices:', officesRes.data.office); // Debug offices
      console.log('Companies:', companiesRes.data.companies); // Debug companies
      setAllocations(allocationsRes.data.officeAlloc || []);
      setOffices(officesRes.data.office || []);
      setCompanies(companiesRes.data.companies || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (values) => {
    try {
      setError('');
      await createOfficeAllocation(values);
      toast.success('Office allocation created successfully!');
      fetchData();
      setOpenModal(false);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      console.error("Operation failed:", err);
    }
  };

  const handleUpdate = async (values) => {
    try {
      setError('');
      await updateOfficeAllocation(editingAllocation._id, values);
      toast.success('Office allocation updated successfully!');
      fetchData();
      setOpenModal(false);
      setEditingAllocation(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update office allocation');
      console.error("Update failed:", err);
    }
  };

  const handleEdit = (allocation) => {
    console.log('Editing Allocation:', allocation); // Debug allocation
    setEditingAllocation(allocation);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteOfficeAllocation(id);
      toast.success('Office allocation deleted successfully!');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete office allocation');
    }
  };

  const getOfficeName = (officeId) => {
    const office = offices.find(o => o._id === officeId);
    return office ? office.officeNo : 'N/A';
  };

  const getCompanyName = (companyId) => {
    const company = companies.find(c => c._id === companyId);
    return company ? company.companyName : 'N/A';
  };

  const filteredAllocations = allocations.filter(allocation => {
    const officeName = getOfficeName(allocation.officeId).toLowerCase();
    const companyName = getCompanyName(allocation.deptId).toLowerCase();
    const matchesSearch = officeName.includes(searchTerm.toLowerCase()) || 
                         companyName.includes(searchTerm.toLowerCase());
    const matchesCompany = filterCompany === 'all' || allocation.deptId === filterCompany;
    const matchesOffice = filterOffice === 'all' || allocation.officeId === filterOffice;
    return matchesSearch && matchesCompany && matchesOffice;
  });

  const paginatedAllocations = filteredAllocations.slice(
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
            Office Allocation
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
              <InputLabel>Company</InputLabel>
              <Select
                value={filterCompany}
                onChange={(e) => setFilterCompany(e.target.value)}
                label="Company"
              >
                <MenuItem value="all">All</MenuItem>
                {companies.map((company) => (
                  <MenuItem key={company._id} value={company._id}>
                    {company.companyName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Office</InputLabel>
              <Select
                value={filterOffice}
                onChange={(e) => setFilterOffice(e.target.value)}
                label="Office"
              >
                <MenuItem value="all">All</MenuItem>
                {offices.map((office) => (
                  <MenuItem key={office._id} value={office._id}>
                    {office.officeNo}
                  </MenuItem>
                ))}
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
            setEditingAllocation(null);
            setOpenModal(true);
          }}
        >
          Add New Allocation
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
              aria-label="office allocation table"
              sx={{
                minWidth: 600
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: '600', backgroundColor: '#92768f', color: 'white' }}>Company Name</TableCell>
                  <TableCell sx={{ fontWeight: '600', backgroundColor: '#92768f', color: 'white' }}>Office Number</TableCell>
                  <TableCell sx={{ fontWeight: '600', backgroundColor: 'rgb(146, 118, 143)', color: 'white' }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedAllocations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} sx={{ textAlign: 'center', py: 3 }}>
                      <Typography variant="body2" color="textSecondary">
                        {allocations.length === 0 ? 'No allocations found' : 'No matching allocations found'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedAllocations.map(allocation => (
                    <TableRow
                      key={allocation._id}
                      sx={{
                        '&:nth-of-type(even)': { backgroundColor: '#f8f9fa' },
                        '&:hover': { backgroundColor: '#e8eaf6' }
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <Avatar sx={{ bgcolor: '#3949ab', width: 40, height: 40 }}>
                            {getCompanyName(allocation.deptId)?.charAt(0)?.toUpperCase() || 'C'}
                          </Avatar>
                          <Typography sx={{ fontWeight: '500', color: '#1a237e' }}>
                            {getCompanyName(allocation.deptId)}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell sx={{ whiteSpace: 'nowrap' }}>
                        <Chip
                          label={getOfficeName(allocation.officeId) || 'N/A'}
                          size="small"
                          sx={{ borderColor: '#c5cae9', backgroundColor: '#e8eaf6', color: '#1a237e' }}
                        />
                      </TableCell>

                      <TableCell sx={{ whiteSpace: 'nowrap' }}>
                        <Box sx={{ display: 'flex', gap: '8px' }}>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => handleEdit(allocation)}
                              sx={{ color: '#3949ab', '&:hover': { backgroundColor: 'rgba(57, 73, 171, 0.1)' } }}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => handleDelete(allocation._id)}
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
            count={filteredAllocations.length}
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

      <OfficeAlloForm
        open={openModal}
        handleClose={() => {
          setOpenModal(false);
          setError('');
          setEditingAllocation(null);
        }}
        initialValues={editingAllocation || { 
          officeId: '',
          deptId: '',
          fromDate: dayjs().format('YYYY-MM-DD'),
          toDate: dayjs().add(1, 'year').format('YYYY-MM-DD')
        }}
        offices={offices}
        companies={companies}
        onSubmit={editingAllocation ? handleUpdate : handleCreate}
        error={error}
      />
    </Container>
  );
};

export default OfficeAllocation;