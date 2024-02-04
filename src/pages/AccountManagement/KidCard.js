import React, { useState } from 'react';
import { Box, Card, Typography, Grid, TextField, Fab } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';

const KidCard = ({ kid, handleOpendeleteKid }) => {
        const [kidUpdateUsernameValue, setKidUpdateUsernameValue] = useState(kid.username);
        const [kidUpdatePasswordValue, setKidUpdatePasswordValue] = useState("");
        const [kidUpdateFirstNameValue, setKidUpdateFirstNameValue] = useState(kid.firstname);
            
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
      <Card variant='outlined' sx={{ border: '1px solid #4462A5', marginBottom: '30px', marginTop: '30px', marginLeft: '20px', width: '70%' }}>
        <Box sx={{ display: 'flex', flexDirection: {xs:'column', lg:"row"}, justifyContent: 'flex-start', Width: '100%', padding: '10px', gap: '10px' }}>
          <Box>
            <Typography sx={{ fontSize: '1.4rem', padding: '30px', fontFamily: 'montserrat', textTransform: 'uppercase' }}>{kidUpdateFirstNameValue}</Typography>
          </Box>
          <Box sx={{ display: 'flex', Width: '100%', justifyContent: 'space-around', mt: '18px' }}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                defaultValue={kidUpdateFirstNameValue}
                onChange={(e) => setKidUpdateFirstNameValue(e.target.value)}
                name="firstName"
                fullWidth
                label="Nom du compte *"
                autoFocus
              />
            </Grid>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', Width: '100%', marginBottom: '20px', mt: '18px' }}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="kid-username"
                defaultValue={kidUpdateUsernameValue}
                onChange={(e) => setKidUpdateUsernameValue(e.target.value)}
                name="kid-username"
                fullWidth
                label="Identifiant de connexion-optionnel"
                autoFocus
              />
            </Grid>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', Width: '100%', marginBottom: '20px', mt: '18px' }}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="new-password"
                onChange={(e) => setKidUpdatePasswordValue(e.target.value)}
                name="password"
                fullWidth
                label="Mot de passe-optionnel"
                autoFocus
              />
            </Grid>
          </Box>
          <Box sx={{ '& > :not(style)': { m: 1 } , display:'flex', flexDirection:'row', justifyContent:'center'}}>
            <Fab color="secondary" aria-label="edit" >
              <CheckCircleIcon />
            </Fab>
            <Fab sx={{backgroundColor:'#FB4747'}}>
            <DeleteIcon sx={{backgroundColor:'#FB4747'}} onClick={() => handleOpendeleteKid(kid.id)} />
            </Fab>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default KidCard;
