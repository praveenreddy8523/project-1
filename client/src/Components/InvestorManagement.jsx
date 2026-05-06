import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';



const InvestorManagement = () => {

    const navigate = useNavigate();
  return (<>
    <Box>
        <Typography variant="h4" gutterBottom sx={{p:2}}>
          Investor Management
        </Typography>
        </Box>
    <Box sx={{ display: 'flex', width: '100%' }}>
        
      <Box sx={{
        width: "150px", // Example width
        flexShrink: 0, // Prevent this box from shrinking
        padding: 2, // Optional padding
      }}>
        
        <Button variant="contained" fullWidth color="primary" sx={{ marginRight: 1 , my: 2}}  onClick={() => navigate("addinvestor")} >
          Add Investor
        </Button>
        <Button variant="outlined" fullWidth color="primary" onClick={() => navigate("users")} >
          View Investors
        </Button>
      </Box>
      <Box sx={{
        overflow: 'auto', // Enable scrolling when content overflows
        width: "calc(80vw)",   // Ensure it takes full width of its parent
        height: "calc(80vh)",  // Or a specific height if needed
        // You can also set a maxHeight if you want it to scroll within a limited space
        // maxHeight: '500px',
      }}>
        <Outlet />
      </Box>
    </Box>
    </>);
};

export default InvestorManagement;