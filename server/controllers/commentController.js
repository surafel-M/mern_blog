import Comment from "../models/Comment.js";

// Add comment
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    const comment = await Comment.create({
      post: req.params.postId,
      user: req.user._id,
      text,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get comments for a post
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("user", "username");

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};