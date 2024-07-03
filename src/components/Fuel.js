import React from 'react';
import FuelConsumption from './FuelConsumption';
import FuelRecieved from './FuelRecieved';
import { Container } from '@mui/material';

const Fuel = () => {
  return (
    <Container>
      <FuelConsumption></FuelConsumption>
      <FuelRecieved></FuelRecieved>
    </Container>
  );
};

export default Fuel;
