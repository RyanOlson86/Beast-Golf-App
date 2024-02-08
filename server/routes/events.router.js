const express = require("express");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

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

// PUT route to update event in DB as complete --- ADMIN ONLY
// rejectUnathenticated verifies user is logged in or else sends status 403
router.put("/:id", rejectUnauthenticated, (req, res) => {
  // If user is Admin (access_level 1) new INSERT query runs, else send forbidden
  if (req.user.access_level === 1) {
    const queryText = `UPDATE "events" SET "complete"=true WHERE "id"=$1;`;

    pool
      .query(queryText, [req.params.id])
      .then((result) => {
        console.log("req.body", req.body);
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log("Error in /events PUT : ", error);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
