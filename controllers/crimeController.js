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
// Function to update the status of a crime report
const updateCrimeStatus = async (req, res, supabase) => {
  const { reportId } = req.params;  // Get the report_id from the route params
  const { status } = req.body;      // Get the status from the request body

  // Validate that the status is valid
  if (!['Pending', 'Resolved', 'Under Investigation'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status provided' });
  }

  // Update the status of the crime report in the database
  const { data, error } = await supabase
    .from('crime_reports')
    .update({ status })
    .eq('report_id', reportId);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ message: 'Crime report status updated successfully', updatedCrime: data });
};
const getCrimeReports = async (req, res, supabase) => {
  const { status } = req.query;  // Optional query parameter to filter by status (e.g., Pending, Resolved, Under Investigation)
  
  // Build the query
  let query = supabase.from('crime_reports').select('*');
  
  // If a status is provided, filter the results by status
  if (status && ['Pending', 'Resolved', 'Under Investigation'].includes(status)) {
    query = query.eq('status', status);
  }
  
  // Execute the query
  const { data, error } = await query;

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ crimeReports: data });
};

module.exports = { reportCrime, updateCrimeStatus, getCrimeReports };