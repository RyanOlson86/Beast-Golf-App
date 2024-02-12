import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js"
import LineChart from '../LineChart/LineChart';

Chart.register(CategoryScale);


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PlayerModal({handleClose, open, playerDetails, name}) {

  return (
    <div>
      
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <LineChart playerDetails={playerDetails} name={name}/>
          <Button onClick={handleClose} variant='outlined'>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}