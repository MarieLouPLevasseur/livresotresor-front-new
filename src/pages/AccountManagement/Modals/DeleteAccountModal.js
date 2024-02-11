import React from 'react';
import ConfirmationModal from '../../../Utils/Modals/ConfirmationModal';

const DeleteAccountModal = ({ open, handleClose, handleConfirmDelete }) => {

  const handleConfirmDeleteAction = () => {
    handleConfirmDelete();
    handleClose();
  };

  return (
    <template>
     {/* Utilisez le composant ConfirmationModal ici */}
      <ConfirmationModal
          open={open}
          handleClose={handleClose}
          title="Confirmation de suppression"
          message="Êtes-vous sûr de vouloir supprimer ce compte ? Il n'y aura aucun retour en arrière possible."
          handleCancel={handleClose}
          handleConfirm={handleConfirmDeleteAction}
        />
    </template>
  );
};

export default DeleteAccountModal;
