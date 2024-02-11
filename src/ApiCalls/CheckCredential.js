// usePostApiCheckCredential.js

import axios from 'axios';

const PostApiCheckCredential = (routeApi, data, token, callback) => {
        const passwordUserJson = JSON.stringify(data);

        axios.post(routeApi, passwordUserJson, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            // Appel réussi
            callback(true);
        })
        .catch((error) => {
            // Appel échoué
            console.log(error);
            callback(false);
        });
};

export default PostApiCheckCredential;
