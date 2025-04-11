const express = require('express');
const getUserProfile = require('../controllers/getUserProfile');

module.exports = (supabase) => {
  const router = express.Router();

  router.get('/profile', (req, res) => getUserProfile(req, res, supabase));

  return router;
};
