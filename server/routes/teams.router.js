const express = require("express");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

// GET route to retrieve existing player list for event from DB
// rejectUnathenticated verifies user is logged in or else sends status 403
router.get("/:id", rejectUnauthenticated, (req, res) => {
  console.log("in teams GET", req.user);

  const queryText = `
    SELECT 
        event_scores.id AS id, 
        p1.full_name AS player1, 
        p2.full_name AS player2, 
        event_scores.penalty, 
        event_scores.score_final AS score
    FROM "events"
    LEFT JOIN event_scores ON event_scores.event_id=events.id
    LEFT JOIN players AS p1 ON p1.id=event_scores.player_one
    LEFT JOIN players AS p2 ON p2.id=event_scores.player_two
    WHERE event_scores.event_id=$1;
    `;

  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in /teams GET : ", error);
    });
});

// POST route to add new team to DB --- ADMIN ONLY
// rejectUnathenticated verifies user is logged in or else sends status 403
router.post("/", rejectUnauthenticated, (req, res) => {
  // If user is Admin (access_level 1) new INSERT query runs, else send forbidden
  if (req.user.access_level === 1) {
    const queryText = `INSERT INTO "event_scores" ("player_one", "player_two", "event_id")
    Values ( $1, $2, $3 );`;
    const queryParams = [req.body.playerOneId, req.body.playerTwoId, req.body.event_id];

    pool
      .query(queryText, queryParams)
      .then((result) => {
        console.log("req.body", req.body);
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log("Error in /teams POST : ", error);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
