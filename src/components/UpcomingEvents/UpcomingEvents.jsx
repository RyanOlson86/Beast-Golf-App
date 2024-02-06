import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const columns = [
  {
    field: 'course',
    headerName: 'Course',
    width: 150,
    editable: true,
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 150,
    editable: true,
  },
  {
    field: 'teebox',
    headerName: 'Teebox',
    width: 110,
    editable: true,
  },
  {
    field: 'format',
    headerName: 'Format',
    width: 150,
    editable: true,
  },
];

function UpcomingEvents() {
  const events = useSelector(store => store.events)

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Typography variant='h5'>Upcoming Events:</Typography>
      <DataGrid
        rows={events}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}


export default UpcomingEvents