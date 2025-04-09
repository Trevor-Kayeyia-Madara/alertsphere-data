const addOfficer = async (req, res, supabase) => {
    const { user_id, rank, department, contact_info } = req.body;
  
    // Insert officer into Supabase
    const { data, error } = await supabase
      .from('law_enforcement_officers')
      .insert([{
        user_id,
        rank,
        department,
        contact_info
      }]);
  
    if (error) return res.status(400).json({ error: error.message });
  
    res.status(201).json({ message: 'Officer added successfully', officer: data });
  };
  
  const getOfficers = async (req, res, supabase) => {
    // Fetch all officers from Supabase
    const { data, error } = await supabase
      .from('law_enforcement_officers')
      .select('*');
  
    if (error) return res.status(400).json({ error: error.message });
  
    res.status(200).json({ officers: data });
  };
  
  module.exports = { addOfficer, getOfficers };