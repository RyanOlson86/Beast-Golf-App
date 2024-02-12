import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const columns = [
  {
    field: "course",
    headerName: "Course",
    width: 150,
    // editable: true,
  },
  {
    field: "date",
    headerName: "Date",
    width: 150,
    // editable: true,
    valueFormatter: (params) => new Date(params?.value).toLocaleDateString(),
  },
  {
    field: "teebox",
    headerName: "Teebox",
    width: 110,
    // editable: true,
  },
  {
    field: "format",
    headerName: "Format",
    width: 150,
    // editable: true,
  },
  {
    field: "complete",
    headerName: "Event Complete",
    width: 150,
  },
];

function UpcomingEvents() {
  const events = useSelector((store) => store.events);
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();

  // Local state that is updated when a row is clicked on event list
  const [rowId, setRowId] = useState(0);

  const handleAddPlayers = () => {
    history.push(`/events/${rowId}`);
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_EVENT", payload: rowId });
  };

  return (
    <Box sx={{ height: 400, width: "90%", m: "5%" }}>
      <Typography variant="h5">Upcoming Events:</Typography>
      {user.access_level === 1 && (
        <Button variant="contained" size="small" sx={{ m: "10px" }} onClick={handleAddPlayers}>
          Edit Event
        </Button>
      )}

      {user.access_level === 1 && (
        <Button variant="contained" color="error" size="small" sx={{ m: "10px" }} onClick={handleDelete}>
          Delete
        </Button>
      )}
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
        onRowClick={(params) => setRowId(params.id)}
        // checkboxSelection
        // disableRowSelectionOnClick
      />
    </Box>
  );
}

export default UpcomingEvents;
