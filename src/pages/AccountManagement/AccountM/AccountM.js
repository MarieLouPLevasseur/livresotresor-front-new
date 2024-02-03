import React from 'react'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'


function AccountM() {
  return (
    <div>
    <Box sx={{ '& > :not(style)': { m: 1 }, display:"flex", flexDirection: {lg:'row'}}}>
      <Fab color="secondary" aria-label="edit">
        <EditIcon />
      </Fab>
      <Fab>
        <DeleteIcon />
      </Fab>
    </Box>
    </div>
  )
}

export default AccountM