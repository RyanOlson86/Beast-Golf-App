import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs'

const mockData = {
  course: 'The Refuge',
  format: '2-person Scramble',
  teebox: 'Blues',
}

function AddEvent() {
  // Using hooks create local state for form inputs
  const [courseInput, setCourse] = useState("");
  const [formatInput, setFormat] = useState("");
  const [teeboxInput, setTeebox] = useState("");
  const [dateInput, setDate] = useState(dayjs);

  const dispatch = useDispatch();

  // Function to reset Form Inputs to default
  const defaultInputs = () => {
    setCourse("");
    setFormat("");
    setTeebox("");
    setDate();
  };

  // Style for TextField
  const myStyle = {
    backgroundColor: "white",
    borderRadius: "5px",
  };

  // Function to Handle Add
  const handleAdd = () => {
    console.log(courseInput);
    console.log(formatInput);
    console.log(teeboxInput);
    console.log(dateInput);
    dispatch({
      type: "ADD_EVENT",
      payload: {
        course: courseInput,
        date: dateInput,
        teebox: teeboxInput,
        format: formatInput,
      },
    });
    defaultInputs();
  };

  const handleMock = ()=>{
    setCourse(mockData.course);
    setFormat(mockData.format);
    setTeebox(mockData.teebox);
    console.log(dayjs());
  }

  return (
    <Box
      component="form"
      sx={{
        bgcolor: "#d1d1d1",
        borderRadius: "5px",
        border: "solid 2px black",
        m: "5%",
        width: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        p: "1%"
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5" sx={{m: 1}} onClick={handleMock}>Add A New Event:</Typography>
      <Box sx={{
        "& > :not(style)": { m: 1, width: "20ch" },
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        <TextField
          id="course"
          label="Course"
          variant="outlined"
          autoComplete="true"
          sx={myStyle}
          value={courseInput}
          onChange={(event) => setCourse(event.target.value)}
        />
        <TextField
          id="format"
          label="Format"
          variant="outlined"
          sx={myStyle}
          value={formatInput}
          onChange={(event) => setFormat(event.target.value)}
        />
        <TextField
          id="teebox"
          label="Tee Box"
          variant="outlined"
          sx={myStyle}
          value={teeboxInput}
          onChange={(event) => setTeebox(event.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Event Date" id="date" sx={myStyle} value={dateInput} onChange={(newValue) => setDate(newValue)} />
        </LocalizationProvider>

        <Button variant="contained" onClick={handleAdd}>
          ADD
        </Button>
      </Box>
    </Box>
  );
}

export default AddEvent;
