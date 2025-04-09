const express = require('express');
const { reportMissingPerson } = require('../controllers/missingController');

const router = express.Router();

module.exports = (supabase) => {
  router.post('/report', (req, res) => reportMissingPerson(req, res, supabase));
  return router;
};