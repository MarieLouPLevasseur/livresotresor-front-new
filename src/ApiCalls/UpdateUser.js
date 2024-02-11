import axios from 'axios';

// USER datas
const patchApiUpdateUser = (routeApi, data, token) => {
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

// KIDS datas
const patchApiUpdatekid = (routeApi, data, token) => {
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

export { patchApiUpdateUser, patchApiUpdatekid };
