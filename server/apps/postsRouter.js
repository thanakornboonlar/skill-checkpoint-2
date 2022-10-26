import { Router } from "express";
import { pool } from "../utils/db.js";

const postsRouter = Router();

postsRouter.post("/", async (req, res) => {
  console.log(req.body);
  const postId = req.body.post_id;
  const title = req.body.post_title;
  const content = req.body.post_content;
  const likes = req.body.post_likes;
  const videoUrl = req.body.post_video_url;
  const imageUrl = req.body.post_image_url;
  const createdAt = new Date();
  const updatedAt = new Date();
  const categoryId = req.body.category_id;
  const userId = req.body.user_id;

  await pool.query(
    "INSERT INTO posts(post_id,post_title,post_content,post_likes,post_video_url,post_image_url,created_at,updated_at,category_id,user_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
    [
      postId,
      title,
      content,
      likes,
      videoUrl,
      imageUrl,
      createdAt,
      updatedAt,
      categoryId,
      userId,
    ]
  );
  return res.json({
    message: "Created a new Post successfully",
  });
});

export default postsRouter;
