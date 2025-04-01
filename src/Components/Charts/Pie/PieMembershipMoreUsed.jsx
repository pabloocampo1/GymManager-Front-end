import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { desktopOS } from '../webUsageStats';

export default function PieActiveArc() {
  return (
    <PieChart
    
    series={[
      {
        data: desktopOS,
        highlightScope: { fade: "global", highlight: "item" },
        faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        label: "",
      },
    ]}
    height={250}
    width={400} 
    slotProps={{
      legend: { hidden: false },
    }}
  />
  
  );
}