const jwt = require('jsonwebtoken');

const getUserProfile = async (req, res, supabase) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { data, error } = await supabase
      .from('users')
      .select('user_id, full_name, email, phone_number, role, verification_status, anonymous_status, registration_date')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ user: data });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = getUserProfile;
