const createPost = async (req, res, supabase) => {
    const { title, content, author_id } = req.body;
  
    // Insert post into Supabase
    const { data, error } = await supabase
      .from('community_forum')
      .insert([{
        title,
        content,
        author_id,
        status: 'Active',
        date_time_created: new Date()
      }]);
  
    if (error) return res.status(400).json({ error: error.message });
  
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