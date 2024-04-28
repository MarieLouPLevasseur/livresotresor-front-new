// FetchShowOne.js

import axios from 'axios';

const FetchShowOneAdmin = async (baseUrl,endpoint,token,id) => {
    const routeApi = baseUrl + endpoint + id;
    try {
        const response = await axios.get(routeApi, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching one :', error);
        throw error;
      }
};

export default FetchShowOneAdmin;