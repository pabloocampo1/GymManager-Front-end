import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

export default function CustomAxis() {
  return (
    <Stack direction="row" sx={{ width: '100%' }}>

      <Box sx={{ flexGrow: 1 }}>
        <SparkLineChart
          plotType="bar"
          data={[8, 4, 2, 5, 7, 2, 4, 6, 7 , 9]}
          height={230}
          showTooltip
          showHighlight
          xAxis={{
            scaleType: 'band',
            data: [
              new Date(2016, 0, 1),
              new Date(2017, 0, 1),
              new Date(2018, 0, 1),
              new Date(2019, 0, 1),
              new Date(2020, 0, 1),
              new Date(2021, 0, 1),
              new Date(2022, 0, 1),
              new Date(2023, 0, 1),
              new Date(2024, 0, 1),
              new Date(2025, 0, 1),
            ],
            valueFormatter: (value) => value.getFullYear(),
          }}
        />
      </Box>
    </Stack>
  );
}
