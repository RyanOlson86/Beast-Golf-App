import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import genStyle from "../Styles/Styles";

const columns = [
  {
    field: "course",
    headerName: "Course",
    width: 150,
  },
  {
    field: "date",
    headerName: "Date",
    width: 150,
    valueFormatter: (params) => new Date(params?.value).toLocaleDateString(),
  },
  {
    field: "teebox",
    headerName: "Teebox",
    width: 110,
  },
  {
    field: "format",
    headerName: "Format",
    width: 150,
  },
  {
    field: "complete",
    headerName: "Event Complete",
    type: 'boolean',
    width: 150,
  },
];

function PastEvents() {
  const events = useSelector((store) => store.events);
  const history = useHistory()

  // Local state that is updated when a row is clicked on event list
  const [rowId, setRowId] = useState(0);

  const handleView = () => {
    history.push(`/events/${rowId}`);
  }

  return (
    <Box sx={{...genStyle.box,  height: 400, m: '5%' , paddingBottom: '105px'}}>
      <Typography variant="h5">Past Events:</Typography>
      <Button variant="contained" size="small" sx={{ m: "10px" }} onClick={handleView}>View Event</Button>
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
              complete: false
            }
          },
          sorting: {
            sortModel: [{ field: "date", sort: "desc" }],
          }
        }}
        filterModel= {{
            items: [{ field: 'complete', operator: 'is', value: 'true'}]
          }}
        pageSizeOptions={[5]}
        onRowClick={(params) => setRowId(params.id)}
      />
    </Box>
  );
}

export default PastEvents;
