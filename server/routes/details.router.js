const express = require("express");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

// GET route to retrieve existing player list for event from DB
// rejectUnathenticated verifies user is logged in or else sends status 403
router.get("/:id", rejectUnauthenticated, (req, res) => {

  const queryText = `SELECT 
    events.course,
    events.date,
    events.format,
    event_scores.score_final
    FROM "events"
    LEFT JOIN event_scores ON event_scores.event_id=events.id
    LEFT JOIN players AS p1 ON p1.id=event_scores.player_one
    LEFT JOIN players AS p2 ON p2.id=event_scores.player_two
    WHERE p1.id = $1 OR p2.id = $1 
    ORDER BY events.date DESC LIMIT 10;`;

  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in /players GET : ", error);
    });
});

module.exports = router;
