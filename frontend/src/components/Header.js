import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Loan Default Prediction
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header; 