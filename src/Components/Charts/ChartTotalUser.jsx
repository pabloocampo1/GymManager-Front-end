
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';



 function valueFormatterTotalUser(value) {
    return `${value}`;
  }

const chartSetting = {
  yAxis: [
    {
      label: '',
    },
  ],
  series: [{ dataKey: 'total', valueFormatterTotalUser }],
  height: "250",
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

function setData(data) {
       const objects = [];
      
        data.map((item) => {
          const save = {
            month: "",
            total: ""
          }
            switch (item.month) {
              case 1:
                save.month = "Ene";
                save.total = item.total;
                break;
              case 2:
                save.month = "Feb";
                save.total = item.total;
                break;
              case 3:
                save.month = "Mar";
                save.total = item.total;
                break;
              case 4:
                save.month = "Abr";
                save.total = item.total;
                break;
              case 5:
                save.month = "May";
                save.total = item.total;
                break;
              case 6:
                save.month = "Jun";
                save.total = item.total;
                break;
              case 7:
                save.month = "Jul";
                save.total = item.total;
                break;
              case 8:
                save.month = "Ago";
                save.total = item.total;
                break;
              case 9:
                save.month = "Sep";
                save.total = item.total;
                break;
              case 10:
                save.month = "Oct";
                save.total = item.total;
                break;
              case 11:
                save.month = "Nov";
                save.total = item.total;
                break;
              case 12:
                save.month = "Dic";
                save.total = item.total;
                break;
            
              default:
                break;
            }
          objects.push(save)
        });

        return objects;
  }

export default function ChartTotalUser({dataList = []}) {
 
  

  return (
    <div style={{ width: '100%' }}>
      <BarChart
        dataset = {setData(dataList)}
        xAxis={[
          { scaleType: 'band', dataKey: 'month'},
        ]}
        margin={{ top: 20, right: 0, bottom: 30, left: 35 }} 
        {...chartSetting}
      />
    </div>
  );
}




