import { userLogout } from '../Slices/login/userSlice';
import { kidLogout } from '../Slices/login/kidSlice';

import { store } from '../../layout/Store';

export const handleErrors = async (error, setAutoLogout) => {
    console.log(error);

    const dispatch = store.dispatch;

    const handleLogout = () => {
        dispatch(userLogout());
        dispatch(kidLogout());
        localStorage.removeItem('user');
        localStorage.removeItem('kid');
        localStorage.setItem('isAutoLogout', true);
    };

    // Vérifier si error.response existe
    if (error.response) {
        // Erreur CONNEXION
        if ((error.response.data && error.response.data.message === "Expired JWT Token") || error.response.status === 401) {
            handleLogout();
            window.location.href = '/';
        }
        // Erreur AUTORISATION
        else if (error.response.status === 403) {
            window.location.href = '/error-access';
        }
        // Erreur SERVER
        else if (error.response.status === 500 || error.message === "Network Error") {
            window.location.href = '/error-server';
        }
        // Erreur VALIDATION CÔTÉ SERVEUR (400) BD REQUEST
        else if (error.response.status === 400) {
            // Examinez la réponse du serveur pour extraire les messages d'erreur
            const validationErrors = error.response.data;
                // TODO les  de problèmes de serveur ne seront qu'en anglais. Mettre la traduction symfony en place

            // Vérifier si la propriété message existe dans validationErrors
            if (validationErrors && validationErrors.message) {
                const errorMessage = validationErrors.message.split('\n')[1].trim();
                console.log("Erreur de validation côté serveur:", errorMessage);
                return "Une erreur est survenue pendant la soumission.";
            } else {
                console.log("Erreur de validation côté serveur:", validationErrors);
                // Retourner les erreurs
                return "Une erreur est survenue pendant la soumission.";
            }
        }
    } else {
        console.log("Erreur: Aucune réponse du serveur");
        return "Une erreur est survenue pendant la soumission.";
    }
};