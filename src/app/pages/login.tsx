import { useState } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Login() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      router.push('/departments');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" mb={3}>Login</Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 3 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}