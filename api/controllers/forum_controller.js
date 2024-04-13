const User = require("../models/User");
const Forum = require("../models/Forum");

const forumController = {
    createPost: async(req,res) =>{
        const { title, desc, image } = req.body;
        try{
            const decoded = req.user;
            const user = await User.findOne({ email: decoded.email });
            if(!user) {
              return res.status(404).json({ message: "User not found" })
            }
            const new_post = new Forum({ title, desc, image, author:user.name, authorId:user._id });
            await new_post.save();
            res.status(201).json({ message: "Post created successfully", post: new_post });
        }catch(error){
            res.status(400).json({message:"error"});
        }
    },

    addComment: async(req, res) => {
        const postId = req.params.id;
        const { comment } = req.body;
        try {
            const decoded = req.user;
            const user = await User.findOne({ email: decoded.email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const forumPost = await Forum.findById(postId);
            if (!forumPost) {
                return res.status(404).json({ message: "Post not found" });
            }
            forumPost.comments.push({ user: user._id, name: user.name, comment:comment });
            await forumPost.save();
            res.status(200).json({ message: "Comment added successfully", post: forumPost });
        } catch (error) {
            res.status(400).json({ message: error.message || "Something went wrong" });
        }
    },

    deleteComment: async (req, res) => {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        try {
            const decoded = req.user;
            const user = await User.findOne({ email: decoded.email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const forumPost = await Forum.findById(postId);
            if (!forumPost) {
                return res.status(404).json({ message: "Post not found" });
            }
            const commentToDelete = forumPost.comments.find(comment => comment._id.toString() === commentId);
            if (!commentToDelete) {
                return res.status(404).json({ message: "Comment not found" });
            }
            if (forumPost.author !== user.name && commentToDelete.user.toString() !== user._id.toString()) {
                return res.status(403).json({ message: "Unauthorized to delete comment" });
            }
            forumPost.comments = forumPost.comments.filter(comment => comment._id.toString() !== commentId);
            await forumPost.save();
            res.status(200).json({ message: "Comment deleted successfully", post: forumPost });
        } catch (error) {
            res.status(400).json({ message: error.message || "Something went wrong" });
        }
    },
    
    deletePost: async (req, res) => {
        const postId = req.params.id;
        try {
            const deletedPost = await Forum.findByIdAndDelete(postId);
            if (!deletedPost) {
                return res.status(404).json({ message: "Post not found" });
            }
            res.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            res.status(400).json({ message: error.message || "Something went wrong" });
        }
    },

    getAllPosts: async(req, res) => {
        try{
            const allPosts = await Forum.find();
            res.status(200).json({ posts: allPosts });
        }catch(error){
            res.status(400).json({ message: error.message || "Something went wrong" });
        }
    },

    getPostsByUser: async(req, res) => {
        try{
            const decoded = req.user;
            const user = await User.findOne({ email: decoded.email });
            const userPosts = await Forum.find({ authorId: user._id });
            if (userPosts.length === 0) {
                return res.status(404).json({ message: "No posts found for this user" });
            }
            res.status(200).json({ posts: userPosts });
        }catch(error){
            res.status(400).json({ message: error.message || "Something went wrong" });
        }
    },
};

module.exports = forumController;
