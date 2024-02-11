// GoodbyeModal.js
import React from 'react';
import { Modal, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import logoBook from '../../../assets/img/themes/main/logo.3.png'; 

const GoodbyeModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      disableEnforceFocus
    >
      <Box
        sx={{
          width: '40%',
          padding: 10,
          backgroundColor: 'white',
          margin: 'auto',
          alignContent: 'center',
          textAlign: 'center'
        }}
      >
        <h2 id="parent-modal-title">Merci d'avoir fait un bout de chemin avec nous!</h2>
        <p className="parent-modal-goodbye">
          Nous avons été heureux de vous compter parmi nos membres.
        </p>
        <p className="parent-modal-goodbye">
          Nous vous souhaitons une belle journée.
        </p>
        <p className="parent-modal-goodbye">
          Bonne continuation.
        </p>

        <img className="logoModal" src={logoBook} alt="logo Book" width={'30%'} />

        <Link to={'/'} style={{ "textDecoration": "none" }}>
          <Button
            className="closeButton"
            fullWidth
            variant="contained"
            onClick={handleClose}
            sx={{ mt: 2, mb: 2, background: 'blue' }}
          >
            Retour à l'Accueil
          </Button>
        </Link>
      </Box>
    </Modal>
  );
};

export default GoodbyeModal;
