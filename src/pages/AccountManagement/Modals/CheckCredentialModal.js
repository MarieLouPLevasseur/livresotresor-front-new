// CheckCredentialModal.js

import React, { useState } from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';
import postApiCheckCredential from '../../../ApiCalls/CheckCredential';
import { useSnackbar } from '../../../Contexts/SnackBarContext'; // Assurez-vous d'importer correctement le contexte

const CheckCredentialModal = ({ 
        open,
        handleClose,
        title,
        apiUrl,
        apiEndpointUsers,
        token,
        context,
        handleSubmitUpdateUser,
        setOpenModalConfirmDeleteUser,
        setOpenModalDeleteKid
    }) => {

    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const showSnackbar = useSnackbar(); 

    const handleConfirmClick = () => {
        setIsLoading(true);
        postApiCheckCredential(apiUrl + apiEndpointUsers + '/checkCredential', { password }, token, (success) => {
            setIsLoading(false);
            setIsSuccess(success);
            setHasSubmitted(true); 
            if (success) {
                handleClose(); 
                showSnackbar("Mot de passe confirmé", "success"); 

                if (context === 'updateUser') {
                    handleSubmitUpdateUser();
                } else if (context === 'deleteUser') {
                    setOpenModalConfirmDeleteUser(true);
                } else if (context === 'deleteKid') {
                    setOpenModalDeleteKid(true);
                }

                // reset
                setIsSuccess(false);
                setIsLoading(false);
                setHasSubmitted(false);
                setPassword("");
            }
            
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleConfirmClick();
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ width: 400, backgroundColor: 'white', margin: 'auto', alignContent: 'center' }}>
                <h2 id='parent-modal-title'>{title}</h2>
                {isLoading && <p style={{margin: '15px'}}>Chargement en cours...</p>}
                {!isLoading && !isSuccess && hasSubmitted && <p style={{margin: '15px', color: '#d50000'}}>Erreur: identifiant incorrect</p>}
                {!isLoading && !isSuccess && hasSubmitted && <p style={{margin: '15px', color: '#d50000'}}>Les modifications n'ont pas pu être pris en comtpe</p>}
                <Box component="form" noValidate sx={{ margin: 10, textAlign: 'center' }}>
                    <TextField
                        id="password"
                        type="password"
                        value={password}
                        placeholder="Confirmation mot de passe"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <Button fullWidth variant="contained" onClick={handleConfirmClick} sx={{ mt: 2, mb: 2, background: '#4462A5' }}>
                        Confirmation mot de passe
                    </Button>
                    <Button fullWidth variant="contained" onClick={handleClose} sx={{ mt: 2, mb: 2, background: 'red' }}>
                        Annuler
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default CheckCredentialModal;
