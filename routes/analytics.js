const express = require('express');
const { getCrimeAnalytics, getMissingPersonAnalytics } = require('../controllers/analyticsController');

const router = express.Router();

module.exports = (supabase) => {
  router.get('/crime', (req, res) => getCrimeAnalytics(req, res, supabase));
  router.get('/missing', (req, res) => getMissingPersonAnalytics(req, res, supabase));
  return router;
};