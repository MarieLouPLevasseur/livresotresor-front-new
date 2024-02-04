import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const DeleteAccountModal = ({ open, handleClose, handleConfirmDelete, handleSubmitDelete }) => {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          width: 400,
          backgroundColor: 'white',
          margin: 'auto',
          alignContent: 'center'
        }}
      >
        <h2 id="parent-modal-title">Suppression du compte?</h2>
        <p className="parent-modal-description">
          Êtes-vous sûr de vouloir supprimer ce compte ? Cette action sera définitive et irréversible.
        </p>
        <Box
          component="form"
          noValidate
          sx={{
            margin: 10
          }}
        >
          <Button
            className="closeButton"
            fullWidth
            variant="contained"
            onClick={handleClose}
            sx={{ mt: 2, mb: 2, background: 'red' }}
          >
            Non, c'est une erreur. Annuler.
          </Button>
          <Button
            className="deleteButton"
            fullWidth
            variant="contained"
            onClick={handleSubmitDelete}
            sx={{ mt: 2, mb: 2, background: 'green' }}
          >
            Oui, je suis sûr. Supprimer.
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteAccountModal;
