const getReports = async (req, res, supabase) => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('report_date', { ascending: false });
  
      if (error) return res.status(400).json({ error: error.message });
  
      res.status(200).json({ reports: data });
    } catch (err) {
      res.status(500).json({ error: 'Server error: ' + err.message });
    }
  };
  
  module.exports = { getReports };
  