import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import Pagination from '@mui/material/Pagination';

function UserList({ users }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <Typography variant="h2">Users</Typography>
      <Paper elevation={3} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: '#ACCBF7' }}>ID</TableCell>
              <TableCell style={{ backgroundColor: '#ACCBF7' }}>Prénom</TableCell>
              <TableCell style={{ backgroundColor: '#ACCBF7' }}>Nom</TableCell>
              <TableCell style={{ backgroundColor: '#ACCBF7' }}>Email</TableCell>
              <TableCell style={{ backgroundColor: '#ACCBF7' }}>Enfants</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <List>
                    {user.kid.map((kid) => (
                      <ListItem key={kid.id}>
                        <ListItemText primary={kid.username} />
                      </ListItem>
                    ))}
                  </List>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Pagination
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
        count={Math.ceil(users.length / itemsPerPage)}
        page={page}
        onChange={handleChangePage}
      />
    </div>
  );
}

export default UserList;
