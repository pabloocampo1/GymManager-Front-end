
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { datasetTotalUser, valueFormatterTotalUser } from './webUsageStats';


const chartSetting = {
  yAxis: [
    {
      label: 'Total',
    },
  ],
  series: [{ dataKey: 'total', label: 'Miembros por mes', valueFormatterTotalUser }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

export default function ChartTotalUser() {
 

  return (
    <div style={{ width: '70%' }}>
      
      <BarChart
        dataset={datasetTotalUser}
        xAxis={[
          { scaleType: 'band', dataKey: 'month'},
        ]}
        {...chartSetting}
      />
    </div>
  );
}




