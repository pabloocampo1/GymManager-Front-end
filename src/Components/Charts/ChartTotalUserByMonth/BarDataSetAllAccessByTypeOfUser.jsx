import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const chartSetting = {
  yAxis: [
    {
    
    },
  ],
  width: 900,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

function valueFormatter(value) {
    return `${value}`;
  }

const dataSet = (data) => {
    const listReturn = [];
    
    data.forEach(element => {
      const item = {
        members:element["members"],
        visits: element["visits"],
       
      }
       switch (element.month) {
              case 1:
                item.month = "Ene";
              
                break;
              case 2:
               item.month  = "Feb";
              
                break;
              case 3:
              item.month = "Mar";
              
                break;
              case 4:
              item.month = "Abr";
              
                break;
              case 5:
              item.month = "May";
              
                break;
              case 6:
              item.month = "Jun";
              
                break;
              case 7:
              item.month = "Jul";
              
                break;
              case 8:
              item.month = "Ago";
              
                break;
              case 9:
              item.month = "Sep";
              
                break;
              case 10:
              item.month = "Oct";
              
                break;
              case 11:
              item.month = "Nov";
              
                break;
              case 12:
              item.month = "Dic";
              
                break;
            
              default:
                break;
            }

      listReturn.push(item)
    });

    return listReturn;

}

export default function BarsDatasetToTalAccessMembersAndVisits({ dataList = []}) {
  return (
    <BarChart
      dataset={dataSet(dataList)}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'members', label: 'Acceso de miembros', valueFormatter },
        { dataKey: 'visits', label: 'Accesso de visitas regulares', valueFormatter },
        
      ]}
      {...chartSetting}
    />
  );
}
