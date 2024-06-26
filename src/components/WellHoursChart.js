import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography } from '@mui/material';
import { OilBarrel, Title } from '@mui/icons-material';



const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Well A',
  'Well B',
  'Well C',
  'Well D',
  'Well E',
  'Well F',
  'Well G',
];

export default function WellHoursChart() {

  return (
    
    <BarChart 
      width={500}
      height={300}
      series={[
        { data: pData, label: 'Actual', id: 'pvId' },
        { data: uData, label: 'Plan', id: 'uvId' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
      
    />
    
  );
}