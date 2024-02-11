import axios from 'axios';

// TODO ne fonctionne pas depuis la refacto à réparer
const patchApiUpdateUser = (routeApi, data, token, setAlert, setAlertMessage, setAlertSeverity, handleClose, dispatchDataOnStore) => {
  return axios.patch(routeApi, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  .then(function (response) {
    console.log(response);
    if (response.data.error === false) {
      return true;
    } else {
      return false;
    }
  })
  .catch(function (error) {
    console.log(error);
    return false;
  });
};

export default patchApiUpdateUser;
