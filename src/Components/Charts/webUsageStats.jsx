
  
export const genderProm = [
    {
      label: 'mujer',
      value: 50,
    },
    {
      label: 'hombre',
      value: 90,
    },
    {
      label: 'no genero',
      value: 23,
    },
  ];

  export const datasetTotalUser = [
    {
      
      total: 21,
      month: 'Jan',
    },
    {
      total: 215,
      month: 'Feb',
    },
    {
      total: 25,
      month: 'Mar',
    },
    {
      total: 315,
      month: 'Apr',
    },
    {
      total: 111,
      month: 'May',
    },
    {
      total: 450,
      month: 'June',
    },
    {
      total: 200,
      month: 'July',
    },
    {
      total: 37,
      month: 'Aug',
    },
    {
      total: 90,
      month: 'Sept',
    },
    {
      total: 215,
      month: 'Oct',
    },
    {
      total: 89,
      month: 'Nov',
    },
    {
      total: 34,
      month: 'Dec',
    },
  ];
  

  
  export const platforms = [
    {
      label: 'Desktop',
      value: 40.88,
    },
  ];
  
 
  
 
  
  export const valueFormatter = (item) => `${item.value}%`;
  

  export function valueFormatterTotalUser(value) {
    return `${value}mm`;
  }