const jwt = require('jsonwebtoken');

// User Registration
const registerUser = async (req, res, supabase) => {
  const { full_name, email, phone_number, password, role } = req.body;

  // Validate role
  if (!['citizen', 'law_enforcement'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role specified' });
  }

  try {
    // Insert user into Supabase (NO HASHING)
    const { data, error } = await supabase
      .from('users')
      .insert([{
        full_name,
        email,
        phone_number,
        password, // plain-text
        role,
        verification_status: false,
        anonymous_status: false,
        registration_date: new Date()
      }])
      .select();

    if (error) return res.status(400).json({ error: error.message });

    const user = { ...data[0] };
    delete user.password;

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

// User Login
const loginUser = async (req, res, supabase) => {
  const { email, password } = req.body;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !data) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Compare plain-text passwords
  if (password !== data.password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const userRole = data.role;

  if (userRole === 'law_enforcement' && !data.officer_verification) {
    return res.status(403).json({ error: 'Law enforcement account not yet verified' });
  }

  const token = jwt.sign(
    { id: data.user_id, role: userRole },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  const user = { ...data };
  delete user.password;

  res.status(200).json({ 
    message: `Login successful as ${userRole.replace('_', ' ')}`, 
    token, 
    role: userRole, 
    user 
  });
};

module.exports = { registerUser, loginUser };
