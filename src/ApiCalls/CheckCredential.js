import axios from 'axios';

const postApiCheckCredential = (routeApi, data, token, setAlert, setAlertMessage, setAlertSeverity, handleSubmitUpdateUser) => {
    const passwordUserJson = JSON.stringify(data);

    axios.post(routeApi, passwordUserJson, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        setAlert(true);
        setAlertMessage("Mot de passe confirmé");
        setAlertSeverity("success");
        handleSubmitUpdateUser();
    })
    .catch((error) => {
        console.log(error)
        if (error.response && error.response.status === 401) {
            setAlert(true);
            setAlertMessage("Identifiant incorrect. En cas de mot de passe oublié. Retourner à l'accueil et suivez la procédure d'oubli sur la page de connexion.");
            setAlertSeverity("error");
        } else {
            setAlert(true);
            setAlertMessage("Une erreur s'est produite.");
            setAlertSeverity("error");
        }
    });
};

export default postApiCheckCredential;
