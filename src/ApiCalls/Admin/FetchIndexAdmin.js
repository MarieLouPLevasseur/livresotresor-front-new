// FetchIndexAdmin.js

import axios from 'axios';

const FetchIndexAdmin = async (baseUrl,endpoint,token) => {
    const routeApi = baseUrl + endpoint;
    try {
        const response = await axios.get(routeApi, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
};

export default FetchIndexAdmin;
