import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { GridRowModes, DataGrid, GridActionsCellItem, GridRowEditStopReasons } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


export default function TestGrid() {
  const dispatch = useDispatch();
  const { pageId } = useParams();

  useEffect(() => {
    // dispatch({ type: "FETCH_EVENTS" });
    dispatch({ type: "FETCH_EVENT_DETAILS", payload: pageId });
    // dispatch({ type: "FETCH_ALL_PLAYERS" });
  }, []);

  const initialRows = useSelector((store) => store.teams);
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState({});
  const [newData, setNewData] = useState([])

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (params) => () => {
    console.log(rowModesModel)
    setRowModesModel({ ...rowModesModel, [params.id]: { mode: GridRowModes.Edit } });
    console.log(rowModesModel)
  };

  const handleSaveClick = (params) => () => {
    console.log('save clicked', params.row.id, params.row.score)
    setRowModesModel({ ...rowModesModel, [params.id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    console.log('updated row:',updatedRow, newRow.id)
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    console.log('newRowModesModel', newRowModesModel)
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "player1", headerName: "Player 1", width: 180, editable: false },
    {
      field: "player2",
      headerName: "Player 2",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: "penalty",
      headerName: "Penalty",
      type: "string",
      width: 180,
      editable: false,
    },
    {
      field: "score",
      headerName: "Net Score",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
      type: "number",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ( params ) => {
        const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(params)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(params)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(params)}
            color="inherit"
          />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(params)} color="inherit" />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}

      />
    </Box>
  );
}
