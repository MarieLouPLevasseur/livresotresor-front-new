import React from 'react';
import { Box, CardMedia, Typography } from '@mui/material';
import './About.scss';

function TeamCard({ name, role, image,time }) {
  return (
    <Box className='team-card' >
      {/* Image de l'équipe */}
      <CardMedia
        component="img"
        sx={{ width: '30%', margin: 'auto' }}
        image={image}
      />
      {/* Nom et rôle de l'équipe */}
      <Typography variant="h3">{name}</Typography>
      <Typography >{role}</Typography>
      <Typography >{time}</Typography>
    </Box>
  );
}

export default TeamCard;
