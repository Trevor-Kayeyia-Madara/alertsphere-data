const createAlert = async (req, res, supabase) => {
    const { alert_type, alert_content, location, associated_report_id } = req.body;
  
    // Insert alert into Supabase
    const { data, error } = await supabase
      .from('alerts')
      .insert([{
        alert_type,
        alert_content,
        location,
        associated_report_id,
        alert_status: 'Pending',
        timestamp: new Date()
      }]);
  
    if (error) return res.status(400).json({ error: error.message });
  
    res.status(201).json({ message: 'Alert created successfully', alert: data });
  };
  
  const getAlerts = async (req, res, supabase) => {
    // Fetch all alerts from Supabase
    const { data, error } = await supabase
      .from('alerts')
      .select('*');
  
    if (error) return res.status(400).json({ error: error.message });
  
    res.status(200).json({ alerts: data });
  };
  
  module.exports = { createAlert, getAlerts };