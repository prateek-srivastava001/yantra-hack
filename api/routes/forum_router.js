const express = require("express");
const verifyAccessToken = require("../middlewares/jwtMiddleware");
const forumController = require("../controllers/forum_controller");
const router = express.Router();

router.get("/forum/posts/all", forumController.getAllPosts);
router.post("/forum/create",verifyAccessToken, forumController.createPost);
router.delete("/forum/:id", verifyAccessToken, forumController.deletePost);
router.put("/forum/:id", verifyAccessToken, forumController.addComment);
router.delete("/forum/:postId/:commentId", verifyAccessToken, forumController.deleteComment);
router.get("/forum/myposts", verifyAccessToken, forumController.getPostsByUser);
router.get("/forum/:id",forumController.getPostById);

module.exports = router;