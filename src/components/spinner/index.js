import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';

export default function CircularIndeterminate() {
  return (
    <div sx={{
        display: 'flex',
        justifyContent: "center",
        top: 0,
        position: 'sticky',
        }}>
      <LinearProgress />
    </div>
  );
}