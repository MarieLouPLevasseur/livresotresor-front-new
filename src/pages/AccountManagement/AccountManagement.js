import React, { useEffect, useState } from 'react'

import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Avatar from '@mui/material/Avatar';
import { Box, Typography, Card } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useDispatch, useSelector } from 'react-redux';
import axios from 'axios'

// COMPONENTS
import Loading from '../../Utils/Loading/Loading';
import KidCard from './KidCard'; 
import UserCard from './UserCard'; 
import KidAddForm from './KidAddForm'; 

// MODALS
import CheckCredentialModal from './Modals/CheckCredentialModal';
import DeleteAccountModal from './Modals/DeleteAccountModal';
import GoodbyeModal from './Modals/GoodbyeModal';

// UTILS
import { userLogout } from '../../Utils/Slices/login/userSlice';
import { kidLogout } from '../../Utils/Slices/login/kidSlice';
import { handleErrors } from '../../Utils/Errors/handleErrors';
import { userFirstname, userLastname, userEmail} from '../../Utils/Slices/login/userSlice';

// APIS
import { deleteApiKid, deleteApiUser } from '../../ApiCalls/DeleteAccount';
import {patchApiUpdateUser} from '../../ApiCalls/UpdateUser';
import {patchApiUpdatekid} from '../../ApiCalls/UpdateUser';

import { generateUserApiEndpoint, generateKidsApiEndpoint, generateDeleteUserApiEndpoint } from '../../Utils/apiEndpoints';


// Context
import { useSnackbar } from '../../Contexts/SnackBarContext';

