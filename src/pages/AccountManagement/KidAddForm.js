import React, { useState } from 'react';
import { Box, Card, Grid, TextField } from '@mui/material';
import PasswordStrengthMeter from '../../Utils/Passwords/PasswordStrengthMeter/PasswordStrengthMeter';
import Validate from '../AccountManagement/Validate/Validate';
import { useTogglePasswordVisibility } from '../../Utils/Passwords/useTogglePasswordVisibility'; // Importez useTogglePasswordVisibility ici
import OpenEye from '../../assets/img/themes/main/oeil_ouvert.png';
import CloseEye from '../../assets/img/themes/main/oeil_ferme.png';

const KidAddForm = ({
  kidAddFirstNameValue,
  setKidAddFirstNameValue,
  kidAddUsernameValue,
  setKidAddUsernameValue,
  kidAddPasswordValue,
  setKidAddPasswordValue,
  handleSubmitCreate,
}) => {
  // Utilisez useTogglePasswordVisibility pour gérer la visibilité du mot de passe
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  const [passwordToCheck, setPasswordToCheck] = useState('');

  const handlePasswordChange = (e) => {
    setPasswordToCheck(e.target.value);
  };

//   TODO: améliorer le visuel
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
      <Card variant='outlined' sx={{ border: '1px solid #4462A5', marginBottom: '30px', marginTop: '30px', marginLeft: '20px', width: '70%' }}>
         <Box sx={{ display: 'flex', Width: '100%', justifyContent: 'space-around', borderBlockColor: 'red' }}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                label='Prénom'
                autoFocus
                value={kidAddFirstNameValue}
                onChange={(e) => setKidAddFirstNameValue(e.target.value)}
              />
            </Grid>
          </Box>
          <Box sx={{ color: 'blue', textAlign: "justify" }}>
            Si vous souhaitez donner les accès pour que votre enfant puisse se connecter depuis l'accueil en autonomie, vous pouvez renseigner son identifiant et son mot de passe.
            Vous serez la seule personne pouvant modifier son identifiant ou son mot de passe. Vous pourrez modifier votre choix après la création de son compte.
          </Box>
          <Box sx={{ display: 'flex', Width: '100%', justifyContent: 'space-around' }}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="kid-username"
                name="kid-username"
                fullWidth
                label="Identifiant de connexion"
                autoFocus
                value={kidAddUsernameValue}
                onChange={(e) => setKidAddUsernameValue(e.target.value)}
              />
            </Grid>
          </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', Width: '100%', padding: '10px', gap: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="password"
              label="Mot de passe"
              type={passwordVisibility ? "password" : ""}
              autoComplete="new-password"
              value={kidAddPasswordValue}
              onChange={(e) => {
                setKidAddPasswordValue(e.target.value);
                handlePasswordChange(e); // Appelez handlePasswordChange pour mettre à jour le mot de passe à vérifier
              }}
            />
            <PasswordStrengthMeter passwordValue={kidAddPasswordValue} />
            <img edge="end" alt={rightIcon === "eye" ? "Set password visible" : "set password invisible"} src={rightIcon === "eye" ? OpenEye : CloseEye} size={22} onClick={handlePasswordVisibility} />
          </Grid>
        </Box>
        <Validate handleSubmit={handleSubmitCreate} />
      </Card>
    </Box>
  );
};

export default KidAddForm;
