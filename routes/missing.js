const express = require('express');
const { reportMissingPerson, updateMissingPersonStatus } = require('../controllers/missingController');

const router = express.Router();

module.exports = (supabase) => {
  // Route to report a missing person
  router.post('/report', (req, res) => reportMissingPerson(req, res, supabase));

  // Route to update missing person status (using report_id)
  router.patch('/update/:reportId/status', (req, res) => updateMissingPersonStatus(req, res, supabase));

  return router;
};
