import { Modal, Box, Button, TextField } from '@mui/material';
import React, {  useState } from 'react';

const CheckCredentialModal = ({ 
    open,
    handleClose,
    title,
    handleConfirmCheckCredential

  }) => {
  const [password, setPassword] = useState("");

  const handleConfirmClick = () => {
    console.log(password)
    handleConfirmCheckCredential(password); 

  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ width: 400, backgroundColor: 'white', margin: 'auto', alignContent: 'center' }}>
        <h2 id='parent-modal-title'>{title}</h2>
        <p className='parent-modal-description'>Merci de confirmer votre mot de passe (ancien si en cours de modification) pour valider les modifications sur votre compte.</p>
        
        <Box component="form" noValidate sx={{ margin: 10, textAlign: 'center' }}>
          <TextField
            id="password"
            type="password"
            value={password}
            placeholder="Confirmation mot de passe"
            onChange={(e) => setPassword(e.target.value)} 
          />
          <Button fullWidth variant="contained" onClick={handleConfirmClick} sx={{ mt: 2, mb: 2, background: '#4462A5' }}>
            Confirmation mot de passe
          </Button>
          <Button fullWidth variant="contained" onClick={handleClose} sx={{ mt: 2, mb: 2, background: 'red' }}>
            Non, c'est une erreur. Annuler
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CheckCredentialModal;
