import axios from 'axios';

const deleteApiKid = (routeApi,token,setAlert,setAlertMessage,setAlertSeverity,setChangeDatas) => {
  axios.delete(routeApi, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
    .then(function (response) {
      setAlert(true);
      setAlertMessage("Le compte a bien été détruit")
      setAlertSeverity("success")
      setChangeDatas(true)
    })
    .catch(function (error) {
      console.log(error);
      
        setAlert(true);
        setAlertMessage("Une erreur s'est produite lors de la suppression")
        setAlertSeverity("error")

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
