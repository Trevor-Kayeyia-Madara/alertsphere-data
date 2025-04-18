const express = require('express');
const { getReports } = require('../controllers/reportsController');

const router = express.Router();

module.exports = (supabase) => {
  router.get('/', (req, res) => getReports(req, res, supabase));
  return router;
};
