import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';

export default function CircularIndeterminate() {
  return (
      <LinearProgress sx={{
        top: 66,
        position: 'fixed',
        width: '140%',
        padding: '0',
        margin: '0'
        }} />
  );
}