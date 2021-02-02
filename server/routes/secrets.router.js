const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated}=require('../modules/authentication-middleware.js');
//deconstruct middleware
router.get('/', rejectUnauthenticated, (req, res) => {
  // what is the value of req.user????
  console.log('req.user:', req.user);
  let queryText = `SELECT * FROM "secret" WHERE "secrecy_level" <= ${req.user.clearance_level};`
  pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
//base mode done