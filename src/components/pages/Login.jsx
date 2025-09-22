import React, { useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import logo from "../../assets/logo-light.png";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Public or local image, replace with your preferred image URL
const sideImage =
  "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=700&q=80";

export default function EmployeeLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo: Log form data
    console.log("Login submitted:", form);
  };

  return (
    <Grid container sx={{ minHeight: "100vh", display: 'flex', justifyContent:"space-between" }}>
      {/* LEFT SIDE: Image and branding */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundImage: `url(${sideImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          padding: "50px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(19, 52, 59, 0.7)", // teal overlay
            zIndex: 1,
          }}
        />
        <Box sx={{ zIndex: 2, textAlign: "center" }}>
          <img src={logo} alt="" style={{height: "100px"}} />
          
          <Typography variant="h6" sx={{ mb: 4 }}>
            Streamline Your Employee Management
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <BusinessIcon />
              <Typography>Manage Teams Efficiently</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LockIcon />
              <Typography>Secure & Reliable</Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      {/* RIGHT SIDE: Login Form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          paddingRight: "370px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: { xs: "rgba(245,245,245,1)", md: "#fff" },
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 400,
            mx: "auto",
            borderRadius: 4,
            boxShadow: "0 8px 32px rgba(19, 52, 59, 0.07)",
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" fontWeight={700}>
              Hi, Welcome Back to Octopus Technologies
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "text.secondary", mt: 1 }}
            >
              Sign in to Octopus Technologies
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email address"
              type="email"
              name="email"
              required
              variant="outlined"
              margin="normal"
              value={form.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              required
              variant="outlined"
              margin="normal"
              value={form.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((s) => !s)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", my: 1 }}>
              <Link href="#" underline="hover">
                Forgot password?
              </Link>
            </Box>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2, py: 1.5, fontWeight: 600, fontSize: "1.1rem" }}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
