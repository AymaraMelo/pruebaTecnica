import React, { useState, useReducer } from 'react';
import { Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #0073ff',
  boxShadow: 24,
  p: 4,
};

export default function ModalInfoButton({ open, handleClose, state }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Image
              src="../logoDecemberBank.png"
              width="90 rem"
              style={{ marginRight: '3%' }}
              rounded
            />
            {state.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {state.body}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
