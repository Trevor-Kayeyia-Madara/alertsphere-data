const express = require('express');
const { reportCrime, updateCrimeStatus } = require('../controllers/crimeController');

const router = express.Router();

module.exports = (supabase) => {
  // Route to report a crime
  router.post('/report', (req, res) => reportCrime(req, res, supabase));

  // Route to update the status of a crime report (using report_id)
  router.patch('/update/:reportId/status', (req, res) => updateCrimeStatus(req, res, supabase));

  return router;
};
