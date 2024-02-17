import axios from 'axios';

const deleteApiKid = (routeApi, token) => {
  return axios.delete(routeApi, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  .then(function (response) {
    console.log(response)
    return response.data.error === false;
  })
  .catch(function (error) {
    console.log(error);
    return false;
  });
};


const deleteApiUser = (routeApi, token) => {
  
  return axios.delete(routeApi, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  .then(function (response) {
    console.log(response)
    return response.data.error === false;
  })
  .catch(function (error) {
    console.log(error);
    return false;
  });
};

export { deleteApiKid, deleteApiUser };
