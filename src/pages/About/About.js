import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import TeamCard from './TeamCard';
import './About.scss';

function About() {
  return (
    <div className='About'>
      <Box className="wrapperAbout" sx={{ margin: '30px' }}>

        <Typography variant="h1" >Qui sommes-nous</Typography>      
        <Typography variant="h2" > Bienvenue sur Livres O'Trésor développé par une équipe de développeurs talentueux.</Typography>
        <Typography className='introduction-text' > Notre site sert à encourager les enfants qui aiment la lecture en fournissant une plate-forme sûre tout en étant supervisés par un parent. Notre équipe a pour but de créer un site de qualité, pour que les parents passent du temps avec leurs enfants, et puissent partager leur amour de la lecture avec eux.</Typography>
        <Typography className='introduction-text' > La conception du site s'est faites en équipe puis son développement s'est poursuivi par le product Owner.</Typography>

        {/* Section sur l'équipe */}
        <Box className='team-section'>
          {/* Liste des membres de l'équipe */}
          <TeamCard
            name="Marie Lou Prince-Levasseur"
            role="Product Owner / Développeuse Symfony et Réact (et graphisme)"
            image="img/Avatar-MarieLou.png"
            time="(Août 2022- à ce jour)"
          />
          <TeamCard
            name="Aswan Joseph-Mathieu"
            role="Développeuse Symfony (et graphiste)"
            image="img/Avatar-Aswan.png"
            time="(Août-Sept 2022)"
          />
          <TeamCard
            name="Tiphany Quemeneur"
            role="Git Master / Développeuse Symfony"
            image="img/Avatar-Tiphany.png"
            time="(Août-Sept 2022)"
          />
          <TeamCard
            name="Cédric Cochard"
            role="Scrum Master / Développeur Réact"
            image="img/Avatar-Cedric.png"
            time="(Août-Sept 2022)"
          />
          <TeamCard
            name="Maxime Kerkheide"
            role="Développeur Réact"
            image="img/Avatar-Maxime.png"
            time="(Août-Sept 2022)"
          />
        </Box>
      </Box>
    </div>

  );
}

export default About;
