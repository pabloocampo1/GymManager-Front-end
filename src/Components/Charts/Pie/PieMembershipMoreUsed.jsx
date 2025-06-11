import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { ChartContainer } from '@mui/x-charts';


export default function PieActiveArc({ dataList = [] }) {



  const renderData = (data) => {
    const list = []

    data.forEach(element => {
      const item = {
        label: element["nameMembership"],
        value: element["totalSubscription"]
      }

      list.push(item)
    });

    return list;
  }

  return (
   
      <PieChart  

      series={[
        {
          data: renderData(dataList),
          highlightScope: { fade: "global", highlight: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "blue" },
          label: "",
        },
      ]}
      height={250}
      width={600}
      slotProps={{
        legend: { hidden: false },
       

      }}
      margin={{ top: 20, right: 200, bottom: 20, left: 40 }}

    />
    
    

  );
}