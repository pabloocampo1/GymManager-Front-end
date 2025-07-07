import * as React from 'react';

import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography } from '@mui/material';



const dataSet = (data) => {
    const dataList = [];
    
    const actives = {
            label: "Activos" ,
            value: data["activeMembers"]  };
    const inactives = {
            label: "Inactivos" ,
            value: data["inactiveMembers"]  };
    
    dataList.push(actives)
    dataList.push(inactives)

    return dataList;

}


export default function PieChartActiveAndInactiveMembers({dataObject = {}}) {
    return (

        <Box
            sx={{ 
                width: "45%",
                backgroundColor:"background.paper",
                borderRadius:"15px"
            }}>
            <Typography variant='p'>Miembros activo e inactivos</Typography>
            <PieChart

                series={[
                    {
                        data: dataSet(dataObject),
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

