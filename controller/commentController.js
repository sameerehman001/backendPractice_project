const Comment = require("../models/commentSchema");
const Joi = require("joi");

const commentController = {
  // Add Comment
  async addComment(req, res, next) {
    // 1. Validate the request body
    const commentSchema = Joi.object({
      content: Joi.string().required(),
      user: Joi.string().required(),
      post: Joi.string().required(),
    });

    const { error } = commentSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    // 2. Extract data from the request body
    const { content, user, post } = req.body;

    // 3. Save the comment to the database
    try {
      const newComment = new Comment({
        content,
        user,
        post,
      });

      const savedComment = await newComment.save();

      // 4. Send a response
      return res.status(201).json({ comment: savedComment });
    } catch (error) {
      return next(error);
    }
  },

  // Get ALL Comments
  async getAllComments(req, res, next) {
    try {
      // Fetch all comments from the database
      const comments = await Comment.find()
        .populate("user", "username email")
        .populate("post", "title");

      // Send the comments as a response
      return res.status(200).json({ comments });
    } catch (error) {
      return next(error);
    }
  },

  // Get Comments by User
  async getCommentsByUser(req, res, next) {
    try {
      const { userId } = req.params;

      // Fetch comments by user and populate the 'post' field
      const comments = await Comment.find({ user: userId }).populate(
        "post",
        "title"
      );

      // Send the comments as a response
      return res.status(200).json({ comments });
    } catch (error) {
      return next(error);
    }
  },

  // Update Comment
  async updateComment(req, res, next) {
    try {
      const { commentId } = req.params;
      const { content } = req.body;

      // Validate the request body
      const updateSchema = Joi.object({
        content: Joi.string().required(),
      });

      const { error } = updateSchema.validate(req.body);

      if (error) {
        return next(error);
      }

      // Find the comment by ID and update its content
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { content },
        { new: true }
      );

      // If the comment is not found, return an error
      if (!updatedComment) {
        const error = {
          status: 404,
          message: "Comment not found",
        };
        return next(error);
      }

      // Send the updated comment as a response
      return res.status(200).json({ comment: updatedComment });
    } catch (error) {
      return next(error);
    }
  },

  // Delete Comment
  async deleteComment(req, res, next) {
    try {
      const { commentId } = req.params;

      // Find the comment by ID and delete it
      const deletedComment = await Comment.findByIdAndDelete(commentId);

      // If the comment is not found, return an error
      if (!deletedComment) {
        const error = {
          status: 404,
          message: "Comment not found",
        };
        return next(error);
      }

      // Send a success response
      return res.status(200).json({
        message: "Comment deleted successfully",
        comment: deletedComment,
      });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = commentController;
