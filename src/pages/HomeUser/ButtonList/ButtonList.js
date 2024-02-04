import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch } from 'react-redux';
import {  Link } from 'react-router-dom';

import { userKidId, userKidUsername, userKidAvatar,userKidFirstname } from "../../../Utils/Slices/login/userSlice"

function ButtonList( {kidId, username, avatar,firstname}){
  const dispatch = useDispatch();

  function handleDispatchInfoKid(){

    localStorage.setItem('userKids', JSON.stringify({
      kidId,
      username,
      avatar,
      firstname
    }));

    dispatch(userKidId(kidId));
    dispatch(userKidUsername(username));
    dispatch(userKidFirstname(firstname));
    dispatch(userKidAvatar(avatar));
        
};
  return (

    
    <div>
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Link to = "/profil/enfant">
        <Fab color="primary" aria-label="add"
        
        onClick={ handleDispatchInfoKid }
        >
      

          <VisibilityIcon />
        </Fab>
      </Link>
      <Fab color="secondary" aria-label="edit">
      <Link to = "/profil/utilisateur/compte" >

        <EditIcon />
        </Link>
      </Fab>
      {/* <Fab>
        <DeleteIcon />
      </Fab> */}
    </Box>
    </div>
  )
}

export default ButtonList