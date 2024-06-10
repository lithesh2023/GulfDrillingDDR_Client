import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits(props) {
  return (
    <React.Fragment>
      <Title>Fuel Consumption</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 24 June, 2024
      </Typography>
      <div>
        <Link color="primary" to='/Fuel' onClick={preventDefault}>
          View Details
        </Link>
      </div>
    </React.Fragment>
  );
}