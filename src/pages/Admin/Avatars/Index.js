import React, { useEffect, useState } from 'react';
import { Box, Typography} from '@mui/material'
import AdminNavBar from '../NavBar/NavBar';
import { useSelector } from 'react-redux';

// COMPONENT
import AvatarsList from './AvatarsList';

// APIS
import fetchIndexAdmin from '../../../ApiCalls/Admin/FetchIndexAdmin';

// UTILS
import { generateAdminAvatarsApiEndpoint } from '../../../Utils/apiEndpoints';

// CSS
import './Index.scss';

function Index() {
  // API
  const apiUrl = useSelector((state) => state.api.apiUrl);
  const apiEndPointAdminAvatars = generateAdminAvatarsApiEndpoint();

   // set token
   const token = useSelector(state => { return state.user.token})
   const [avatars, setAvatars] = useState([]);

   useEffect(() => {
    if(token){

      const fetchData = async () => {
        try {
          const data = await fetchIndexAdmin(apiUrl,apiEndPointAdminAvatars, token);
          setAvatars(data);
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

             <AvatarsList avatars={avatars} />
        
        </Box>
  </div>
  )
}

export default Index