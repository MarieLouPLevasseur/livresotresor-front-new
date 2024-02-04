import axios from 'axios';

// TODO ne fonctionne pas depuis la refacto à réparer
const patchApiUpdateUser = (routeApi, data, token,setAlert,setAlertMessage,setAlertSeverity,handleClose,dispatchDataOnStore) => {

  axios.patch(routeApi, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  .then(function (response) {

    setAlert(true);
    setAlertMessage("La mise à jour a bien été effectuée")
    setAlertSeverity("success")
    handleClose()
    dispatchDataOnStore()
  })
  .catch(function (error) {
    console.log(error)
    setAlert(true);
    setAlertMessage("Une erreur est survenue lors de la mise à jour")
    setAlertSeverity("error")

    console.log("j'ai échoué la mise à jour")
  });
};

export default patchApiUpdateUser;
