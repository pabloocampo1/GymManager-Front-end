
export const desktopOS = [
    {
      label: 'Premiun',
      value: 72.72,
    },
    {
      label: 'plata',
      value: 16.38,
    },
    {
      label: 'full year',
      value: 4.65,
    },
  ];
export const dataActiveAndInactiveMembers = [
    {
      label: 'Inactivos',
      value: 23,
    },
    {
      label: 'Activos',
      value: 90,
    },
    
  ];
  
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
  
  const normalize = (v, v2) => Number.parseFloat(((v * v2) / 100).toFixed(2));
  
  export const mobileAndDesktopOS = [
    ...desktopOS.map((v) => ({
      ...v,
      label: v.label === 'Other' ? 'Other (Desktop)' : v.label,
      value: normalize(v.value, platforms[0].value),
    })),
  ];
  
  export const valueFormatter = (item) => `${item.value}%`;
  

  export function valueFormatterTotalUser(value) {
    return `${value}mm`;
  }