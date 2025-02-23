const express = require("express");
const authController = require("../controller/authController");
const commentController = require("../controller/commentController");

const router = express.Router();

// test route
router.get("/test", (req, res) => {
  res.send("Hello my new Worldddd!");
});

// login router
router.post("/login", authController.login);

// register router
router.post("/register", authController.register);

// Add comment route
router.post("/addComment", commentController.addComment);

// Get all comments route
router.get("/allComments", commentController.getAllComments);

// Get comments by user route
router.get("/commentsByUser/user/:userId", commentController.getCommentsByUser);

// Update comment route
router.put("/updateComment/:commentId", commentController.updateComment);

// Delete comment route
router.delete("/deleteComment/:commentId", commentController.deleteComment);

module.exports = router;
