const sendNotification = async (req, res, supabase) => {
    const { citizen_id, alert_id, notification_type } = req.body;
  
    // Insert notification into Supabase
    const { data, error } = await supabase
      .from('notifications')
      .insert([{
        citizen_id,
        alert_id,
        notification_type,
        date_time_sent: new Date()
      }]);
  
    if (error) return res.status(400).json({ error: error.message });
  
    res.status(201).json({ message: 'Notification sent successfully', notification: data });
  };
  
  const getNotifications = async (req, res, supabase) => {
    const { citizenId } = req.params;
  
    // Fetch notifications for the specified citizen
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('citizen_id', citizenId);
  
    if (error) return res.status(400).json({ error: error.message });
  
    res.status(200).json({ notifications: data });
  };
  
  module.exports = { sendNotification, getNotifications };