import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, Typography } from '@mui/material';


const months = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
];



const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;


function returnDataChart(data) {
  const seriesList = [];

  const memberships = data.memberships;

  Object.keys(memberships).forEach(membershipName => {
    const serie = {
      label: membershipName,
      data: memberships[membershipName],
      showMark:true,
    }
    seriesList.push(serie)
  });
 
  

  const lineChartsParams = {
    series:seriesList,
    width: 850,
    height: 300,
  };
  
  return lineChartsParams;
}

// 

export default function ChartMembership({ data = {} }) {

  if (!data || !data.memberships) {
    return <div>Cargando datos...</div>;
  }

 


  return (
    <Box sx={{
      width: '100%',
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <Typography variant='p' sx={{ textAlign: "center", pb: "20px", pt: "20px" }}>Ingresos monetarios por cada membresia - {new Date().getFullYear()}</Typography>
      <LineChart
        {...returnDataChart(data)}
        xAxis={[{ data: months, scaleType: 'point' }]}
         margin={{ top: 70, right: 50, bottom: 30, left: 80 }} 
           sx={{ '& .MuiChartsTooltip-tooltip': { fontSize: '28px' } }} 
        series={ returnDataChart(data).series.map((series) => ({
          ...series,
          valueFormatter: (v) => (v === null ? '' : currencyFormatter(v)),
        }))}
      />
    </Box>
  );
}
