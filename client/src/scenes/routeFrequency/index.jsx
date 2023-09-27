import React, { useState } from 'react';
import {  Box,  } from '@mui/material';
import Header from 'components/Header';
import BarChart from '../../components/BarGraph'; // Import the BarChart component

const RouteFrequency = () => {
  const [view, setView] = useState('units');

  return (
    <Box m="1.5rem 5.5rem">
      <Header title="Route Frequency" subtitle="Overview of general route distribution" />
      <Box height="75vh">
        
       
        
        {/* Display the BarChart component */}
        {view === 'units' && <BarChart />}
      </Box>
    </Box>
  );
};

export default RouteFrequency;
