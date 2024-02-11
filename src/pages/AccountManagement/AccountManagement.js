import React, { useEffect, useState } from 'react'

import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Avatar from '@mui/material/Avatar';
import { Box, Typography, TextField, Card, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

// COMPONENTS
import Loading from '../../Utils/Loading/Loading';
import KidCard from './KidCard'; 
import UserCard from './UserCard'; 
import KidAddForm from './KidAddForm'; 

// UTILS
import { userLogout } from '../../Utils/Slices/login/userSlice';
import { kidLogout } from '../../Utils/Slices/login/kidSlice';
import { handleErrors } from '../../Utils/Errors/handleErrors';
import { userFirstname, userId, userKidAvatar, userKidId, userKidUsername,userKidFirstname, userLastname, userLogin , userEmail} from '../../Utils/Slices/login/userSlice';


// IMG

import logoBook from '../../assets/img/themes/main/logo.3.png';

// MODALS
import CheckCredentialModal from './Modals/CheckCredentialModal';
import DeleteAccountModal from './Modals/DeleteAccountModal';

// APIS
import { deleteApiKid, deleteApiUser } from '../../ApiCalls/DeleteAccount';
import patchApiUpdateUser from '../../ApiCalls/UpdateUser';

// Context

import { useSnackbar } from '../../Contexts/SnackBarContext';


import './AccountManagement.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4462A5',
    }
  },
  typography: {
    fontFamily: [
      'Montserrat'
    ]
  }
});

