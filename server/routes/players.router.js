const express = require("express");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

// GET route to retrieve existing player list for event from DB
// rejectUnathenticated verifies user is logged in or else sends status 403
router.get("/", rejectUnauthenticated, (req, res) => {

  const queryText = `SELECT * FROM "players";`;

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in /players GET : ", error);
    });
});

// // POST route to add new team to DB --- ADMIN ONLY
// // rejectUnathenticated verifies user is logged in or else sends status 403
// router.post("/:id", rejectUnauthenticated, (req, res) => {
//   // If user is Admin (access_level 1) new INSERT query runs, else send forbidden
//   if (req.user.access_level === 1) {
//     const queryText = `INSERT INTO "event_scores" ("player_one", "player_two", "event_id")
//     Values ( $1, $2, $3 );`;
//     const queryParams = [req.body.playerOneId, req.body.playerTwoId, req.params.id];

//     pool
//       .query(queryText, queryParams)
//       .then((result) => {
//         console.log("req.body", req.body);
//         res.sendStatus(201);
//       })
//       .catch((error) => {
//         console.log("Error in /teams POST : ", error);
//       });
//   } else {
//     res.sendStatus(403);
//   }
// });

module.exports = router;
