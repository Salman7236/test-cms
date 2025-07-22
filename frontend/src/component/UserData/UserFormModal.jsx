import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import { getCompany } from "../Setup/Company/Api";
import { getUserType } from "../UserType/Api";
import { toast, ToastContainer } from "react-toastify";

const UserFormModal = ({
  open,
  handleClose,
  initialValues,
  onSubmit,
  error,
}) => {
  const [formData, setFormData] = useState({
    userName: "",
    userPwd: "",
    userExt: "",
    userStatus: "ACTIVE",
    userCell: "",
    companyId: "",
    userTypeId: "",
  });
  const [formError, setFormError] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [loadingUserRoles, setLoadingUserRoles] = useState(false);

  // Fetch companies when modal opens
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoadingCompanies(true);
        const res = await getCompany();
        setCompanies(res.data.companies || []);
      } catch (err) {
        console.error("Failed to fetch companies:", err);
        toast.error("Failed to load companies");
      } finally {
        setLoadingCompanies(false);
      }
    };

    if (open) {
      fetchCompanies();
    }
  }, [open]);

  // Fetch user roles when modal opens
  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        setLoadingUserRoles(true);
        const res = await getUserType();
        console.log(res);

        setUserRoles(res.data.userType || []);
      } catch (err) {
        console.error("Failed to fetch user roles:", err);
        toast.error("Failed to load user roles");
      } finally {
        setLoadingUserRoles(false);
      }
    };

    if (open) {
      fetchUserRoles();
    }
  }, [open]); // Added open as dependency

  // Initialize form data
  useEffect(() => {
    setFormData({
      userName: initialValues?.userName || "",
      userPwd: initialValues?.userPwd || "",
      userExt: initialValues?.userExt || "",
      userStatus: initialValues?.userStatus || "ACTIVE",
      userCell: initialValues?.userCell || "",
      companyId:
        initialValues?.companyId?._id || initialValues?.companyId || "",
      userTypeId:
        initialValues?.userTypeId?._id || initialValues?.userTypeId || "",
    });
    // setFormData(initialValues || {
    //   userName: '',
    //   userPwd: '',
    //   userExt: '',
    //   userStatus: 'ACTIVE',
    //   userCell: '',
    //   companyId: '',
    //   userTypeId: ''
    // });
    setFormError("");
  }, [initialValues, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.userName ||
      !formData.userPwd ||
      !formData.userExt ||
      !formData.companyId ||
      !formData.userTypeId
    ) {
      setFormError("Please fill all required fields");
      return;
    }
    onSubmit(formData);
  };

  const improvedDropdownStyles = {
    formControl: {
      minWidth: 120,
      width: "100%",
      marginTop: "16px",
      marginBottom: "8px",
    },

    select: {
      "& .MuiSelect-select": {
        display: "flex",
        alignItems: "center",
        padding: "12px 14px",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#3949ab",
        borderWidth: "1px",
      },
    },
    menuItem: {
      display: "flex",
      alignItems: "center",
      minHeight: "48px",
      padding: "8px 16px",
      "&:hover": {
        backgroundColor: "rgba(57, 73, 171, 0.08)",
      },
    },
    loadingItem: {
      display: "flex",
      justifyContent: "center",
      padding: "12px 16px",
      color: "rgba(0, 0, 0, 0.6)",
    },
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {initialValues?._id ? "Edit User" : "Add User"}
        </Typography>

        {(error || formError) && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error || formError}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* First Row */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="User Name"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                margin="normal"
                inputProps={{ maxLength: 20 }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                name="userPwd"
                type="password"
                value={formData.userPwd}
                onChange={handleChange}
                margin="normal"
                inputProps={{ maxLength: 10 }}
                required
              />
            </Grid>

            {/* Second Row */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="userCell"
                type="tel"
                value={formData.userCell}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Extension"
                name="userExt"
                value={formData.userExt}
                onChange={handleChange}
                margin="normal"
                inputProps={{ maxLength: 5 }}
                required
              />
            </Grid>

            {/* Third Row - Company Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                margin="normal"
                variant="outlined"
                sx={improvedDropdownStyles.formControl}
                disabled={loadingCompanies}
              >
                <InputLabel
                  id="company-label"
                  shrink={!!formData.companyId}
                  sx={{
                    color: "text.primary",
                    "&.Mui-focused": {
                      color: "#3949ab",
                    },
                  }}
                >
                  Company *
                </InputLabel>
                <Select
                  labelId="company-label"
                  name="companyId"
                  value={formData.companyId}
                  onChange={handleChange}
                  label="Company *"
                  required
                  disabled={loadingCompanies}
                  sx={improvedDropdownStyles.select}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 300,
                        marginTop: "8px",
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.12)",
                      },
                    },
                  }}
                  renderValue={(selected) => {
                    if (!selected)
                      return (
                        <em style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                          Select a company
                        </em>
                      );
                    const selectedCompany = companies.find(
                      (c) => c._id === selected
                    );
                    return selectedCompany ? (
                      <Box>
                        <Typography variant="body1" fontWeight="500">
                          {selectedCompany.companyName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {selectedCompany.companyAbbr || "No abbreviation"}
                        </Typography>
                      </Box>
                    ) : null;
                  }}
                >
                  {loadingCompanies ? (
                    <MenuItem sx={improvedDropdownStyles.loadingItem}>
                      Loading companies...
                    </MenuItem>
                  ) : companies.length === 0 ? (
                    <MenuItem disabled sx={improvedDropdownStyles.loadingItem}>
                      No companies available
                    </MenuItem>
                  ) : (
                    companies.map((company) => (
                      <MenuItem
                        key={company._id}
                        value={company._id}
                        sx={improvedDropdownStyles.menuItem}
                      >
                        <Box>
                          <Typography variant="body1" fontWeight="500">
                            {company.companyName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {company.companyAbbr || "No abbreviation"}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>

            {/* User Role Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                margin="normal"
                variant="outlined"
                sx={improvedDropdownStyles.formControl}
                disabled={loadingUserRoles}
              >
                <InputLabel
                  id="userrole-label"
                  shrink={!!formData.userTypeId}
                  sx={{
                    color: "text.primary",
                    "&.Mui-focused": {
                      color: "#3949ab",
                    },
                  }}
                >
                  User Role *
                </InputLabel>
                <Select
                  labelId="userrole-label"
                  name="userTypeId"
                  value={formData.userTypeId}
                  onChange={handleChange}
                  label="User Role *"
                  required
                  disabled={loadingUserRoles}
                  sx={improvedDropdownStyles.select}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 300,
                        marginTop: "8px",
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.12)",
                      },
                    },
                  }}
                  renderValue={(selected) => {
                    if (!selected)
                      return (
                        <em style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                          Select user role
                        </em>
                      );
                    const selectedRole = userRoles.find(
                      (r) => r._id === selected
                    );
                    return selectedRole ? (
                      <Typography fontWeight="500">
                        {selectedRole.userType}
                      </Typography>
                    ) : null;
                  }}
                >
                  {loadingUserRoles ? (
                    <MenuItem sx={improvedDropdownStyles.loadingItem}>
                      Loading user roles...
                    </MenuItem>
                  ) : userRoles.length === 0 ? (
                    <MenuItem disabled sx={improvedDropdownStyles.loadingItem}>
                      No roles available
                    </MenuItem>
                  ) : (
                    userRoles.map((userRole) => (
                      <MenuItem
                        key={userRole._id}
                        value={userRole._id}
                        sx={improvedDropdownStyles.menuItem}
                      >
                        <Typography fontWeight="500">
                          {userRole.userType}
                        </Typography>
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>

            {/* Fourth Row - Status Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="status-label">Status *</InputLabel>
                <Select
                  name="userStatus"
                  value={formData.userStatus || "Active"}
                  label="Status"
                  onChange={handleChange}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handleClose}
              sx={{
                mr: 2,
                color: "#3949ab",
                borderColor: "#3949ab",
                "&:hover": {
                  backgroundColor: "rgba(57, 73, 171, 0.04)",
                },
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#3949ab",
                "&:hover": {
                  backgroundColor: "#303f9f",
                },
              }}
            >
              {initialValues?._id ? "Update" : "Create"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UserFormModal;
