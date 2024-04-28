import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography} from '@mui/material'
import { useSelector } from 'react-redux';


// COMPONENT
import AdminNavBar from '../NavBar/NavBar';

// APIS
import FetchShowOneAdmin from '../../../ApiCalls/Admin/FetchShowOneAdmin';

// UTILS
import { generateAdminGetAvatarApiEndpoint } from '../../../Utils/apiEndpoints';


const UpdateAvatarsList = (id) => {
  // API
   const apiUrl = useSelector((state) => state.api.apiUrl);
   const apiEndPointAdminAvatar = generateAdminGetAvatarApiEndpoint();
  // set token
   const token = useSelector(state => { return state.user.token})
    
   const [avatar, setAvatar] = useState({});
   const [newAvatar, setNewAvatar] = useState({ level: '', discount: '', image: null });

  useEffect(() => {
    if(token){

      const fetchData = async () => {
        try {
          const data = await FetchShowOneAdmin(apiUrl,apiEndPointAdminAvatar, token);
          setAvatar(data);
          console.log(data)
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
      fetchData();
    }

  }, [apiUrl, token]);

// NEW IMAGE or UPDATE changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAvatar({ ...newAvatar, [name]: value });
  };

  const handleImageChange = (event) => {
    setNewAvatar({ ...newAvatar, image: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('id', newAvatar.id);
      formData.append('is_win', newAvatar.is_win);
      formData.append('url', newAvatar.url);
      // TODO ajuster avec la bonne route POST
      await axios.post('/api/avatars', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Reset the form and update the avatars list
       // TODO Mettre à jour l'avatar en cours et pas un nouveau ???
      setNewAvatar({ id: '', is_win: '', url: null });
      // fetchAvatars();
    } catch (error) {
      console.error('Error adding avatar:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/avatars/${id}`);
      // fetchAvatars();
    } catch (error) {
      console.error('Error deleting avatar:', error);
    }
  };

  return (
    <div>
    <AdminNavBar/>
    <Box sx={{m:10}}>
      <Typography sx={{ mt: 3, mb: 3, fontFamily: 'Montserrat', fontWeight: 700, fontSize: 40, letterSpacing: 2, color: '#4462A5' }}>
      ADMIN Edit Avatar #{avatar.id}
      </Typography>

    </Box>
      <h2>Modification pallier avatar</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="level" placeholder="Level" value={newAvatar.level} onChange={handleInputChange} required />
        <input type="text" name="discount" placeholder="Discount" value={newAvatar.discount} onChange={handleInputChange} required />
        <input type="file" name="image" onChange={handleImageChange} required />
        <button type="submit">Ajouter Avatar</button>
      </form>
      <ul>
      
          <li key={avatar.id}>
            <span>Level: {avatar.level}, Discount: {avatar.discount}</span>
            <button onClick={() => handleDelete(avatar.id)}>Supprimer</button>
          </li>
    
      </ul>
    </div>
  );
};

export default UpdateAvatarsList;
