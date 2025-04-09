const express = require('express');
const { reportCrime } = require('../controllers/crimeController');

const router = express.Router();

module.exports = (supabase) => {
  router.post('/report', (req, res) => reportCrime(req, res, supabase));
  return router;
};