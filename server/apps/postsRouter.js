import { Router } from "express";

const postsRouter = Router();

postsRouter.post("/", (req, res) => {
  console.log(req);
  return res.json({
    message: "Create a new user successfully",
  });
});

export default postsRouter;
