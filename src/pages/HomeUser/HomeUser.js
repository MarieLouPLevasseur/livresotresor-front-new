import React , { useEffect, useState } from 'react'
import ButtonList from '../HomeUser/ButtonList/ButtonList'
import HomeCarousel from '../Home/HomeCarousel/HomeCarousel'
import Card from '@mui/material/Card';
import axios from 'axios'
import { useSelector } from 'react-redux';
import {  Link } from 'react-router-dom';


import './HomeUser.scss'
import { Button, Typography } from '@mui/material';
import Account from './Account/Account';
import Loading from '../../Utils/Loading/Loading';
import { handleErrors } from '../../Utils/Errors/handleErrors'

// import { userFirstname, userLastname } from '../../features/login/userSlice';

function HomeUser() {

  // Redux-toolkit state import
  const apiUrl = useSelector((state) => state.api.apiUrl);
  const token = useSelector((state) => state.user.token);
  const id = useSelector((state) => state.user.userId);
  const firstname = useSelector((state) => state.user.firstname);
  const lastname = useSelector((state) => state.user.lastname);
	

  // Local States
  const [KidsValue, setKidsValue] = useState([]);
  const [loadinKidsValue, setLoadingKidsValue] = useState(true);

  // Api Calls
  const apiEndpointKids = `/api/v1/users/${id}/kids`

  // console.log(id);

  useEffect(() => {
    if(id){
    axios.get(apiUrl + apiEndpointKids, {headers : {
      'Authorization': `Bearer ${token}`
    }
    })
    .then((response) => {
      // console.log(response.data)
      setKidsValue(response.data);
      //  console.log(KidsValue);
       setLoadingKidsValue(false)
    })
    .catch((error) => {
      console.log('Erreur !', error);
      handleErrors(error)
    })

    
  }
  }, [id,apiEndpointKids,apiUrl,token]);
  
  if (loadinKidsValue ) {
    return <Loading/>
  }
  return (
    <div>
      <HomeCarousel />
      <Card variant='outlined' sx={{border:'1px solid #4462A5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width:'70%', margin: 'auto', marginBottom:'30px', marginTop:'30px'}}>
        <Typography sx={{fontSize: '1.4rem', padding:'30px', fontFamily: 'montserrat'}}>Compte personnel de: {firstname} {lastname}</Typography>
      <Link to = "/profil/utilisateur/compte" >
        <Account />
      </Link>
      </Card>

        <Button className='button'sx={{marginBottom: '30px', textDecoration: 'none'}}>
      <Link to = "/profil/utilisateur/compte" style={{"textDecoration":"none"}}>
          <Typography sx={{fontSize: '1.4rem', padding:'20px', background:'#4462A5', color:'white', letterSpacing:'1px', fontFamily: 'montserrat'}}>Ajouter un compte enfant</Typography>
    </Link>
        </Button>
      {KidsValue.map((e) => (
      <Card key={e.id} className='card' variant='outlined' sx={{border:'1px solid #4462A5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width:'70%', margin: 'auto', marginBottom:'30px', background: '#'}}>
        <Typography sx={{fontSize: '1.4rem', padding:'30px', fontFamily: 'montserrat'}}> Compte enfant : {e.firstname}  </Typography>
        <ButtonList kidId={e.id} username={e.username} avatar={e.profile_avatar}/>

      </Card>
      ))} 
     
    </div>
  )
}

export default HomeUser