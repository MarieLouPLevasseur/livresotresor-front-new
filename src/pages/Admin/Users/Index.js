import React, { useEffect, useState } from 'react';

import { Box, Typography} from '@mui/material'
import AdminNavBar from '../NavBar/NavBar';
import { useSelector } from 'react-redux';

// COMPONENT
import UserList from './UserList';

// UTILS
import { generateAdminUsersApiEndpoint } from '../../../Utils/apiEndpoints';

// APIS
import fetchIndexAdmin from '../../../ApiCalls/Admin/FetchIndexAdmin';

// CSS
import './Index.scss';

function Index() {

  // API
  const apiUrl = useSelector((state) => state.api.apiUrl);
  const apiEndPointAdminUsers = generateAdminUsersApiEndpoint();

  // set token
  const token = useSelector(state => { return state.user.token})
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if(token){

      const fetchData = async () => {
        try {
          const data = await fetchIndexAdmin(apiUrl,apiEndPointAdminUsers, token);
          setUsers(data);
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
               PAGE USERS ADMIN
            </Typography>

              <UserList users={users} />
        
        </Box>
  </div>
  )
}

export default Index