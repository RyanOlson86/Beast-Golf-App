const express = require("express");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();
const calcWinner = require('../utils/calcWinner')

// GET route to retrieve existing events from DB
// rejectUnathenticated verifies user is logged in or else sends status 403
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "events";`;

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in /events GET : ", error);
    });
});

// POST route to add new event to DB --- ADMIN ONLY
// rejectUnathenticated verifies user is logged in or else sends status 403
router.post("/", rejectUnauthenticated, (req, res) => {
  // If user is Admin (access_level 1) new INSERT query runs, else send forbidden
  if (req.user.access_level === 1) {
    const queryText = `INSERT INTO "events" ("course", "date", "teebox", "format")
        VALUES ($1, $2, $3, $4);`;
    const queryParams = [req.body.course, req.body.date, req.body.teebox, req.body.format];

    pool
      .query(queryText, queryParams)
      .then((result) => {
        console.log("req.body", req.body);
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log("Error in /events POST : ", error);
      });
  } else {
    res.sendStatus(403);
  }
});

/* --- ADMIN ONLY ---
PUT route to update event in DB as complete
    - First, SELECT scores for event from DB
    - Second, use SELECT results to run calcWinner()
    - Use return from calcWinner to:
        - UPDATE "players" with win for how many points were awarded
    - UPDATE all players that played with +1 events_played
    - UPDATE event completed with true
rejectUnathenticated verifies user is logged in or else sends status 403
*/
router.put("/:id", rejectUnauthenticated, async (req, res) => {
  // If user is Admin (access_level 1) new INSERT query runs, else send forbidden
  if (req.user.access_level === 1) {
    let connection;

    try {
      const event_id = req.params.id;

      // establish connection to DB
      connection = await pool.connect();

      // Begin SQL transaction
      connection.query("BEGIN;");

      // Query to retrieve scores for event from DB
      const getText = `
        SELECT 
            event_scores.id AS id, 
            p1.id AS player1, 
            p2.id AS player2, 
            event_scores.penalty, 
            event_scores.score_final AS score
        FROM "events"
        LEFT JOIN event_scores ON event_scores.event_id=events.id
        LEFT JOIN players AS p1 ON p1.id=event_scores.player_one
        LEFT JOIN players AS p2 ON p2.id=event_scores.player_two
        WHERE event_scores.event_id=$1;`;

      const getResponse = await connection.query(getText, [event_id]);

      // call calcWinner to retrieve winning team(s) and points
      const winner = calcWinner(getResponse.rows);
      const points = winner.points;
      const teams = winner.teams;

      if (teams[0].score === 0) {
        throw new Error("Cannot have score of zero");
      }

      // Update wins
      const winsText = `UPDATE "players" SET wins = wins + $1 WHERE id=$2;`;
      for(let team of teams) {
        await connection.query(winsText, [points, team.player1])
        await connection.query(winsText, [points, team.player2])
      }

      // Update events
      const eventsText = `UPDATE "players" SET events_played = events_played + 1 WHERE id=$1;`;
      for(let team of getResponse.rows) {
        await connection.query(eventsText, [team.player1])
        await connection.query(eventsText, [team.player2])
      }

      const completeText = `UPDATE "events" SET "complete"=true WHERE "id"=$1;`;
      await connection.query(completeText, [event_id]);

      connection.query("COMMIT;");

      res.sendStatus(200);
    } catch (error) {
      console.log("Error in /test PUT", error);
      connection.query("ROLLBACK;");
      res.sendStatus(500);
    } finally {
      connection.release();
    }
  } else {
    res.sendStatus(403);
  }
});

// DELETE route to delete event from DB --- ADMIN ONLY
// rejectUnathenticated verifies user is logged in or else sends status 403
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  // If user is Admin (access_level 1) new INSERT query runs, else send forbidden
  if (req.user.access_level === 1) {
    const queryText = `DELETE FROM "events" WHERE "id"=$1;`;

    pool
      .query(queryText, [req.params.id])
      .then((result) => {
        console.log("req.body", req.body);
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log("Error in /events PUT : ", error);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
