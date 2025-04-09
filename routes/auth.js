const express = require('express');
const { registerUser , loginUser  } = require('../controllers/authController');

const router = express.Router();

module.exports = (supabase) => {
  router.post('/register', (req, res) => registerUser (req, res, supabase));
  router.post('/login', (req, res) => loginUser (req, res, supabase));
  return router;
};