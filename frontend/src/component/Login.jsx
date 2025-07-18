import {
  Button,
  TextField,
  Typography,
  Grid,
  Checkbox,
  Paper,
  Avatar,
  FormControlLabel,
  Alert,
  CircularProgress,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const paperStyle = {
    padding: 30,
    width: 350,
    margin: "50px auto",
    borderRadius: 10,
  };
  const avatarStyle = {
    backgroundColor: "#1bbd7e",
    width: 60,
    height: 60,
  };
  const headingStyle = {
    marginTop: 10,
    marginBottom: 20,
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // const validateEmail = (email) => {
  //   return /\S+@\S+\.\S+/.test(email);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSuccess("");
    setFormError("");
    let valid = true;

    // Validation (same as before)
    // if (!email) {
    //   setEmailError("Email is required");
    //   // valid = false;
    // } else if (!validateEmail(email)) {
    //   setEmailError("Enter a valid email");
    //   // valid = false;
    // } else {
    //   setEmailError('');
    // }

    // if (!password) {
    //   setPasswordError("Password is required");
    //   // valid = false;
    // } else if (password.length < 6) {
    //   setPasswordError("Password must be at least 6 characters");
    //   // valid = false;
    // } else {
    //   setPasswordError('');
    // }

    // if (!valid) return;

    // setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: email,
          userPwd: password,
        }),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Expected JSON but got: ${text.substring(0, 100)}...`);
      }

      // const data = await response.json();
      // console.log(data);

      // if (!response.ok) {
      //   throw new Error(data.error || ` HTTP error! status: ${response.status}`);
      // }

      //    localStorage.setItem("isLoggedIn", "true");
      // localStorage.setItem("userEmail", email);
      //    setFormSuccess("Login successful!");
      // setTimeout(() => {
      //   navigate('/dashboard');
      // }, 1000);

      const data = await response.json();
      localStorage.setItem("token", data.token); // Save JWT securely (at least for now)

      console.log(data);

      if (!response.ok) throw new Error(data.error || "Login failed");

      // Store user data including role
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRole", data.userType);
      localStorage.setItem("userTypeId", data.userTypeId);
      console.log(data);

      setFormSuccess("Login successful!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      let errorMessage = error.message;

      if (error.message.includes("Failed to fetch")) {
        errorMessage = "Cannot connect to server. Please try again later.";
      } else if (error.message.includes("Expected JSON")) {
        errorMessage =
          "Server returned unexpected response. Check API endpoint.";
      }

      setFormError(errorMessage);
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AccountCircleIcon style={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h5" style={headingStyle}>
            Login
          </Typography>
        </Grid>

        {formSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {formSuccess}
          </Alert>
        )}

        {formError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formError}
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
          />

          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label="Remember Me"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2, mb: 2, py: 1 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
