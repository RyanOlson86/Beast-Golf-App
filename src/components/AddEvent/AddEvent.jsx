import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

function AddEvent() {
  // Using hooks create local state for form inputs
  const [courseInput, setCourse] = useState("");
  const [formatInput, setFormat] = useState("");
  const [teeboxInput, setTeebox] = useState("");
  const [dateInput, setDate] = useState("");

  const dispatch = useDispatch()

  // Function to reset Form Inputs to default
  const defaultInputs = () => {
    setCourse('');
    setFormat('');
    setTeebox('');
    setDate('');
  }

  // Function to Handle Add
  const handleAdd = () => {
    console.log(courseInput)
    console.log(formatInput)
    console.log(teeboxInput)
    console.log(dateInput)
    dispatch({type: 'ADD_EVENT', payload: {
        course: courseInput,
        date: dateInput,
        teebox: teeboxInput,
        format: formatInput
    }})
    defaultInputs();
  }

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 0, width: "20ch" },
        m: "20px",
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5">Add A New Event:</Typography>
      <TextField
        id="course"
        label="Course"
        variant="outlined"
        size="small"
        value={courseInput}
        onChange={(event) => setCourse(event.target.value)}
      />
      <TextField
        id="format"
        label="Format"
        variant="outlined"
        size="small"
        value={formatInput}
        onChange={(event) => setFormat(event.target.value)}
      />
      <TextField
        id="teebox"
        label="Tee Box"
        variant="outlined"
        size="small"
        value={teeboxInput}
        onChange={(event) => setTeebox(event.target.value)}
      />
      <TextField
        id="date"
        label="Date"
        variant="outlined"
        size="small"
        value={dateInput}
        onChange={(event) => setDate(event.target.value)}
      />
      <Button variant="contained" onClick={handleAdd}>ADD</Button>
    </Box>
  );
}

export default AddEvent;
