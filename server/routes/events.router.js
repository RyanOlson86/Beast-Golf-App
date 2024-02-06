const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// GET route to retrieve existing events from DB
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "events";`;

  pool.query(queryText)
  .then(result => {
    res.send(result.rows)
  })
  .catch(error => {
    console.log('Error in /events GET : ', error)
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;