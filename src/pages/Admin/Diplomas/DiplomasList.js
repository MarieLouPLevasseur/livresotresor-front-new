import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Paper } from '@mui/material';
import Pagination from '@mui/material/Pagination';

function DiplomasList({ diplomas }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [expandedImage, setExpandedImage] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleImageClick = (url) => {
    if (expandedImage === url) {
      setExpandedImage(null); // Réinitialiser l'image agrandie si elle est déjà agrandie
    } else {
      setExpandedImage(url); // Agrandir l'image si elle n'est pas encore agrandie
    }
  };
  

  return (
    <div>
      <Typography variant="h2">Diplômes</Typography>
      <Paper elevation={3} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: '#ACCBF7' }}>ID</TableCell>
              <TableCell style={{ backgroundColor: '#ACCBF7' }}>niveau</TableCell>
              <TableCell style={{ backgroundColor: '#ACCBF7' }}>Aperçu</TableCell>
              <TableCell style={{ backgroundColor: '#ACCBF7' }}>Url</TableCell>
            
            </TableRow>
          </TableHead>
          <TableBody>
            {diplomas.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((diploma) => (
              <TableRow key={diploma.id}>
                <TableCell>{diploma.id}</TableCell>
                <TableCell>{diploma.is_win}</TableCell>
                <TableCell>
                    <img
                    src={diploma.url}
                    alt="Avatar"
                    style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                    onClick={() => handleImageClick(diploma.url)}
                />     
                </TableCell>
                <TableCell>{diploma.url}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Pagination
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
        count={Math.ceil(diplomas.length / itemsPerPage)}
        page={page}
        onChange={handleChangePage}
      />

      {expandedImage && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={expandedImage} alt="Expanded Avatar" style={{ maxWidth: '90%', maxHeight: '90%', cursor: 'pointer' }} onClick={() => setExpandedImage(null)} />
        </div>
      )}
    </div>
  );
}

export default DiplomasList;
