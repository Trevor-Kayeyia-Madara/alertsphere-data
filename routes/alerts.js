const express = require('express');
const { createAlert, getAlerts } = require('../controllers/alertController');

const router = express.Router();

module.exports = (supabase) => {
  router.post('/create', (req, res) => createAlert(req, res, supabase));
  router.get('/', (req, res) => getAlerts(req, res, supabase));
  return router;
};