
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
export const agePromUser = [
    {
      label: '15-25',
      value: 23,
    },
    {
      label: '25-40',
      value: 90,
    },
    {
      label: '40 - 80',
      value: 23,
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
  