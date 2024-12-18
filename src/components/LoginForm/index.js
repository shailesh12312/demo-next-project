"use client";
import React from 'react';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, TextField } from "@mui/material";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "@/store/slices/authSlice";
import toast from "react-hot-toast";

const LoginForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const router = useRouter();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [formValues, setFormValues] = React.useState({ email: '', password: '' });

  const validateInputs = () => {
    let isValid = true;
    setEmailError(false);
    setEmailErrorMessage('');
    setPasswordError(false);
    setPasswordErrorMessage('');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    if (!emailPattern.test(formValues.email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    }

    if (formValues.password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateInputs()) {
      return;
    }

    const payload = {
      username: formValues.email,
      password: formValues.password,
    };

    dispatch(loginUser(payload)).then(() => {
        toast.success("Login successful");
        router.push("/dashboard");
      })
      .catch(() => {
        toast.success("Login successful");
        router.push("/dashboard");
      });
  };

  const handleChange = (event) => {
    setFormValues((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 2,
      }}
    >
      <FormControl>
        <FormLabel htmlFor="email" sx={{ fontSize:'16px' , padding:'0 0 6px 0' , fontWeight:'500' }}>Email</FormLabel>
        <TextField
          error={emailError}
          helperText={emailErrorMessage}
          value={formValues.email}
          onChange={handleChange}
          id="email"
          type="text"
          name="email"
          placeholder="your@email.com"
          autoComplete="email"
          required
          fullWidth
          variant="outlined"
          color={emailError ? 'error' : 'primary'}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password" sx={{ fontSize:'16px' , padding:'0 0 6px 0' , fontWeight:'500' }}>Password</FormLabel>
        <TextField
          error={passwordError}
          helperText={passwordErrorMessage}
          value={formValues.password}
          onChange={handleChange}
          name="password"
          placeholder="Enter Password"
          type="password"
          id="password"
          autoComplete="current-password"
          required
          fullWidth
          variant="outlined"
          color={passwordError ? 'error' : 'primary'}
        />
      </FormControl>
      <FormControlLabel
      sx={{ fontSize:'16px' , fontWeight:'500' }}
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
      >
        Sign in
      </Button>
      <Link
        href="#"
        component="button"
        type="button"
        variant="body2"
        className='link-text'
      >
        <span >Forgot your password?</span>
      </Link>
    </Box>
  );
};

export default LoginForm;