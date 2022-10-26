import express from "express";
import postsRouter from "./apps/postsRouter.js";

const app = express();
const port = 4000;

app.use("/posts", postsRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));
