import * as React from 'react';
import { genderProm } from './webUsageStats';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography } from '@mui/material';


export default function PieChartAgeProm() {
    return (

        <Box
            sx={{ 
                width: "35%",
                backgroundColor:"white",
                borderRadius:"15px"
            }}>
            <Typography variant='p'>Genero Promedio</Typography>
            <PieChart

                series={[
                    {
                        data: genderProm,
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
        </Box>

    );
}

