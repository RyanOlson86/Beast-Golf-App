import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import genStyle from "../Styles/Styles";

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
    type: "boolean",
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

  // Handle Delete function will fire Sweetalert to allow use to confirm deletion. Cancel will not save any changes
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "DELETE_EVENT", payload: rowId });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <Box sx={{...genStyle.box,  height: 400, m: '5%' , paddingBottom: '105px'}}>
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
          columns: {
            columnVisibilityModel: {
              complete: false,
            },
          },
        }}
        filterModel={{
          items: [{ field: "complete", operator: "is", value: "false" }],
        }}
        pageSizeOptions={[5]}
        onRowClick={(params) => setRowId(params.id)}
      />
    </Box>
  );
}

export default UpcomingEvents;
