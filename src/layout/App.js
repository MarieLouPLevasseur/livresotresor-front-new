


import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import Navbar from './Navbar/Navbar'
import Home from '../pages/Home/Home';
import KidLogin from '../pages/LoginKid/LoginKid'
import Register from '../pages/Register/Register'
import Profiles from '../pages/Profiles/Profiles'
import Legal from '../pages/Legal/Legal'
import Tutorial from '../pages/Tutorial/Tutorial'
import Faq from '../pages/Faq/Faq'
import Cookies from '../pages/Cookies/Cookies'
import About from '../pages/About/About'
import HomeUser from '../pages/HomeUser/HomeUser'
import AccountManagement from '../pages/AccountManagement/AccountManagement'
import HomeKid from '../pages/HomeKid/HomeKid'
import Search from '../pages/Search/Search'
import MyBooks from '../pages/MyBooks/MyBooks'
import BookConfig from '../pages/BookConfig/BookConfig'
import Rewards from '../pages/Rewards/Rewards'
import Book from '../pages/Book/Book'
import Footer from './Footer/Footer'
import PageNotFound from '../pages/ErrorsPages/PageNotFound/PageNotFound';
import NotAllowed from '../pages/ErrorsPages/NotAllowed/NotAllowed';
import ErrorServer from '../pages/ErrorsPages/ErrorServer/Error';
// ADMIN
import AdminIndex from '../pages/Admin/Index/Index';
import AdminAvatarIndex from '../pages/Admin/Avatars/Index';
import AdminDiplomasIndex from '../pages/Admin/Diplomas/Index';
import AdminUsersIndex from '../pages/Admin/Users/Index';

import AdminUpdateAvatar from '../pages/Admin/Avatars/UpdateAvatarsList';
// import AdminAvatarIndex from '../pages/Admin/Avatars/Index';
// import AdminDiplomasIndex from '../pages/Admin/Diplomas/Index';
// import AdminUsersIndex from '../pages/Admin/Users/Index';

import UserLogin from '../pages/LoginUser/LoginUser';
import { userFirstname, userId, userKidAvatar, userKidId, userKidUsername,userKidFirstname, userLastname, userLogin , userEmail} from '../Utils/Slices/login/userSlice';
import { kidAvatar, kidId, kidLogin, kidUsername, kidProgress, kidFirstname } from '../Utils/Slices/login/kidSlice';

import SessionTimeout from '../Utils/SessionTimeout';
import { useDispatch, useSelector } from 'react-redux';

import { SnackbarProvider } from'../Contexts/SnackBarContext';

import './App.scss';

function App() {

  const dispatch = useDispatch();

  const isLogUser = useSelector((state) => state.user.isLogUser);
  const isLogKid = useSelector((state) => state.kid.isLogKid);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    const loggedUserKids = JSON.parse(localStorage.getItem('userKids'));
    const loggedKid = JSON.parse(localStorage.getItem('kid'));
    const progressKid = JSON.parse(localStorage.getItem('kidProgress'));
    if (loggedUser) {
      dispatch(userLogin(loggedUser.token));

  // set user data only
      dispatch(userId(loggedUser.id));
      dispatch(userFirstname(loggedUser.firstname));
      dispatch(userLastname(loggedUser.lastname));
      dispatch(userEmail(loggedUser.email));

  // set kid user data only
    const kidAvatar = loggedUserKids ? loggedUserKids.avatar : null;
    const KidUsername = loggedUserKids ? loggedUserKids.username : null;
    const kidFirstname = loggedUserKids ? loggedUserKids.firstname : null;
    const KidId = loggedUserKids ? loggedUserKids.kidId : null;

      dispatch(userKidAvatar(kidAvatar));
      dispatch(userKidUsername(KidUsername));
      dispatch(userKidFirstname(kidFirstname));
      dispatch(userKidId(KidId));

  // set kid data if connected directly only

    } else if (loggedKid) {
      dispatch(kidLogin(loggedKid.token));
      dispatch(kidId(loggedKid.id));
      dispatch(kidUsername(loggedKid.username));
      dispatch(kidFirstname(loggedKid.firstname));
      dispatch(kidAvatar(loggedKid.profil_avatar));
      dispatch(kidProgress(progressKid.progress));

    }
  },[]);


  return (
    <div className="App">
    <SnackbarProvider>
      <Navbar />
      <Routes>
       {/* ADMIN */}
        {/* TODO: mettre les sécurité pour les roles admin uniquement */}
         {/* index */}
       <Route path="/admin/index" element={<AdminIndex />} />
       <Route path="/admin/diplomes/index" element={<AdminDiplomasIndex />} />
       <Route path="/admin/utilisateurs/index" element={<AdminUsersIndex />} />
       <Route path="/admin/avatars/index" element={<AdminAvatarIndex />} />
        {/* update */}
       <Route path="/admin/avatars/edit/:id" element={<AdminUpdateAvatar />} />
        
       {/* Global */}
        <Route path="/" element={<Home />} />
        <Route path="/mentions-legales" element={<Legal />} />
        <Route path="/tutoriel" element={<Tutorial />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/a-propos" element={<About />} />
        
         {/* Connected */}
        {/* {isLogKid && <Route path="/inscription" element={<NotAllowed />} />} */}
        {!isLogKid && <Route path="/inscription" element={<Register />} />}
        <Route path="/connexion-enfant" element={<KidLogin />} />
        <Route path='/connexion-parent' element={<UserLogin />} />
        <Route path="/profil" element={<Profiles />} />
        {isLogUser && <Route path="/profil/utilisateur" element={<HomeUser />} />}
        {isLogKid && <Route path="/profil/utilisateur" element={<NotAllowed />} />}
        <Route path="/profil/utilisateur/compte" element={<AccountManagement />} />
        <Route path="/profil/enfant" element={<HomeKid />} />
        <Route path="/recherche" element={<Search />} />
        <Route path="/mes-livres" element={<MyBooks />} />
        <Route path="/recompenses" element={<Rewards />} />
        {/* <Route path="/recherche/voir-livre/:identifier" element={<Book />} /> */}
        <Route path="/recherche/voir-livre" element={<Book />} />
        <Route path="/mes-livres/voir-livre/:id" element={<BookConfig />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/error-server" element={<ErrorServer />} />
      </Routes>
      </SnackbarProvider>
      
      <SessionTimeout />
      <Footer />
    </div>
  );
}

export default App;
