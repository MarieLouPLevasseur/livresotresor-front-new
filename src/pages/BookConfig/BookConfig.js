import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { useNavigate } from 'react-router-dom';



import { Typography, Box, Button, Card, Rating, TextField, Grid, TextareaAutosize } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';



import BookMenu from '../Book/BookMenu/BookMenu';
import BookIconeMenu from '../Book/BookIconeMenu/BookIconeMenu';
import Loading from '../../Utils/Loading/Loading';
import HomeCarousel from '../Home/HomeCarousel/HomeCarousel';
import HomeKidButtons from '../HomeKid/HomeKidButtons/HomeKidButtons';
import { handleErrors } from '../../Utils/Errors/handleErrors'

import './BookConfig.scss'

// const theme = createTheme({
//   palette: {
//     primary: {
//       // main: '#4462A5',
//     }
//   },
//   typography: {
//     fontFamily: [
//       'Montserrat'
//     ]
//   }
// });

function BookConfig() {

  // UseParams
  const { id } = useParams();
  console.log({ id }, 'id book');

  //Use Navigate
  const navigate = useNavigate();

  // Redux-toolkit state import
  const apiUrl = useSelector((state) => state.api.apiUrl);
  // const token = useSelector((state) => state.kid.token);
  // const kidId = useSelector((state) => state.kid.id);
  const isLogUser = useSelector((state) => state.user.isLogUser);

   // set token
   const token = useSelector(state => {
    if(isLogUser) {
        return state.user.token
    }
    return state.kid.token;
   })

     // set id
     const kidId = useSelector(state => {
      if(isLogUser) {
          return state.user.kidId
      }
      return state.kid.id;
     })

  // Local States
  const [Book, setBook] = useState([]);
  const [loadingBook, setLoadingBook] = useState(true);
  const [LoadingCategories, setLoadingCategories] = useState(true);
  const [LoadingCollections, setLoadingCollections] = useState(true);
  const [CardsFilter, setCardsFilter] = useState([]);
  const [LoadingCards, setLoadingCards] = useState(true);
  const [Cards, setCards] = useState([]);

  const [currentComment, setcurrentComment] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentRating, setCurrentRating] = useState(0);
  const [currentCollection, setCurrentCollection] = useState("");
  const [currentIsRead, setCurrentIsRead] = useState("");


  // Local Select State
  const [category, setCategory] = useState(""); // Category name
  const [collection, setCollection] = useState("");
  // const [newCollectionValue, setNewCollectionValue] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [collectionsList, setCollectionsList] = useState([]);
  const [selectedRead, setSelectedRead] = useState(false);
  const [selectedWish, setSelectedWish] = useState(false);
  const [bookkidId, setBookkidId] = useState(true);

  // Local Form State
  const [collectionNameValue, setCollectionNameValue] = useState("");
  const [commentValue, setComment] = useState("");
  const [isReadValue, setIsRead] = useState("");
  const [categoryIdValue, setCategoryId] = useState(0); // Category Id
  const [ratingValue, setRatingValue] = useState(0);

  // Error states
  const [alertErrorSubmit, setAlertErrorSubmit] = useState(false);
  const [alertSuccesSubmit, setAlertSuccesSubmit] = useState(false);
  const [alertErrorSubmitIsRead, setAlertErrorSubmitIsRead] = useState(false);
  const [alertErrorSubmitCollection, setAlertErrorSubmitCollection] = useState(false);
  const [alertErrorSubmitDelete, setAlertErrorSubmitDelete] = useState(false);
  const [alertSuccesSubmitDelete, setAlertSuccesSubmitDelete] = useState(false);
  const [alertSuccesSubmitDeleteCanceled, setAlertSuccesSubmitDeleteCanceled] = useState(false);


  // Api Calls
  const apiEndpointBook = `/api/v1/kids/${kidId}/books/${id}`
  const apiEndpointCategories = `/api/v1/categories`
  const apiEndpointCollections = `/api/v1/kids/${kidId}/bookkids/series`
  const apiEndpointSubmitBookChange = `/api/v1/kids/${kidId}/bookkids/${bookkidId}`
  const apiEndpointDeleteBook = `/api/v1/kids/${kidId}/bookkids/${bookkidId}`

  // Selection of textArea in form
  const collectionNameInput = useRef(null)
  const commentInput = useRef(null)

  

  useEffect(() => {
    if (kidId) {
      axios.get(apiUrl + apiEndpointBook, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => {
          // console.log("*********UseEffect*****************")

          setBook(response.data);
          // console.log(response.data, " Book datas");
          setCardsFilter(response.data);
          setCards(response.data);
          setLoadingCards(false);
          setLoadingBook(false);

          setcurrentComment(response.data[0].comment);

          setBookkidId(response.data[0].id)
          // console.log({ bookkidId }, "value current bookkid id")

          // setIsRead(response.data[0].is_read)
          setCurrentIsRead(response.data[0].is_read)
          // console.log({ currentIsRead }, "is read Data on book")

          if (response.data[0].series !== null) {
            setCollectionNameValue(response.data[0].series.name);
            setCurrentCollection(response.data[0].series.name);
          }
          else {
            setCurrentCollection("je n'ai pas encore choisi de collection");
          }
          // console.log({ currentCollection }, "collection value on book")

          if (response.data[0].category.length !== 0) {
            setCurrentCategory(response.data[0].category.name);
          }
          else {
            setCurrentCategory("je n'ai pas encore choisi de catégorie");
          }

          if (response.data[0].rating !== null) {
            // setRatingValue(response.data[0].rating);
            setCurrentRating(response.data[0].rating);
          }
          // console.log({ ratingValue }, "rating value on book")

        })
        .catch((error) => {
          console.log('Erreur !', error);
          handleErrors(error)
        });

      // call API for Categories
      axios.get(apiUrl + apiEndpointCategories, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => {
          // console.log("*********QueryListCategories*****************")

          // console.log(response.data)
          setCategoriesList(response.data, "categorie list data")
          setLoadingCategories(false);

        })
        .catch((error) => {
          console.log('Erreur !', error);
          handleErrors(error)
        });

      // call API for Collections
      axios.get(apiUrl + apiEndpointCollections, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => {
          console.log("*********QueryListCollections*****************")

          console.log(response.data, "collection List data")
          setCollectionsList(response.data)
          setLoadingCollections(false);


        })
        .catch((error) => {
          console.log('Erreur !', error);
          handleErrors(error)
        });
    }
  }, [kidId]);


  //TODO clean form after submission

  // call API for Submit form

  const patchApi = (routeApi, data) => {
    axios.patch(routeApi, data, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`

      },
    })
      .then(function (response) {
        console.log(response, "réponse envoi données");
        setAlertSuccesSubmit(true);

        //reset Form after submit
        // OK
        setCollection("");
        setRatingValue(0);
        commentInput.current.value = "";
        setCategory("");
        setSelectedRead(false);
        setSelectedWish(false);

        //TODO Reset TextArea : new Collection 
        // ! meme format que comment mais ne disparait pas ??
        collectionNameInput.current.value = "";

      })
      .catch(function (error) {
        console.log(error);
        setAlertErrorSubmit(true)
        handleErrors(error)
      });
  }
  // call API for Delete Book

  const deleteApi = (routeApi) => {
    axios.delete(apiUrl+apiEndpointDeleteBook, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
  
      },
    })
      .then(function (response) {
        console.log(response, "réponse");
        setAlertSuccesSubmitDelete(true);
  
        // TODO mettre un délai pour voir le message de confirmation s'afficher avant redirection
        setTimeout(() => navigate('/profil/enfant'),3000);
  
  
      })
      .catch(function (error) {
        console.log(error,"erreur");
        setAlertErrorSubmitDelete(true)
        handleErrors(error)
      });
  }




  // -----HANDLE CHANGE on form fields ----------
  const handleChangeCategory = (event) => {
    // console.log("*********handlechangecategory*****************")
    // console.log(event.target.value, 'event entrant dans handleChange Category')
    setCategory(event.target.value);
    setCategoryId(event.target.value.id);
    if (category) {
      setCardsFilter(Cards.filter((data) => data.name === category));
    }
  };

  const handleChangeCollectionList = (event) => {
    // console.log("*********HandlechangeCollectionList*****************")
    setCollection(event.target.value);
    setCollectionNameValue(event.target.value);
    // console.log({ collection }, "data collection and collectionNamevalue on handlechange")


    if (collection) {
      setCardsFilter(Cards.filter((data) => data.name === collection));
    }
  };

  const handleChangeNewCollectionName = (event) => {
    // console.log("*********handleChangeNewCollectionName*****************")
    //erase list selected
    setCollection("");
    if (collection) {
      setCardsFilter(Cards.filter((data) => data.name === collection));
    }
  };


  const handleChangeRating = (event) => {
    // console.log("*********HandlechangeRating*****************")
    // console.log(event.target.value, "data rating on handlechange")
    setRatingValue(event.target.value);

    if (collection) {
      setCardsFilter(Cards.filter((data) => data.name === collection));
    }
  };

  const handleChangeRadioButton = event => {
    // console.log("*********HandleChangeRadioButton*****************")

    if (event.target.value == "true") {
      setIsRead(true);
      setSelectedRead(true);
      setSelectedWish(false);

    }
    if (event.target.value == "false") {
      setIsRead(false);
      setSelectedWish(true);
      setSelectedRead(false);

    }
  };



  // ---------------------------
  if (loadingBook || LoadingCategories || LoadingCards || LoadingCollections) {
    return <Loading />
  }


  // ------  HANDLE SUBMIT FORM ------------------
  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (currentIsRead === "") {
      setAlertErrorSubmitIsRead(true);

    }
    // TODO condition ne fonctionne pas car même valeur pour list ou nouvelle collection
    // else if(collectionNameValue.toString.length < 2){
    //   setAlertErrorSubmitCollection(true);

    // }
    else {
      console.log("*********HandleSubmitForm*****************")
      const loginFormData = {
        "is_read": isReadValue !== "" ? isReadValue : currentIsRead,
        "comment": commentValue !== "" ? commentValue : Book.comment,
        "rating": ratingValue !== 0 ? parseFloat(ratingValue) : Book.rating,
        "category": { "id": + categoryIdValue !== "" ? categoryIdValue : Book.category.id },
        "series": { "name": + collectionNameValue !== "je n'ai pas encore choisi de collection" ? collectionNameValue : Book.series.name },
      }
      setcurrentComment(commentValue !== "" ? commentValue : currentComment);
      if (category.name !== undefined) {
        setCurrentCategory(categoryIdValue !== 0 ? category.name : currentCategory)
      }

      // Update current data on view  

      setCurrentRating(ratingValue !== 0 ? parseFloat(ratingValue) : currentRating);
      if (collectionNameValue.replace(/\s/g, '') !== "") {
        setCurrentCollection(collectionNameValue)
      }
      else {
        setCurrentCollection(currentCollection)
      }
      setCurrentIsRead(isReadValue !== "" ? isReadValue : currentIsRead);

      patchApi(apiUrl + apiEndpointSubmitBookChange, loginFormData);
    }
  };

  

   // ------  HANDLE DELETE BOOK ------------------

   const handleSubmitToDelete = () => {
   

      confirmAlert({
        title: 'Suppression du livre',
        message: 'Es-tu sûr de vouloir supprimer ce livre? Si tu cliques "oui", tu ne pourras plus revenir en arrière, il sera supprimé".',
        buttons: [
          {
            label: 'Oui je suis sûr',
            onClick: () => deleteApi()
          },
          {
            label: 'Non je le conserve',
            onClick: () => setAlertSuccesSubmitDeleteCanceled(true)
            //juste on ferme la fenêtre
          }
        ]
      });
    
  };
  

  return (
    // <ThemeProvider theme={theme}>

      <div>

        <HomeCarousel />
        <Box className="icone-menu" sx={{ position: 'relative' }} >

          <BookIconeMenu sx={{ marginLeft: { xs: '5px', sm: '5px' }, display: { xs: 'block', sm: 'none' }, position: { xs: 'fixed', md: 'fixed' } }} />
        </Box>
        <Typography component="h1" variant="h3" sx={{ fontFamily: 'montserrat', color: '#4462A5', mt: '20px', marginBottom: '20px', marginLeft: { md: '-70px' } }}>
          {Book[0].book.title}
        </Typography>

        <Box sx={{ display: 'flex' }}>
          <HomeKidButtons />

          <Box sx={{ display: 'flex', padding: '20px', flexDirection: { xs: 'column', sd: 'row', md: 'row' }, width: '80%', margin: 'auto', ml:{md:10}, justifyItems:'center' }}>

            <Box
              component="img"
              alt="Couverture d'un livre"
              src={Book[0].book.cover}
              sx={{
                height: 300,
                width: 250,
                maxHeight: { xs: 200, md: 300 },
                maxWidth: { xs: 200, md: 300 },
                margin: { sx: 'auto', sd: 'auto', md: 'auto' },
                alignItems: { sd: 'row' },
                alignSelf: 'center',
                
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'start', width: '70%', flexDirection: { xs: 'column', sm: 'row' }, margin: 'auto' }}>

              <Box sx={{ width: { xs: '100%', md: '50%', sd: '30%' }, textAlign: 'center', margin: 'auto' }}>
                <Typography sx={{ mt: 3, mb: 1, fontFamily: 'Montserrat', fontWeight: 700 }}>
                  Ecrit par:
                </Typography>
                <Typography sx={{ mt: 1, mb: 3, fontFamily: 'Montserrat', fontWeight: 400 }}>
                  {Book[0].book.authors[0].name}
                </Typography>
                <Typography sx={{ mt: 3, mb: 1, fontFamily: 'Montserrat', fontWeight: 700 }}>
                  Aux éditions:
                </Typography>
                <Typography sx={{ mt: 1, mb: 3, fontFamily: 'Montserrat', fontWeight: 400 }}>
                  {Book[0].book.publisher}
                </Typography>
                <Typography sx={{ mt: 3, mb: 1, fontFamily: 'Montserrat', fontWeight: 700 }}>
                 Description:
                </Typography>
                <Typography sx={{ m: 'auto', mt: 3, fontFamily: 'Montserrat', fontWeight: 300, width: '80%', fontStyle: 'italic', marginBottom: '30px' }}>
                  "{Book[0].book.description}"
                </Typography>
              </Box>
            </Box>

          </Box>
        </Box>
            {/* ************** Personnal information on book from the kid **************************/}
            {console.log({ currentCategory }, "category value on book")}
        <Box sx={{ width: { xs: '100%', md: '50%' }, textAlign: 'center', margin: 'auto' }}>

          <Rating name="read-only" precision={0.5} value={currentRating} readOnly />

          <Typography sx={{ mt: 3, mb: 1, fontFamily: 'Montserrat', fontWeight: 700 }}>
            Mes commentaires:
          </Typography>
          <Typography sx={{ mt: 1, mb: 3, fontFamily: 'Montserrat', fontWeight: 400 }}>
            {currentComment}
          </Typography>
          <Typography sx={{ mt: 3, mb: 1, fontFamily: 'Montserrat', fontWeight: 700 }}>
            Est-ce que j'ai lu ce livre: 
          </Typography>
          <Typography sx={{ mt: 1, mb: 3, fontFamily: 'Montserrat', fontWeight: 400 }}>
          {currentIsRead == true ? "oui" : "non, pas encore"}
          </Typography>
          <Typography sx={{ mt: 3, mb: 1, fontFamily: 'Montserrat', fontWeight: 700 }}>
            Catégorie: 
          </Typography>
          <Typography sx={{ mt: 1, mb: 3, fontFamily: 'Montserrat', fontWeight: 400 }}>
          {currentCategory}
          </Typography>
          <Typography sx={{ mt: 3, mb: 1, fontFamily: 'Montserrat', fontWeight: 700 }}>
            Collection: 
          </Typography>
          <Typography sx={{ mt: 1, mb: 3, fontFamily: 'Montserrat', fontWeight: 400 }}>
          {currentCollection}
          </Typography>


        </Box>

        {/* ******************************************espace formulaire******************************* */}
        {/* ------- Alert if Errors------------ */}
        <Snackbar
          open={alertErrorSubmitCollection}
          autoHideDuration={6000}
          onClose={() => setAlertErrorSubmitCollection(false)}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="error"
            sx={{ width: "100%" }}
          >
            Le nom de la collection est trop court
          </MuiAlert>
        </Snackbar>
        <Snackbar
          open={alertErrorSubmit}
          autoHideDuration={6000}
          onClose={() => setAlertErrorSubmit(false)}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="error"
            sx={{ width: "100%" }}
          >
            Une erreur s'est produit lors de l'envoi du formulaire : Merci de remplir de recommencer
          </MuiAlert>
        </Snackbar>
        <Snackbar
          open={alertErrorSubmitIsRead}
          autoHideDuration={6000}
          onClose={() => setAlertErrorSubmit(false)}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="error"
            sx={{ width: "100%" }}
          >
            Tu dois indiquer si le livre a été lu
          </MuiAlert>
        </Snackbar>
        <Snackbar
          open={alertErrorSubmitDelete}
          autoHideDuration={6000}
          onClose={() => setAlertErrorSubmitDelete(false)}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="error"
            sx={{ width: "100%" }}
          >
            Une erreur s'est produit, le livre n'a pas été supprimé
          </MuiAlert>
        </Snackbar>
       
        {/* Validation ok */}
        <Snackbar
          open={alertSuccesSubmit}
          autoHideDuration={6000}
          onClose={() => setAlertSuccesSubmit(false)}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="success"
            sx={{ width: "100%" }}
          >
            Les informations ont bien été modifiées !
          </MuiAlert>
        </Snackbar>
        <Snackbar
          open={alertSuccesSubmitDelete}
          autoHideDuration={6000}
          onClose={() => setAlertSuccesSubmitDelete(false)}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="success"
            sx={{ width: "100%" }}
          >
            Le livre a bien été supprimé
          </MuiAlert>
        </Snackbar>
        <Snackbar
          open={alertSuccesSubmitDeleteCanceled}
          autoHideDuration={6000}
          onClose={() => setAlertSuccesSubmitDeleteCanceled(false)}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="success"
            sx={{ width: "100%" }}
          >
            Le livre a été conservé
          </MuiAlert>
        </Snackbar>
        {/* ------------------------ */}
        <Box sx={{ marginBottom: '30px' }} >

          <Card variant='outlined' sx={{ border: '1px solid #4462A5', marginBottom: '30px', marginTop: '30px', marginLeft: '20px', width: '85%', margin: 'auto' }}>
            <Typography sx={{ fontSize: '1.4rem', padding: '15px', fontFamily: 'montserrat', margin: 'auto', color: '#4462A5' }}>Je peux choisir d'ajouter ou modifier des informations</Typography>

            {/* ------------- RATING ----------------------------- */}
            {console.log({ ratingValue }, "current rating value")}

            <Box sx={{ display: { xs: 'flex', sd: 'flex' }, flexDirection: { xs: 'column', md: 'column' }, justifyContent: 'space-around', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '1.4rem', padding: '15px', fontFamily: 'montserrat', margin: { sx: 'auto', sd: 'auto', md: 'none' }, color: '#4462A5', marginRight: { md: '50px' } }}>J'ajoute une note :</Typography>
              <Box sx={{ flexDirection: { xs: 'column', md: 'row' }, margin: { md: 'auto' } }}>
                <ThumbDownIcon />
                <Rating
                  name="simple-controlled"
                  value={ratingValue}
                  onChange={handleChangeRating}

                />
                <ThumbUpIcon />
              </Box>
            </Box>
            <hr className='barre' />
            {/* -----------COLLECTION SECTION --------------------------- */}

            {/* select collection by list (id) */}

            <Typography sx={{ fontSize: '1.4rem', padding: '15px', fontFamily: 'montserrat', margin: 'auto', color: '#4462A5' }}>Si ce livre fait partie d'une série de livres, je peux l'ajouter à la collection</Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'column' }, justifyContent: 'center', alignItems: 'center', marginTop: '20px', width: '100%' }}>
              <Typography sx={{ fontSize: '1.4rem', padding: '15px', fontFamily: 'montserrat', margin: { sx: 'auto', sd: 'auto', md: 'none' }, color: '#4462A5', width: 'auto' }}>Je choisis une collection :</Typography>
              <FormControl>
                <InputLabel id="demo-simple-select-collection">Choisi une collection</InputLabel>
                <Select
                  sx={{ width: { xs: '225px', md: '228px' } }}
                  labelId="demo-simple-select-collection"
                  id="demo-simple-collection"
                  name="collectionId"
                  label="collection"
                  value={collection}
                  onChange={handleChangeCollectionList}
                // TODO Actuellement si un élément de liste + un élément champs sont rempli, le dernier rempli écrase la valeur du précédent mais visuellement les 2 sont présents
                // ? pour la nouvelle catégorie=> remet la liste à 0
                //  TODO il faudra trouver un moyen d'effacer le texte de la nouvelle collection si élément liste sélectionné
                >
                  <MenuItem key={0} value=""> Pas de collection </MenuItem>
                  {collectionsList.map((data) => (
                    <MenuItem key={data.id} value={data.name}>{data.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Create a new collection name */}
            {console.log({ collectionNameValue }, "current collection Name")}

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'column' }, justifyContent: 'space-around', textAlign: 'center', Width: '100%', padding: '10px', gap: '10px' }}>
              <Typography sx={{ fontSize: '1.4rem', padding: '30px', fontFamily: 'montserrat', color: '#4462A5' }}> ou je crée une nouvelle collection</Typography>
              <Box sx={{ display: 'flex', Width: '100%', justifyContent: 'space-around', mt: '18px' }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="collectionName"
                    fullWidth
                    id="collectionName"
                    label="Nouvelle collection du livre"
                    autoFocus
                    // value={newCollectionValue}
                    type="text"
                    ref={collectionNameInput}
                    // onChange={(e) => setCollectionNameValue(e.target.value)}
                    onChange={e => { setCollectionNameValue(e.target.value); handleChangeNewCollectionName() }}


                  />
                </Grid>
              </Box>

              {/* ------------- CATEGORY ----------------------------- */}
              {console.log({ categoryIdValue }, "id current category")}

            </Box>
            <hr className='barre' />
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'column' }, justifyContent: 'center', alignItems: 'center', marginTop: '20px', width: '100%' }}>
              <Typography sx={{ fontSize: '1.4rem', padding: '15px', fontFamily: 'montserrat', margin: { sx: 'auto', sd: 'auto', md: 'none' }, color: '#4462A5', width: 'auto' }}>J'ajoute une catégorie :</Typography>
              <FormControl>
                <InputLabel id="demo-simple-select-category">Choisi une catégorie</InputLabel>
                <Select
                  sx={{ width: { xs: '225px', md: '228px' } }}
                  labelId="demo-simple-select-category"
                  id="demo-simple-category"
                  value={category}
                  label="category"
                  name='categoryId'
                  onChange={handleChangeCategory}
                >
                  <MenuItem key={0} value={0}> Pas de catégorie </MenuItem>

                  {categoriesList.map((data) => (
                    <MenuItem key={data.id} value={data}>{data.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {/* ------------- COMMENTS ----------------------------- */}
            {console.log({ commentValue }, "current comment Value")}

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row', md: 'column' }, justifyContent: 'center', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '1.4rem', padding: '15px', fontFamily: 'montserrat', margin: 'auto', color: '#4462A5' }}>J'ajoute un commentaire :</Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, Width: '100%', justifyContent: 'space-around', mt: '18px', margin: 'auto' }}>
                <Grid item xs={12} sm={12}>
                  <TextareaAutosize
                    minRows={7}
                    autoComplete="current-comment"
                    name="comment"
                    id="comment"
                    label="Les petites notes personnelles"
                    autoFocus
                    style={{ width: 450 }}
                    type="text" ref={commentInput}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Grid>
              </Box>
            </Box>

            {/* ------------- READ OR WISHED ----------------------------- */}
            {console.log({ isReadValue }, "current isRead Value")}

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row', md: 'column' }, justifyContent: 'center', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '1.4rem', padding: '15px', fontFamily: 'montserrat', margin: 'auto', color: '#4462A5' }}>C'est un livre :</Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}
                >
                  <FormControlLabel
                    value="true"
                    name="is_read"
                    control={<Radio />}
                    label="Que j'ai lu"
                    checked={selectedRead}
                    onChange={handleChangeRadioButton}
                  />
                  <FormControlLabel
                    value="false"
                    name="is_read"
                    control={<Radio />}
                    label="Dont j'ai envie"
                    checked={selectedWish}
                    onChange={handleChangeRadioButton}

                  />
                </RadioGroup>
              </FormControl>
            </Box>
            {/* ------------- SEND datas ----------------------------- */}

            <Box sx={{ margin: '30px' }} onClick={handleSubmitForm}>
              <Button
                type='submit'
                className='button'
                sx={{ my: 2, fontFamily: 'Montserrat', display: 'block', ml: 5, minWidth: '200px', margin: 'auto' }}
              >
                Enregistrer les modifications
              </Button>
            </Box>
            <Typography sx={{ fontSize: '1.4rem', padding: '15px', fontFamily: 'montserrat', margin: 'auto', color: '#4462A5' }}> OU </Typography>

            <Box sx={{ margin: '30px' }} onClick={handleSubmitToDelete}
            
            >
              <Button
                type='submit'
                className='deleteButton'
                sx={{ my: 2, background:'red', color:'white', fontFamily: 'Montserrat', display: 'block', ml: 5, minWidth: '200px', margin: 'auto',  }}
              >
                Supprimer le livre
              </Button>
            </Box>
          </Card>
        </Box>


      </div>
    // </ThemeProvider>

  )
}

export default BookConfig