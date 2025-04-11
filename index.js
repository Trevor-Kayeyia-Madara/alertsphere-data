require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

// Supabase init here directly
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const crimeRoutes = require('./routes/crime');
const missingRoutes = require('./routes/missing');
const notificationRoutes = require('./routes/notifications');
const alertRoutes = require('./routes/alerts');
const communityRoutes = require('./routes/community');
const officerRoutes = require('./routes/officers');
const analyticsRoutes = require('./routes/analytics');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Pass supabase into each route
app.use('/api/auth', authRoutes(supabase));
app.use('/api/user', userRoutes(supabase));
app.use('/api/crime', crimeRoutes(supabase));
app.use('/api/missing', missingRoutes(supabase));
app.use('/api/notifications', notificationRoutes(supabase));
app.use('/api/alerts', alertRoutes(supabase));
app.use('/api/community', communityRoutes(supabase));
app.use('/api/officers', officerRoutes(supabase));
app.use('/api/analytics', analyticsRoutes(supabase));

app.get('/', (req, res) => {
  res.send('API Running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
