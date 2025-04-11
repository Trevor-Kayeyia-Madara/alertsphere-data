const createPost = async (req, res, supabase) => {
  const { title, content, author_id } = req.body;

  // Check if title and content are provided
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  // Log the request body to ensure it's being received correctly
  console.log('Request Body:', req.body);

  // Insert post into Supabase
  const { data, error } = await supabase
    .from('community_forum')
    .insert([{
      title,
      content,
      author_id: author_id || null,  // Use null for anonymous posts
      status: 'Active',
      date_time_created: new Date()
    }]);

  if (error) {
    console.error('Supabase Error:', error.message);  // Log Supabase errors
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({ message: 'Post created successfully', post: data });
};

  
  const getPosts = async (req, res, supabase) => {
    // Fetch all posts from Supabase
    const { data, error } = await supabase
      .from('community_forum')
      .select('*');
  
    if (error) return res.status(400).json({ error: error.message });
  
    res.status(200).json({ posts: data });
  };
  
  module.exports = { createPost, getPosts };