function AccountManagement() {


  // Modal
  const [openModalCheckCredential, setOpenModalCheckCredential] = useState(false);
  const [openModalConfirmDeleteUser, setOpenModalConfirmDeleteUser] = useState(false);
  const [openModalDeleteAccountMessage, setOpenModalDeleteAccountMessage] = useState(false);
  const [openModalDeleteKid, setOpenModalDeleteKid] = useState(false);
  const [context, setContext] = useState("");


  // Kid
  const [KidsValue, setKidsValue] = useState([]);
  const [loadinKidsValue, setLoadingKidsValue] = useState(true);
  const [kidAddUsernameValue, setKidAddUsernameValue] = useState("");
  const [kidAddPasswordValue, setKidAddPasswordValue] = useState("");
  const [kidAddFirstNameValue, setKidAddFirstNameValue] = useState("");
  const [kidUpdateUsernameValue, setKidUpdateUsernameValue] = useState("");
  const [kidUpdatePasswordValue, setKidUpdatePasswordValue] = useState("");
  const [kidUpdateFirstNameValue, setKidUpdateFirstNameValue] = useState("");
  const [idKidToDelete, setIdKidToDelete] = useState(0);

  // User
  const token = useSelector((state) => state.user.token);
  const id = useSelector((state) => state.user.userId);
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loadinUserValue, setLoadingUserValue] = useState(true);
  const [userUpdateEmailValue, setUserUpdateEmailValue] = useState("");
  const [userUpdatePasswordValue, setUserUpdatePasswordValue] = useState("");
  const [userUpdateLastNameValue, setUserUpdateLastNameValue] = useState("");
  const [userUpdateFirstNameValue, setUserUpdateFirstNameValue] = useState("");
  const [changeUpdateUser, setChangeUpdateUser] = useState(false);
  const [changeDeleteUser, setChangeDeleteUser] = useState(false);


  // Others
  const dispatch = useDispatch();
  const [changeDatas, setChangeDatas] = useState(false);

  // Alert

  const showSnackbar = useSnackbar(); 

  
  // Api Calls
  const apiUrl = useSelector((state) => state.api.apiUrl);
  const apiEndpointKids = `/api/v1/users/${id}/kids`
  const apiEndpointUsers = `/api/v1/users/${id}`
  const apiEndpointDeleteUser = `/api/v1/users/delete/${id}`

  
  // TODO : factoriser les Alert et les modals
  // TODO : ? ajouter une variable 'checked' lorsque la confirmation du mot de passe a été faites une fois. Cela évitera à l'utilisateur de rentrer sont code 50 fois apres confirmations
  // TODO : ? valider un temps avant la remise à 0 du checked?
  // TODO : mettre un hover au survol des boutons edit, validate et delete
  // TODO : ? Envoyer une confirmation lors du changement de mot de passe par mail?  
  // TODO : ?vérifier les contraintes du mot de passe avant soumission?


  //  GET List of users
  useEffect(() => {
    if (id) {
      axios.get(apiUrl + apiEndpointKids, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => {
          setKidsValue(response.data);
          setLoadingKidsValue(false)
        })
        .catch((error) => {
          console.log(error);
          handleErrors(error)
        })

        axios.get(apiUrl + apiEndpointUsers, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then((response) => {
            setFirstName(response.data.firstname);
            setLastName(response.data.lastname);
            setEmail(response.data.email);
            setLoadingUserValue(false)
           
          })
          .catch((error) => {
            console.log(error);
            showSnackbar("Une erreur s'est produite", "error"); 
          })


        setChangeDatas(false)
    }
  }, [id, changeDatas]);

  // ! nouveaux APPEL: 

  // *************** Delete Kid**************************

    
      const handleOpendeleteKid = (id) => {
        setOpenModalDeleteKid(true);
        setIdKidToDelete(id);
      };
      
      const handleConfirmDelete = (id) => {
        handleClose();
        handleSubmitDelete()
      };
    
      const handleSubmitDelete = () => {
        const successDeleteKid = deleteApiKid(apiUrl + apiEndpointKids + `/${idKidToDelete}`,token,setChangeDatas);

        if(successDeleteKid){
          showSnackbar("La suppression du compte enfant a été effectué", "error"); 

        }else{
          showSnackbar("Une erreur s'est produite lors de la mise supression du compte enfant", "error"); 

        }
        handleClose();
      };


      // *************** Update a User **************************

    const handleSubmitUpdateUser = () => {
    
      // Créez l'objet de mise à jour en fonction des valeurs mises à jour
      const updateUser = {
        lastname: userUpdateLastNameValue === "" ? lastName : userUpdateLastNameValue,
        firstname: userUpdateFirstNameValue === "" ? firstname : userUpdateFirstNameValue,
        email: userUpdateEmailValue === "" ? email : userUpdateEmailValue,
        password: userUpdatePasswordValue
      };
    
      const updateUserJson = JSON.stringify(updateUser);
      const successPatch = patchApiUpdateUser(apiUrl + apiEndpointUsers, updateUserJson, token, handleClose, dispatchDataOnStore);

        if (successPatch) {
          showSnackbar("Mise à jour utilisateur effectué avec succès", "success"); 

          dispatchDataOnStore();

          setChangeDatas(true); // Déclenchez un rafraîchissement des données
      } else {
          showSnackbar("Une erreur s'est produite lors de la mise à jour des informations", "error"); 

      }
    };
    
  
    const dispatchDataOnStore =()=>{

      //dispatch Data on Store

        dispatch(userFirstname(userUpdateFirstNameValue? userUpdateFirstNameValue : firstname));
        dispatch(userLastname(userUpdateLastNameValue? userUpdateLastNameValue: lastName));
        dispatch(userEmail(userUpdateEmailValue ? userUpdateEmailValue: email));
        

      //  Erase value on form
        setUserUpdateFirstNameValue("");
        setUserUpdatePasswordValue("");
        setUserUpdateEmailValue("");
        setUserUpdateLastNameValue("");

        setChangeDatas(true)

    };

  // !------------------

   //****** MODAL ***********

   const handleOpendeleteUser = () => {
    setOpenModalCheckCredential(true);
  };


  const handleClose = () => {
    setOpenModalCheckCredential(false);
    setOpenModalDeleteKid(false);
    setOpenModalConfirmDeleteUser(false);
    setChangeDeleteUser(false);
    setChangeUpdateUser(false);
    setIdKidToDelete(0);

  };
  // *************** Set Datas for Create a Kid**************************

  // TODO: a mettre dans un component
  // Api Call
  const postApi = (routeApi, data) => {
    axios.post(routeApi, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(function (response) {
        showSnackbar("Le compte enfant a bien été crée", "success"); 

        setChangeDatas(true);
        setKidAddFirstNameValue("");
        setKidAddPasswordValue("");
        setKidAddUsernameValue("");
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.message)
        if (error.message === "Request failed with status code 400"){
          showSnackbar("Vous ne pouvez pas utiliser cet identifiant", "error"); 
        }
        else{
          showSnackbar("Une erreur s'est produite lors de la création", "error"); 
        }

      });
  }

  const handleSubmitCreate = () => {

    const profilUser = {
      username: kidAddUsernameValue,
      password: kidAddPasswordValue,
      firstname: kidAddFirstNameValue
    };
    const profilUserJson = JSON.stringify(profilUser);
    postApi(apiUrl + apiEndpointKids, profilUserJson);

  };

  // *************** Set Datas for Update a Kid **************************
  // TODO: a mettre dans un component

  // Api Call
  const patchApiUpdate = (routeApi, data) => {
    axios.patch(routeApi, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(function (response) {
        showSnackbar("La mise à jour a bien été prise en compte", "success"); 

        setChangeDatas(true)
        setKidUpdateFirstNameValue("");
        setKidUpdatePasswordValue("");
        setKidUpdateUsernameValue("");
      })
      .catch(function (error) {
        console.log(error);
        
        if (error.message === "Request failed with status code 409"){
          showSnackbar("Vous ne pouvez pas utiliser cet identifiant", "error"); 
        }
        else{
          showSnackbar("Une erreur s'est produite lors de la mise à jour ", "error"); 
        }
      });
  }

  const handleSubmitUpdate = (id) => {
    console.log("-----------je suis dans le handleSubmit Update--------")
    const profilUser = {
      username: kidUpdateUsernameValue,
      password: kidUpdatePasswordValue,
      firstname: kidUpdateFirstNameValue
    };
    const profilUserJson = JSON.stringify(profilUser);
    patchApiUpdate(apiUrl + apiEndpointKids + `/${id}`, profilUserJson);

  };


   // *************** Delete User **************************
  // TODO: a mettre dans un component

    // Api Call
   const deleteApiUser = (routeApi) => {
    axios.delete(routeApi, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(function (response) {
        console.log(response)
        setOpenModalDeleteAccountMessage(true)

        // logout user
        dispatch(userLogout());
        dispatch(kidLogout())
        localStorage.removeItem('user');
        localStorage.removeItem('kid');
      })
      .catch(function (error) {
        console.log(error);
        showSnackbar("Une erreur s'est produite lors de la suppression", "error"); 

      });
  }

  const handleSubmitDeleteUser = () => {
  
    deleteApiUser(apiUrl + apiEndpointDeleteUser );
    handleClose();

  };

  // **************************************************************
  if (loadinKidsValue || loadinUserValue) {
    return <Loading />
  }
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Box sx={{ width: { md: '80%' }, border: '1px solid #4462A5', justifyContent: 'space-between', alignItems: 'center', margin: 'auto' }}>

          <Box sx={{ display: 'flex', alignItems: 'start', flexDirection: 'column', Width: '100%' }}>
            <Box sx={{ margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: '20px' }}>
              <Avatar className='loginAvatar' sx={{ m: 1 }}>
                <AutoStoriesIcon />
              </Avatar>
              <Typography component="h1" variant="h3" sx={{ fontFamily: 'montserrat', color: '#4462A5' }}>
                Réglages
              </Typography>

              {/* User Card informations */}
              <Card  variant='outlined' sx={{ border: '1px solid #4462A5', marginBottom: '30px', marginTop: '30px', marginLeft: '20px', width: '40%' }}>

                <Typography sx={{ fontSize: '1.4rem', padding: '15px', fontFamily: 'montserrat', margin: 'auto', color: 'white', background: '#4462A5' }}>Informations du compte parent</Typography>
              </Card>
              <UserCard
                email={userEmail}
                firstname={firstname}
                lastName={lastName}
                userUpdatePasswordValue={userUpdatePasswordValue}
                setUserUpdateEmailValue={setUserUpdateEmailValue}
                setUserUpdateFirstNameValue={setUserUpdateFirstNameValue}
                setUserUpdatePasswordValue={setUserUpdatePasswordValue}
                setUserUpdateLastNameValue={setUserUpdateLastNameValue}
                setOpenModalCheckCredential={setOpenModalCheckCredential}
                setChangeUpdateUser={setChangeUpdateUser}
                setChangeDeleteUser={setChangeDeleteUser}
                setContext={setContext}
              />

              <Card variant='outlined' sx={{ border: '1px solid #4462A5', marginBottom: '30px', marginTop: '30px', marginLeft: '20px', width: '40%' }}>
                <Typography sx={{ fontSize: '1.4rem', padding: '15px', fontFamily: 'montserrat', color: 'white', background: '#4462A5' }}>Informations des comptes enfants</Typography>
              </Card>
              <Typography sx={{ fontSize: '1rem', padding: '10px', fontFamily: 'montserrat', color: 'red' }}>En ajoutant un identifiant et un mot de passe au compte enfant, vous lui permettez d'accèder de manière autonome à son espace enfant. En lui transmettant ses accès, il pourra consulter son espace personnel et ses récompenses.</Typography>

             {/* KID CARD to edit ***** */}
              {KidsValue.map((kid) => (
                <KidCard
                  key={kid.id}
                  kid={kid}
                  handleOpendeleteKid={handleOpendeleteKid} // Passer la fonction handleOpendeleteKid comme prop

                />
              ))}
              {/* ***** */}


              <Card variant='outlined' sx={{ border: '1px solid #4462A5', marginBottom: '30px', marginTop: '30px', marginLeft: '20px', width: '40%' }}>
                <Typography sx={{ fontSize: '1.4rem', padding: '15px', fontFamily: 'montserrat', color: 'white', background: '#4462A5' }}>Créer un nouveau profil enfant</Typography>
              </Card>
              {/* KID CARD to add ***** */}
              <KidAddForm
                kidAddFirstNameValue={kidAddFirstNameValue}
                setKidAddFirstNameValue={setKidAddFirstNameValue}
                kidAddUsernameValue={kidAddUsernameValue}
                setKidAddUsernameValue={setKidAddUsernameValue}
                kidAddPasswordValue={kidAddPasswordValue}
                setKidAddPasswordValue={setKidAddPasswordValue}
                handleSubmitCreate={handleSubmitCreate}
              />
            

            </Box>
        
            {/* ******* MODAL ********** */}
                  {/*  User*/}
                  {/* CheckCredential */}                
                  <CheckCredentialModal 
                    open={openModalCheckCredential}
                    handleClose={handleClose}
                    title={changeDeleteUser ? "Suppression du compte?" : "Modification du compte?"}
                    apiUrl ={apiUrl}
                    apiEndpointUsers = {apiEndpointUsers}
                    token = {token}
                    context={context}
                    handleSubmitUpdateUser={handleSubmitUpdateUser}
                    setOpenModalConfirmDeleteUser={setOpenModalConfirmDeleteUser}
                    setOpenModalDeleteKid={setOpenModalDeleteKid}
                  />
                        {/* Confirm Delete */}

                          <Modal
                          open={openModalConfirmDeleteUser}
                          onClose={handleClose}
                          aria-labelledby="parent-modal-title"
                          aria-describedby="parent-modal-description"
                        >
                          <Box sx={{
                            width: 400,
                            backgroundColor: 'white',
                            margin: 'auto',
                            alignContent: 'center'
                          }}
                          >

                            <h2 id="parent-modal-title"> Suppression du compte?</h2>
                            <p className="parent-modal-description">
                              Mot de passe confirmé.
                            </p>
                            <p className="parent-modal-description">

                            Etes-vous certain de vouloir supprimer ce compte? Cette action sera définitive et entrainera la suppression des comptes enfants associés.
                            </p>
                            <Box component="form" noValidate 
                              sx={{
                                margin: 10
                              }}
                            >
                              <Button
                                className="closeButton"
                                fullWidth
                                variant="contained"
                                onClick={handleClose} 
                                sx={{ mt: 2, mb: 2, background: 'red' }}
                              >
                                Non, c'est une erreur. Annuler.
                              </Button>
                              <Button
                                className="deleteButton"
                                fullWidth
                                variant="contained"
                                onClick={handleSubmitDeleteUser}
                                sx={{ mt: 2, mb: 2, background: 'green' }}
                              >
                                Oui, je suis sûr. Supprimer.
                              </Button>
                            </Box>
                          </Box>
                        </Modal> 
                      {/* Good Bye message when user delete account */}

                      <Modal
                          open={openModalDeleteAccountMessage}
                          onClose={handleClose}
                          aria-labelledby="parent-modal-title"
                          aria-describedby="parent-modal-description"
                          disableEnforceFocus
                        >
                          <Box sx={{
                            width: '40%',
                            padding:10,
                            backgroundColor: 'white',
                            margin: 'auto',
                            alignContent: 'center',
                            textAlign:'center'
                          }}
                          >

                            <h2 id="parent-modal-title"> Merci d'avoir fait un bout de chemin avec nous!</h2>
                            <p className="parent-modal-delete-account" >
                            Nous avons été heureux de vous compter parmis nos membres.
                            </p>
                            <p className="parent-modal-delete-account" >
                            Nous vous souhaitons une belle journée. 
                            </p>
                            <p className="parent-modal-delete-account" >

                            Bonne continuation. 
                             </p>

                            <img className="logoModal" src={logoBook} alt="logo Book" width={'30%'} >
 
                            
                            </img>
                          <Link to={'/'} style={{"textDecoration":"none"}}>
                          
                              <Button
                                className="closeButton"
                                fullWidth
                                variant="contained"
                                onClick={handleClose} 
                                sx={{ mt: 2, mb: 2, background: 'blue' }}
                              >
                              Retour à l'Accueil
                              </Button>
                          </Link>
                              
                            </Box>
                        </Modal> 

                        {/*----- Kid ------- */}
                        <DeleteAccountModal
                          open={openModalDeleteKid}
                          handleClose={handleClose}
                          handleConfirmDelete={handleConfirmDelete}
                          idKidToDelete={idKidToDelete}
                          handleSubmitDelete={handleSubmitDelete}
                        />
                       

          </Box>

        </Box>

        
      </div>
    </ThemeProvider>
  )
}

export default AccountManagement