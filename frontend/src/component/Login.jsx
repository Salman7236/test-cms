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

export const Login = ({ setUserLevel, setIsLoggedIn }) => {
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
    setLoading(true);
    // let valid = true;

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
      // localStorage.setItem("token", data.token); // Save JWT securely (at least for now)
      console.log("API Response:", data); // Debug log to see what's returned

      if (!response.ok) throw new Error(data.error || "Login failed");

      // Validate required fields from response
      if (!data.token) {
        throw new Error("Authentication token not received from server");
      }

      // Handle userLevel with fallback
      let userLevel = 999; // Default to most restrictive level

      if (data.userLevel !== undefined && data.userLevel !== null) {
        userLevel = parseInt(data.userLevel, 10);
        if (isNaN(userLevel)) {
          console.warn("Invalid userLevel received:", data.userLevel);
          userLevel = 999; // Fallback to restrictive level
        }
      } else {
        console.warn(
          "userLevel not found in response, using default level 999"
        );
      }

      // Store user data
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userLevel", userLevel.toString());

      // Store additional user data if available
      if (data.userTypeId !== undefined && data.userTypeId !== null) {
        localStorage.setItem("userTypeId", data.userTypeId.toString());
      }

      if (data.userType) {
        localStorage.setItem("userType", data.userType);
      }

      if (data.userId !== undefined && data.userId !== null) {
        localStorage.setItem("userId", data.userId.toString());
      }

      // Store any other user data that might be needed
      if (data.userName) {
        localStorage.setItem("userName", data.userName);
      }

      console.log("User logged in with level:", userLevel);

      // Update App state
      setUserLevel(userLevel);
      setIsLoggedIn(true); //  updates App's state so redirect works

      // Full page redirect to dashboard — reloads everything
      window.location.href = "/dashboard";
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
