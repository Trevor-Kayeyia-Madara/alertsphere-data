const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Registration
const registerUser = async (req, res, supabase) => {
  const { full_name, email, phone_number, password, role } = req.body;

  // Validate role
  if (!['citizen', 'law_enforcement'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role specified' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([{
        full_name,
        email,
        phone_number,
        password: hashedPassword,
        role,
        verification_status: false,
        anonymous_status: false,
        registration_date: new Date()
      }])
      .select();

    if (error) return res.status(400).json({ error: error.message });

    const user = { ...data[0] };
    delete user.password_hash;

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

// User Login
const loginUser = async (req, res, supabase) => {
  const { email, password } = req.body;

  // Fetch user from Supabase
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !data) return res.status(401).json({ error: 'Invalid credentials' });

  // Compare passwords
  const isMatch = await bcrypt.compare(password, data.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

  // Generate JWT
  const token = jwt.sign(
    { id: data.user_id, role: data.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  const user = { ...data };
  delete user.password;

  res.status(200).json({ message: 'Login successful', token, user });
};

module.exports = { registerUser, loginUser };
