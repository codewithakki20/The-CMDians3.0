import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Stack,
  Alert,
  Link as MuiLink,
} from '@mui/material';
import { ClipLoader } from 'react-spinners';
import server from '../api/axiosInstance';

const Signup = () => {
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await axios.post(`${server}/api/v1/user/register`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
        setInput({ username: '', email: '', password: '' });
      }
    } catch (error) {
      const msg = error?.response?.data?.message || 'Signup failed.';
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#1f2937',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 4, md: 6 },
            borderRadius: '1rem',
            backgroundColor: '#1f2937',
            width: '100%',
          }}
        >
          <Box textAlign="center" mb={4}>
            <Typography
              component="h1"
              variant="h4"
              sx={{ fontWeight: 700, color: '#ffffff', mb: 1 }}
            >
              Create an Account
            </Typography>
            <Typography variant="body2" sx={{ color: '#9ca3af' }}>
              Join The CMDians Memories today!
            </Typography>
          </Box>

          {errorMsg && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {errorMsg}
            </Alert>
          )}

          <form onSubmit={signupHandler}>
            <Stack spacing={3}>
              {/* Username Field */}
              <TextField
                label="Username"
                name="username"
                fullWidth
                required
                value={input.username}
                onChange={changeEventHandler}
                variant="outlined"
                sx={fieldStyles}
              />

              {/* Email Field */}
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
                value={input.email}
                onChange={changeEventHandler}
                variant="outlined"
                sx={fieldStyles}
              />

              {/* Password Field */}
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                required
                value={input.password}
                onChange={changeEventHandler}
                variant="outlined"
                sx={fieldStyles}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  borderRadius: '0.75rem',
                  backgroundColor: loading ? '#4b5563' : '#3b82f6',
                  '&:hover': {
                    backgroundColor: loading ? '#4b5563' : '#2563eb',
                  },
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 1.5,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {loading ? <ClipLoader size={24} color="#ffffff" /> : 'Signup'}
              </Button>
            </Stack>

            <Box mt={4} textAlign="center">
              <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                Already have an account?{' '}
                <MuiLink
                  href="/login"
                  sx={{ color: '#3b82f6', '&:hover': { color: '#2563eb' } }}
                >
                  Login
                </MuiLink>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

// Shared MUI TextField styles
const fieldStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '0.75rem',
    backgroundColor: '#374151',
    color: '#ffffff',
    '& fieldset': { borderColor: '#4b5563' },
    '&:hover fieldset': { borderColor: '#3b82f6' },
    '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
  },
  '& .MuiInputLabel-root': {
    color: '#9ca3af',
    '&.Mui-focused': {
      color: '#3b82f6',
    },
  },
  '& .MuiInputBase-input': {
    color: '#ffffff',
  },
};

export default Signup;