// CSS
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
  const [openModalConfirmDeleteAccount, setOpenModalConfirmDeleteAccount] = useState(false);
  const [openModalGoodbye, setOpenModalGoodbye] = useState(false);
  const [context, setContext] = useState("");


  // Kid
  const [KidsValue, setKidsValue] = useState([]);
  const [loadinKidsValue, setLoadingKidsValue] = useState(true);
  const [kidAddUsernameValue, setKidAddUsernameValue] = useState("");
  const [kidAddPasswordValue, setKidAddPasswordValue] = useState("");
  const [kidAddFirstNameValue, setKidAddFirstNameValue] = useState("");
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
  const [changeDeleteUser, setChangeDeleteUser] = useState(false);


  // Others
  const dispatch = useDispatch();
  const [changeDatas, setChangeDatas] = useState(false);

  // Alert

  const showSnackbar = useSnackbar(); 

  
  // Api Calls
  const apiUrl = useSelector((state) => state.api.apiUrl);
  // TODO : optimiser pour le deleteEndpointKid
  const apiEndpointUsers = generateUserApiEndpoint(id);
  const apiEndpointKids = generateKidsApiEndpoint(id);
  const apiEndpointDeleteUser = generateDeleteUserApiEndpoint(id);

  
  // TODO : ? Envoyer une confirmation lors du changement de mot de passe par mail?  
  // TODO : ?vérifier les contraintes du mot de passe avant soumission?
  // TODO : lors de la mise à jour enfant, le state dans le kidCard ne se met pas à jour (l'état n'es tpas surveiller correctement après modification)

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

  // *************** DELETE Kid and User **************************

      const handleConfirmDelete = () => {
        handleClose();
        deleteAccount();
      };
    
      const deleteAccount = () => {
        // KID
        if (context === 'deleteKid') {
          deleteApiKid(apiUrl + apiEndpointKids + `/${idKidToDelete}`, token)
            .then(successDeleteKid => {
              if (successDeleteKid) {
                showSnackbar("La suppression du compte enfant a été effectuée", "success");
                setChangeDatas(true);
              } else {
                showSnackbar("Une erreur s'est produite lors de la suppression du compte enfant", "error");
              }
              handleClose();
            })
            .catch(error => {
              console.log(error);
              showSnackbar("Une erreur s'est produite lors de la suppression du compte enfant", "error");
              handleClose();
            });
        }
      
        // USER
        if (context === 'deleteUser') {
      
          deleteApiUser(apiUrl + apiEndpointDeleteUser, token)
            .then(successDeleteUser => {
              console.log(successDeleteUser);
              if (successDeleteUser) {

                  setOpenModalGoodbye(true)

                  // logout user
                  dispatch(userLogout());
                  dispatch(kidLogout());
                  localStorage.removeItem('user');
                  localStorage.removeItem('kid');
              } else {
                showSnackbar("Une erreur s'est produite lors de la suppression du compte", "error");
              }
            })
            .catch(error => {
              console.log(error);
              showSnackbar("Une erreur s'est produite lors de la suppression", "error");
            });
        }
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
      const successPatchUser = patchApiUpdateUser(apiUrl + apiEndpointUsers, updateUserJson, token);

        if (successPatchUser) {
          showSnackbar("Mise à jour utilisateur effectué avec succès", "success"); 

          dispatchUserDataOnStore();

          setChangeDatas(true); // Déclenchez un rafraîchissement des données
      } else {
          showSnackbar("Une erreur s'est produite lors de la mise à jour des informations", "error"); 

      }
    };
    
  
    const dispatchUserDataOnStore =()=>{

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

  //****** MODAL ***********

    const handleClose = () => {
      setOpenModalCheckCredential(false);
      setIdKidToDelete(0);
      setOpenModalConfirmDeleteAccount(false);
      setOpenModalGoodbye(false)

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

          // Reset
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

    const handleSubmitUpdateKid = (id,updatedKidInfo) => {
      const profilKidJson = JSON.stringify(updatedKidInfo);

      patchApiUpdatekid(apiUrl + apiEndpointKids + `/${id}`, profilKidJson, token)
      .then((success) => {
        if (success) {
          showSnackbar("Mise à jour enfant effectuée avec succès", "success");
          setChangeDatas(true); 
        } else {
          showSnackbar("Une erreur s'est produite lors de la mise à jour des informations enfant", "error");
        }
      })
      .catch((error) => {
        console.error("Error while updating kid information:", error);
        showSnackbar("Une erreur s'est produite lors de la mise à jour des informations enfant", "error");
      });
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
                email={email}
                firstname={firstname}
                lastName={lastName}
                userUpdatePasswordValue={userUpdatePasswordValue}
                setUserUpdateEmailValue={setUserUpdateEmailValue}
                setUserUpdateFirstNameValue={setUserUpdateFirstNameValue}
                setUserUpdatePasswordValue={setUserUpdatePasswordValue}
                setUserUpdateLastNameValue={setUserUpdateLastNameValue}
                setOpenModalCheckCredential={setOpenModalCheckCredential}
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
                  setOpenModalConfirmDeleteAccount={setOpenModalConfirmDeleteAccount} // Passer la fonction handleOpendeleteKid comme prop
                  setContext={setContext}
                  setIdKidToDelete={setIdKidToDelete}
                  handleSubmitUpdateKid={handleSubmitUpdateKid}
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
                      
                  <CheckCredentialModal 
                    open={openModalCheckCredential}
                    handleClose={handleClose}
                    title={changeDeleteUser ? "Suppression du compte?" : "Modification du compte?"}
                    apiUrl ={apiUrl}
                    apiEndpointUsers = {apiEndpointUsers}
                    token = {token}
                    context={context}
                    handleSubmitUpdateUser={handleSubmitUpdateUser}
                    handleSubmitDeleteAccount={handleSubmitUpdateUser}
                    setOpenModalConfirmDeleteAccount={setOpenModalConfirmDeleteAccount}
                 
                  />

                  <GoodbyeModal
                    open={openModalGoodbye}
                    handleClose={handleClose}
                  />
                      

                        {/*----- Kid and User Delete------- */}
                      
                  <DeleteAccountModal
                    open={openModalConfirmDeleteAccount}
                    handleClose={handleClose}
                    handleConfirmDelete={handleConfirmDelete}
                  />

          </Box>
        </Box>
      </div>
    </ThemeProvider>
  )
}

export default AccountManagement