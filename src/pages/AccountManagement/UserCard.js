// UserCard.js
import React from 'react';
import { Box, Card, TextField, Grid, Fab } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import PasswordStrengthMeter from '../../Utils/Passwords/PasswordStrengthMeter/PasswordStrengthMeter';

const UserCard = ({
  email,
  firstname,
  lastName,
  userUpdatePasswordValue,
  setUserUpdateEmailValue,
  setUserUpdateFirstNameValue,
  setUserUpdatePasswordValue,
  setUserUpdateLastNameValue,
  setOpenModalCheckCredential,
  setChangeUpdateUser,
  setChangeDeleteUser,
  setContext
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
      <Card variant='outlined' sx={{ border: '1px solid #4462A5', marginBottom: '30px', marginTop: '30px', marginLeft: '20px', width: '70%' }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: "row" }, justifyContent: 'flex-start', Width: '100%', padding: '10px', gap: '10px' }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, Width: '100%', justifyContent: 'space-around', gap: '10px' }}>
            <Grid item xs={12} sm={6} >
              <TextField
                fullWidth
                defaultValue={email}
                id="email"
                label="email"
                name="email"
                autoComplete="email"
                onChange={(e) => setUserUpdateEmailValue(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                defaultValue={firstname}
                autoComplete="given-name"
                name="firstName"
                fullWidth
                label="Nom"
                autoFocus
                onChange={(e) => setUserUpdateFirstNameValue(e.target.value)}
              />
            </Grid>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-around', Width: '100%', marginBottom: '20px', gap: '10px' }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                defaultValue={userUpdatePasswordValue}
                name="password"
                label="Mot de passe"
                // type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => setUserUpdatePasswordValue(e.target.value)}
              />
              <PasswordStrengthMeter passwordValue={userUpdatePasswordValue} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                defaultValue={lastName}
                label="pseudonyme"
                name="lastName"
                autoComplete="family-name"
                onChange={(e) => setUserUpdateLastNameValue(e.target.value)}
              />
            </Grid>
          </Box>
          <Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Fab color="secondary" aria-label="edit" onClick={() => [setOpenModalCheckCredential(true), setChangeUpdateUser(true),setContext("updateUser")]}>
              <CheckCircleIcon />
            </Fab>
            <Fab className="deleteIconBackground" sx={{ backgroundColor: '#FB4747' }}>
              <DeleteIcon sx={{ backgroundColor: '#FB4747' }} onClick={() => [setOpenModalCheckCredential(true), setChangeDeleteUser(true),setContext("deleteUser")]} />
            </Fab>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default UserCard;
