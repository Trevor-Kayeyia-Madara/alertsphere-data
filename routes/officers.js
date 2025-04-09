const express = require('express');
const { addOfficer, getOfficers } = require('../controllers/officerController');

const router = express.Router();

module.exports = (supabase) => {
  router.post('/add', (req, res) => addOfficer(req, res, supabase));
  router.get('/', (req, res) => getOfficers(req, res, supabase));
  return router;
};