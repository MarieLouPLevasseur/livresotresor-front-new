import React, {useState, useEffect} from 'react'
import { Box, Button } from '@mui/material'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import axios from 'axios';
import { NavLink } from "react-router-dom";

import './BookButton.scss'
import { handleErrors } from '../../../Utils/Errors/handleErrors'


/**
 * Set Button structure button to add a book
 * 
 * @param  Book all properties of the api book
 */
function BookButton(Book) {
  
  // Redux-toolkit state import
  const apiUrl = useSelector((state) => state.api.apiUrl);
  // const token = useSelector((state) => state.kid.token);
  // const kidId = useSelector((state) => state.kid.id);
  const isLogUser = useSelector((state) => state.user.isLogUser);

  // Error states
  const [alertErrorSubmit, setAlertErrorSubmit] = useState(false);
  const [alertErrorLogin, setAlertErrorLogin] = useState(false);
  const [alertSuccesSubmit, setAlertSuccesSubmit] = useState(false);

   // set id
   const id = useSelector(state => {
    if(isLogUser) {
        return state.user.kidId
    }
    return state.kid.id;
   })

    // set token
    const token = useSelector(state => {
      if(isLogUser) {
          return state.user.token
      }
      return state.kid.token;
     })

  // Api EndPoint
  const apiEndpointCreateBook = `/api/v1/kids/${id}/books`
  // console.log(apiEndpointCreateBook)
  // console.log("id")
  // console.log(id)

  
  // Redirect when connected
  const navigate = useNavigate();

  //  TODO mettre une alerte de succès lors d'un passage d'un nouveau niveau lors de l'enregistrement d'un livre lu


  // Redirect when success
     
  useEffect(() => {
    if (alertSuccesSubmit) {
      setTimeout(() => {
        navigate("/profil/enfant")
      }, 2000);
    }
  });

 //---- call API for Submit form  -------

 const postApi = (routeApi ,data) => {
  axios.post(routeApi , data, {headers : {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${token}`

  },
  })
  .catch(function (error) {
    console.log(error);
    setAlertErrorLogin(true)
    handleErrors(error)
  })
  .then(function (response) {
    // console.log(response);
    setAlertSuccesSubmit(true);
  })
}
  

  const handleClickAddButton = (isRead, Book) => {

    console.log(isRead, "test isread on add Button");
   
    if (isRead === "" ) {
      setAlertErrorSubmit(true);
    } else {
      console.log(Book.Book, "je suis le Book.Book dans le bouton")

      let bookData = Book.Book;
      const loginFormData = {
        "is_read":     isRead,
        "book":{
        "isbn" :       JSON.stringify(bookData.isbn),
        "cover":       bookData.cover,
        "publisher":   bookData.publisher,
        "description": bookData.description == "" ? "Il n'y a pas de description pour ce livre" : bookData.description,
        "title":       bookData.title,
        // "authors":     [{"name": bookData.authors[0].name}],
        "authors":     [{"name": bookData.authors[0]?.name || "inconnu"}]
      }
    }
  
  postApi(apiUrl + apiEndpointCreateBook,loginFormData);
  }
};

// ----------
  

   

  return (
    
    <div>

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
          Le livre a été enregistré avec succès !
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
          Il y a eut un soucis lors de l'enregistrement du livre. Nous sommes désolés.
        </MuiAlert>
      </Snackbar>

          {console.log(Book, "info book dans bookbutton")}

       <Box sx={{ flexGrow: 1,
                  display:'flex',
                  flexDirection: 'row',
                  width:'60%',
                  margin: 'auto'
                }}>
          <Button className="buttonBookAdd"  onClick={(e) => handleClickAddButton(true,Book)}


            sx={{ my: 2,
                  color: 'white',
                  background:'#4462A5',
                  fontFamily:'Montserrat',
                  width:'100%',
                  margin:'20px'
                 
                }}
            >  Ajouter à mes livres lus

          </Button>
          <Button className="buttonBookAdd"  onClick={(e) => handleClickAddButton(false,Book)}

            sx={{ my: 2, color: 'white',fontFamily:'Montserrat', background:'#4462A5', width:'100%', margin:'20px' }}
          >
                Ajouter à ma liste d'envie

          </Button>
        </Box>
    </div>
  )
}

export default BookButton