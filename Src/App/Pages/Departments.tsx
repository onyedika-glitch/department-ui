import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import Layout from '../components/Layout';
import axios from 'axios';

interface Department {
  id: number;
  name: string;
  parentId: number | null;
}

export default function Departments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [open, setOpen] = useState(false);
  const [department, setDepartment] = useState({
    name: '',
    parentId: '',
  });

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/departments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDepartments(response.data);
    } catch (error) {
      console.error('Failed to fetch departments:', error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/departments',
        department,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOpen(false);
      fetchDepartments();
    } catch (error) {
      console.error('Failed to create department:', error);
    }
  };

  const renderDepartmentHierarchy = (parentId: number | null = null, level = 0) => {
    const filteredDepts = departments.filter(dept => dept.parentId === parentId);
    
    return filteredDepts.map(dept => (
      <Box key={dept.id}>
        <ListItem sx={{ pl: level * 4 }}>
          <ListItemText primary={dept.name} />
        </ListItem>
        {renderDepartmentHierarchy(dept.id, level + 1)}
      </Box>
    ));
  };

  return (
    <Layout>
      <Box mb={3}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Department
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" mb={2}>Department Hierarchy</Typography>
        <List>
          {renderDepartmentHierarchy()}
        </List>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Department</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Department Name"
            margin="normal"
            value={department.name}
            onChange={(e) => setDepartment({ ...department, name: e.target.value })}
          />
          <TextField
            fullWidth
            label="Parent Department ID (optional)"
            margin="normal"
            value={department.parentId}
            onChange={(e) => setDepartment({ ...department, parentId: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}