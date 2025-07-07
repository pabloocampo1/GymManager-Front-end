import React from 'react';
import { PieChart } from '@mui/x-charts';
import { Box, Typography } from '@mui/material';


 const getDataGender = (data) => {
    const listToReturn =  [];
    data.forEach(element => {
        const itemToAdd = {
            label:element["gender"],
            value: element["total"]
        }
       listToReturn.push(itemToAdd)
    });
    return listToReturn;
 }


function PiePromGender({dataList = []}) {



    return (
        <Box  sx={{ 
            width: "45%",
            backgroundColor:"background.paper",
            borderRadius:"15px"
        }}>
            <Typography variant='p'>Genero Promedio</Typography>
            <PieChart

                series={[
                    {
                        data: getDataGender(dataList),
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