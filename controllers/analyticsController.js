const getCrimeAnalytics = async (req, res, supabase) => {
    try {
        // Fetch all crime reports from the database
        const { data, error } = await supabase
            .from('crime_reports')
            .select('crime_type');

        // Handle any errors from the Supabase query
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Process the data to count occurrences of each crime type
        const crimeCounts = {};
        data.forEach(report => {
            const type = report.crime_type;
            if (crimeCounts[type]) {
                crimeCounts[type]++;
            } else {
                crimeCounts[type] = 1;
            }
        });

        // Return the processed crime analytics data
        res.status(200).json({ crimeAnalytics: crimeCounts });
    } catch (err) {
        // Handle unexpected errors
        console.error('Error fetching crime analytics:', err);
        res.status(500).json({ error: 'An unexpected error occurred while fetching crime analytics.' });
    }
};

const getMissingPersonAnalytics = async (req, res, supabase) => {
    try {
        // Fetch all missing person reports from the database
        const { data, error } = await supabase
            .from('missing_person_reports')
            .select('status');

        // Handle any errors from the Supabase query
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Process the data to count occurrences of each status
        const statusCounts = {};
        data.forEach(report => {
            const status = report.status;
            if (statusCounts[status]) {
                statusCounts[status]++;
            } else {
                statusCounts[status] = 1;
            }
        });

        // Return the processed missing person analytics data
        res.status(200).json({ missingPersonAnalytics: statusCounts });
    } catch (err) {
        // Handle unexpected errors
        console.error('Error fetching missing person analytics:', err);
        res.status(500).json({ error: 'An unexpected error occurred while fetching missing person analytics.' });
    }
};

module.exports = { getCrimeAnalytics, getMissingPersonAnalytics };