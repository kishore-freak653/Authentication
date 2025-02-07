import React, { useState, useContext } from "react";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth = () => {
  const navigate = useNavigate();


const { setUser } = useContext(UserContext);  

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    login: {},
    register: {},
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        loginData
      );

      setUser(res.data.user); 

      toast.success("Login Successful! 🎉");
      navigate("/user-dashboard"); 
    } catch (error) {
      console.log("Login Error:", error.response); 

      setErrors((prevErrors) => ({
        ...prevErrors,
        login: {
          submit: error.response?.data?.message || "Invalid email or password",
        },
      }));

      toast.error(error.response?.data?.message || "Login failed "); 
    }
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/register",
        registerData
      );

      toast.success("Registered Successfully! "); 
      console.log(res.data);
    } catch (error) {
      console.log("Register Error:", error.response); 

      setErrors((prevErrors) => ({
        ...prevErrors,
        register: {
          submit: error.response?.data?.message || "Registration failed",
        },
      }));

      toast.error(error.response?.data?.message || "Registration failed "); 
    }
  };


  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleSubmitLogin}>
              <TextField
                name="email"
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                value={loginData.email}
                onChange={handleLoginChange}
                error={!!errors.login?.email}
                helperText={errors.login?.email}
              />
              <TextField
                name="password"
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={loginData.password}
                onChange={handleLoginChange}
                error={!!errors.login?.password}
                helperText={errors.login?.password}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Register
            </Typography>
            <form onSubmit={handleRegister}>
              <TextField
                name="name"
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                value={registerData.name}
                onChange={handleRegisterChange}
              />
              <TextField
                name="email"
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                value={registerData.email}
                onChange={handleRegisterChange}
              />
              <TextField
                name="password"
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={registerData.password}
                onChange={handleRegisterChange}
              />
              <TextField
                name="phone"
                fullWidth
                label="Phone Number"
                variant="outlined"
                margin="normal"
                value={registerData.phone}
                onChange={handleRegisterChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
              >
                Register
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default Auth;
