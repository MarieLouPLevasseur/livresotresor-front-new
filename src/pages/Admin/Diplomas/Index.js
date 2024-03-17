import React, { useEffect, useState } from 'react';
import { Box, Typography} from '@mui/material'
import AdminNavBar from '../NavBar/NavBar';
import { useSelector } from 'react-redux';

// COMPONENT
import DiplomasList from './DiplomasList';

// APIS
import fetchIndexAdmin from '../../../ApiCalls/Admin/FetchIndexAdmin';

// UTILS
import { generateAdminDiplomasApiEndpoint } from '../../../Utils/apiEndpoints';

// CSS
import './Index.scss';

function Index() {
  // API
  const apiUrl = useSelector((state) => state.api.apiUrl);
  const apiEndPointAdminDiplomas = generateAdminDiplomasApiEndpoint();

   // set token
   const token = useSelector(state => { return state.user.token})
   const [diplomas, setDiplomas] = useState([]);

   useEffect(() => {
    if(token){

      const fetchData = async () => {
        try {
          const data = await fetchIndexAdmin(apiUrl,apiEndPointAdminDiplomas, token);
          setDiplomas(data);
          console.log(data)
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
      fetchData();
    }

  }, [apiUrl, token]);

  return (
    <div>

    <AdminNavBar/>
   
        <Box sx={{m:10}}>
            <Typography sx={{ mt: 3, mb: 3, fontFamily: 'Montserrat', fontWeight: 700, fontSize: 40, letterSpacing: 2, color: '#4462A5' }}>
               PAGE AVATARS ADMIN
            </Typography>

             <DiplomasList diplomas={diplomas} />
        
        </Box>
  </div>
  )
}

export default Index