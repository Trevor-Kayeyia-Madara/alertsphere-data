require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const authRoutes = require('./routes/auth');
const crimeRoutes = require('./routes/crime');
const missingRoutes = require('./routes/missing');
const notificationRoutes = require('./routes/notifications');
const alertRoutes = require('./routes/alerts');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Routes
app.use('/api/auth', authRoutes(supabase));
app.use('/api/crime', crimeRoutes(supabase));
app.use('/api/missing', missingRoutes(supabase));
app.use('/api/notifications', notificationRoutes(supabase));
app.use('/api/alerts', alertRoutes(supabase));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});