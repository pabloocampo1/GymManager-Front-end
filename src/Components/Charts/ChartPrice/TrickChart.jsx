import * as React from 'react';

import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import {  valueFormatter, setData } from './TrickData';




const chartSetting = {
 
  series: [{ dataKey: 'seoul', label: `Ingresos Monetarios - ${new Date().getFullYear()}`, valueFormatter }],
  height: 350,
  width:850,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
    
  },
};

export default function TickPlacementBars({dataList =[] }) {
    


  return (
    <div style={{   }}>
      
      <BarChart
        dataset={setData(dataList)}
        xAxis={[
          { scaleType: 'band', dataKey: 'month',   },
        ]}
          margin={{ top: 30, right: 50, bottom: 30, left: 80 }} 
        {...chartSetting}
      />
    </div>
  );
}
