import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js"
import LineChart from '../LineChart/LineChart';
import genStyle from '../Styles/Styles';

Chart.register(CategoryScale);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  boxShadow: 24,
  ...genStyle.box
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
          <Button onClick={handleClose} variant='contained' >Close</Button>
        </Box>
      </Modal>
    </div>
  );
}