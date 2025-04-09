const express = require('express');
const { sendNotification, getNotifications } = require('../controllers/notificationController');

const router = express.Router();

module.exports = (supabase) => {
  router.post('/send', (req, res) => sendNotification(req, res, supabase));
  router.get('/:citizenId', (req, res) => getNotifications(req, res, supabase));
  return router;
};