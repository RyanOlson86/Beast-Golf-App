import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const columns = [
  {
    field: 'player1',
    headerName: 'Player 1',
    width: 150,
    // editable: true,
  },
  {
    field: 'player2',
    headerName: 'Player 2',
    width: 150,
    // editable: true,
  },
  {
    field: 'penalty',
    headerName: 'Penalty',
    width: 110,
    // editable: true,
  },
  {
    field: 'score',
    headerName: 'Net Score',
    width: 150,
    // editable: true,
  },
];

function PlayerList({teams}) {
//   const events = useSelector(store => store.events)
  const user = useSelector(store => store.user)

  // Local state that is updated when a row is clicked on event list
  const [rowId, setRowId] = useState(0)

  const handleModify = () => {
    // history.push(`/events/${rowId}`)
    console.log('clicked', rowId)
  }

  return (
    <Box sx={{ height: 400, width: '100%', m: '20px' }}>
      <Box>
      <Typography variant='h5'>Teams:</Typography>
      {user.access_level === 1 && <Button variant='contained' size="small" sx={{ m: "10px" }} onClick={handleModify}>Modify</Button>}
      </Box>
      
      <DataGrid
        rows={teams}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        onRowClick={params => setRowId(params.id)}
        // checkboxSelection
        // disableRowSelectionOnClick
      />
    </Box>
  );
}


export default PlayerList