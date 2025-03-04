import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const premium = [
  150000, // Enero
  155000, // Febrero
  160000, // Marzo
  157000, // Abril
  162000, // Mayo
  165000, // Junio
  167000, // Julio
  170000, // Agosto
  168000, // Septiembre
  172000, // Octubre
  175000, // Noviembre
  180000  // Diciembre
];

const basic = [
  100000, // Enero
  103000, // Febrero
  105000, // Marzo
  102000, // Abril
  107000, // Mayo
  110000, // Junio
  112000, // Julio
  115000, // Agosto
  113000, // Septiembre
  117000, // Octubre
  120000, // Noviembre
  123000  // Diciembre
];

const biweekly = [
  130000, // Enero
  133000, // Febrero
  135000, // Marzo
  132000, // Abril
  137000, // Mayo
  140000, // Junio
  142000, // Julio
  145000, // Agosto
  143000, // Septiembre
  147000, // Octubre
  150000, // Noviembre
  153000  // Diciembre
];

const lineChartsParams = {
  series: [
    {
      label: 'Premium',
      data: premium,
      showMark: true,
    },
    {
      label: 'Básica',
      data: basic,
      showMark: true,
    },
    {
      label: 'Estudiantil',
      data: biweekly,
      showMark: true,
    },
  ],
  width: 700,
  height: 400,
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

export default function Formatting() {
  return (
    <LineChart sx={{padding:1}}
      {...lineChartsParams}
      xAxis={[{ data: months, scaleType: 'point' }]} 
      series={lineChartsParams.series.map((series) => ({
        ...series,
        valueFormatter: (v) => (v === null ? '' : currencyFormatter(v)),
      }))}
    />
  );
}
