import axios from 'axios';

const deleteApiKid = (routeApi,token,setChangeDatas) => {
  axios.delete(routeApi, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
    .then(function (response) {
      // TODO: gérer le renvoi true ou false pour le snackbar
      // setAlert(true);
      // setAlertMessage("Le compte a bien été détruit")
      // setAlertSeverity("success")
      setChangeDatas(true)

      return true;
    })
    .catch(function (error) {
      console.log(error);
      
      return false;
    });
};

// TODO to complete
const deleteApiUser = (routeApi, data, token) => {
  axios.patch(routeApi, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  .then(function (response) {
    
    console.log("j'ai réussi mon traitement")
    debugger
  })
  .catch(function (error) {
    console.log("j'ai échoué la mise à jour")
    debugger
  });
};

export { deleteApiKid, deleteApiUser };
