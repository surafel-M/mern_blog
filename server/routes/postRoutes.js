import express from "express";
import {
  createPost,
  getMyPosts,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";



const router = express.Router();


router.route("/")
  .get(getPosts)
  .post(protect, upload.single("image"), createPost);

router.get("/my-posts", protect, getMyPosts);  
router.route("/:id")
  .get(getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

export default router;