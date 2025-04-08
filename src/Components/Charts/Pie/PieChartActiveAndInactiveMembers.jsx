import * as React from 'react';
import { dataActiveAndInactiveMembers } from '../webUsageStats';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography } from '@mui/material';


export default function PieChartActiveAndInactiveMembers() {
    return (

        <Box
            sx={{ 
                width: "40%",
                backgroundColor:"white",
                borderRadius:"15px"
            }}>
            <Typography variant='p'>Minetros activo e inactivos</Typography>
            <PieChart

                series={[
                    {
                        data: dataActiveAndInactiveMembers,
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

