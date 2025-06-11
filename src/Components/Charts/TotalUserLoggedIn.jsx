import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { DataObjectSharp } from '@mui/icons-material';




function valueFormatter(value) {
  return `${value} Uusuarios totales`;
}

const chartSetting = {
  
  height: 400,
};

function changeNumberOfMontByTheNameAndReturn(data) {
     const listReturn = [];
    
    data.forEach(element => {
      const item = {
        month:element["month"],
        total: element["total"],
       
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

export default function GridDemo({ dataList = []}) {

  if(!dataList) {
    return <div>Cargando or not data</div>
  }

  return (
    <BarChart
      dataset={changeNumberOfMontByTheNameAndReturn(dataList)}
      yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[{ dataKey: 'total', label: 'Acceso de usuarios con membresia', valueFormatter }]}
      layout="horizontal"
      grid={{ vertical: true }}
      {...chartSetting}
    />
  );
}
