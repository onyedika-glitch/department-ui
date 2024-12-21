import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Department Management</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        {children}
      </Container>
    </Box>
  );
}