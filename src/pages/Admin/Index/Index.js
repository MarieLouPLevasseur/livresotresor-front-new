import React from 'react'
import { Box, Typography} from '@mui/material'
import AdminNavBar from '../NavBar/NavBar';
import './Index.scss';

function Index() {
  return (
    <div>

    <AdminNavBar/>
   
        <Box sx={{m:10}}>
            <Typography sx={{ mt: 3, mb: 3, fontFamily: 'Montserrat', fontWeight: 700, fontSize: 40, letterSpacing: 2, color: '#4462A5' }}>
               PAGE INDEX ADMIN
            </Typography>
        
        </Box>
  </div>
  )
}

export default Index