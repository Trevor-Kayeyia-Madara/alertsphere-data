const express = require('express');
const { createPost, getPosts } = require('../controllers/communityController');

const router = express.Router();

module.exports = (supabase) => {
  router.post('/create', (req, res) => createPost(req, res, supabase));
  router.get('/', (req, res) => getPosts(req, res, supabase));
  return router;
};