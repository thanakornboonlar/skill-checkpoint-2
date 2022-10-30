import { Router } from "express";
import { pool } from "../utils/db.js";

const postsRouter = Router();

postsRouter.post("/", async (req, res) => {
  const title = req.body.post_title;
  const content = req.body.post_content;
  const videoUrl = req.body.post_video_url;
  const imageUrl = req.body.post_image_url;
  const createdAt = new Date();
  const updatedAt = new Date();
  const categoryId = req.body.category_id;
  const userId = req.body.user_id;

  await pool.query(
    "INSERT INTO posts(post_title,post_content,post_video_url,post_image_url,created_at,updated_at,category_id,user_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8)",
    [
      title,
      content,
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

postsRouter.post("/:postId/comments", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.body.user_id;
  const content = req.body.content;
  const videoUrl = req.body.video;
  const imageUrl = req.body.image;
  const createdAt = new Date();
  const updatedAt = new Date();

  await pool.query(
    `INSERT INTO comments(post_id,user_id,comment_content,comment_video_url,comment_image_url,created_at,updated_at) VALUES($1,$2,$3,$4,$5,$6,$7)`,
    [postId, userId, content, videoUrl, imageUrl, createdAt, updatedAt]
  );
  return res.json({ message: "Created a new comment Successfully" });
});

postsRouter.put("/:postId/comments/:commentId", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const userId = req.body.user_id;
  const content = req.body.content;
  const videoUrl = req.body.video;
  const imageUrl = req.body.image;
  const updatedAt = new Date();

  //validate comment ownership before updating
  const result = await pool.query(
    `SELECT * FROM comments WHERE post_id=$1 AND user_id=$2`,
    [postId, userId]
  );

  if (result.rows[0] === undefined) {
    return res.json({ message: "has no comments" });
  }

  if (
    Number(postId) === Number(result.rows[0].post_id) &&
    Number(userId) === Number(result.rows[0].user_id)
  ) {
    await pool.query(
      `UPDATE comments SET comment_content=$1,comment_video_url=$2, comment_image_url=$3, updated_at=$4 WHERE comment_id=$5 AND post_id=$6 AND user_id=$7;`,
      [content, videoUrl, imageUrl, updatedAt, commentId, postId, userId]
    );
    return res.json({ message: "Comment has been updated Successfully" });
  }
});

export default postsRouter;
