import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';


export default function ShowMessageSuccess({title, description, type}) {
  return (
   
      <Stack sx={{ minWidth: '400px', position:"absolute",borderRadius:"15px", bottom:"5%", left:"1%" , zIndex:"9999" }} spacing={2}>
      <Alert variant='filled' severity={type}>
        <AlertTitle>{title}</AlertTitle>
        {description}
      </Alert>
    </Stack>
    
  );
}
