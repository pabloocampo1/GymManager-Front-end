import React from 'react';
import { genderProm } from '../webUsageStats';
import { PieChart } from '@mui/x-charts';
import { Box, Typography } from '@mui/material';


function PiePromGender() {
    return (
        <Box  sx={{ 
            width: "45%",
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

export default PiePromGender;