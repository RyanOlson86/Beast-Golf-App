import React from "react";
import { Box } from "@mui/material";
import genStyle from "../Styles/Styles";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <center>
      <Box sx={{ ...genStyle.box, width: "60%", opacity: 0.85, textAlign: "justify" }}>
        <div>
          <h3>Technologies Used:</h3>
          <ul>
            <li>Chart.js</li>
            <li>Material UI</li>
            <li>React</li>
            <li>Redux</li>
            <li>Redux-Saga</li>
            <li>Node.js</li>
            <li>Axios</li>
            <li>Express</li>
            <li>SweetAlerts</li>
          </ul>
          <h3>Challenges</h3>
          <p>
            The toughest challenge to overcome was planning and designing the app, and fighting the urge to just start building.
            But a solid plan and detailed task list made the project easier to manage, stay on track, and made the project a
            success.
          </p>
          <h3>Thank You!</h3>
          <p>
            Thank you to the staff of Prime Digital Academy for providing such a great environment to learn and help kickstart my
            career in technology. Special thanks to my instructors Key and Dane for providing great lectures and a well structured
            curriculum that not only taught me how to code, but provided all the tools for success as a Full Stack Engineer. Thank
            you to the BGA for the inspiration to build an app I am truly passionate about. And finally, thank you to the Peridot
            Cohort for being such a great team to learn and work with.
          </p>
          <h3>Links</h3>
          <div>
            <a href="https://github.com/RyanOlson86/Beast-Golf-App">github.com/RyanOlson86/Beast-Golf-App</a>
          </div>
          <div>
            <a href="https://www.linkedin.com/in/ryan-olson-28223a93/">linkedin.com/in/ryan-olson-28223a93/</a>
          </div>
        </div>
      </Box>
    </center>
  );
}

export default AboutPage;
