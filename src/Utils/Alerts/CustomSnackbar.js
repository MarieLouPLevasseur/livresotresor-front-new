// import React from 'react';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

// const CustomSnackbar = ({ open, onClose, message, severity, autoHideDuration }) => {
//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     onClose(); // Appel de la fonction onClose seulement si elle est définie
//   };

//   return (
//     <Snackbar
//       open={open}
//       autoHideDuration={autoHideDuration || 6000}
//       onClose={handleClose} // Utilisation de handleClose pour gérer la fermeture de la Snackbar
//     >
//       <Alert onClose={handleClose} severity={severity || 'info'}>
//         {message}
//       </Alert>
//     </Snackbar>
//   );
// };

// export default CustomSnackbar;
