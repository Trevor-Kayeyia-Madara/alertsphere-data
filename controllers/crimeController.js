const reportCrime = async (req, res, supabase) => {
  const {
    crime_type,
    crime_description,
    crime_location,
    date_time_of_incident,
    reporter_id,
  } = req.body;
  console.log('Received Report:', req.body); // Check the data received in the backend
  // Insert crime report into Supabase
  const { data, error } = await supabase
    .from('crime_reports')
    .insert([{
      crime_type,
      crime_description,
      crime_location,
      date_time_of_incident,
      reporter_id,
      status: 'Pending',   // Ensure 'status' column exists
      submitted_date: new Date()  // Ensure 'submitted_date' column exists
    }]);

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({
    message: 'Crime report submitted successfully',
    report: data,
  });
};

module.exports = { reportCrime };
