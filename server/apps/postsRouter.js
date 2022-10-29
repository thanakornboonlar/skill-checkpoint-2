import { Router } from "express";
import { pool } from "../utils/db.js";

const postsRouter = Router();

postsRouter.post("/", async (req, res) => {
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

postsRouter.get("/", async (req, res) => {
  const results = await pool.query(`SELECT * FROM posts`);
  return res.json({
    data: results.rows,
    message: "Get posts has been Successfully",
  });
});

postsRouter.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const result = await pool.query(`SELECT * FROM posts WHERE post_id=$1 `, [
    postId,
  ]);
  return res.json({
    data: result.rows[0],
    message: "Get post has been Successfully",
  });
});

postsRouter.put("/:postId", async (req, res) => {
  const newTitle = req.body.title;
  const newContent = req.body.content;
  const newImage_url = req.body.image;
  const newVideo_url = req.body.video;
  const updated_at = new Date();
  const newCategory = req.body.category;
  const postId = req.params.postId;
  await pool.query(
    `UPDATE posts SET post_title=$1,post_content=$2,post_video_url=$3,post_image_url=$4,updated_at=$5,category_id=$6 WHERE post_id=$7`,
    [
      newTitle,
      newContent,
      newVideo_url,
      newImage_url,
      updated_at,
      newCategory,
      postId,
    ]
  );
  return res.json({
    message: "Post has been updated Successfully",
  });
});

postsRouter.delete("/:postId", async (req, res) => {
  const postId = req.params.postId;
  await pool.query(`DELETE FROM posts WHERE post_id=$1`, [postId]);
  return res.json({ message: "Post has been deleted Successfully" });
});

export default postsRouter;
