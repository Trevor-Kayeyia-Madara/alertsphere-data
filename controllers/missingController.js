// missingController.js

// Function to report a missing person
const reportMissingPerson = async (req, res, supabase) => {
  const { name, lastSeenLocation, lastSeenDate } = req.body;

  // Insert missing person into the Supabase table
  const { data, error } = await supabase
    .from('missing_person_reports')
    .insert([
      { name, last_seen_location: lastSeenLocation, last_seen_date: lastSeenDate }
    ]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({ message: 'Missing person reported successfully', missingPerson: data });
};

// Function to update the status of a missing person
const updateMissingPersonStatus = async (req, res, supabase) => {
  const { reportId } = req.params;  // Get the report_id from the route params
  const { status } = req.body;      // Get the status from the request body

  // Validate that the status is valid
  if (!['Missing', 'Found', 'Recovered'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status provided' });
  }

  // Update the status of the missing person report in the database
  const { data, error } = await supabase
    .from('missing_person_reports')
    .update({ status })
    .eq('report_id', reportId);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ message: 'Missing person status updated successfully', updatedPerson: data });
};

module.exports = { reportMissingPerson, updateMissingPersonStatus };
