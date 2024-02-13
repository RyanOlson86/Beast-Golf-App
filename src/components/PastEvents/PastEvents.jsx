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

  // Local state that is updated when a row is clicked on event list
  const [rowId, setRowId] = useState(0);

  return (
    <Box sx={{ height: 400, width: "90%", m: "5%", marginTop: '10%' }}>
      <Typography variant="h5">Past Events:</Typography>
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