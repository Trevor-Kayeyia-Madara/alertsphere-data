const reportMissingPerson = async (req, res, supabase) => {
    const {
      missing_person_name,
      age,
      physical_description,
      last_known_location,
      date_of_disappearance,
      reporter_id,
    } = req.body;
  
    // Insert missing person report into Supabase
    const { data, error } = await supabase
      .from('missing_person_reports')
      .insert([{
        missing_person_name,
        age,
        physical_description,
        last_known_location,
        date_of_disappearance,
        reporter_id,
        status: 'Open',
        submitted_date: new Date() // ✅ fixed column name
      }]);
  
    if (error) return res.status(400).json({ error: error.message });
  
    res.status(201).json({
      message: 'Missing person report submitted successfully',
      report: data,
    });
  };
  
  module.exports = { reportMissingPerson };
  