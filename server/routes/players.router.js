const express = require("express");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

// GET route to retrieve existing player list for event from DB
// rejectUnathenticated verifies user is logged in or else sends status 403
router.get("/", rejectUnauthenticated, (req, res) => {

  const queryText = `SELECT * FROM "players" ORDER BY "full_name" ASC;`;

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in /players GET : ", error);
    });
});

module.exports = router;
