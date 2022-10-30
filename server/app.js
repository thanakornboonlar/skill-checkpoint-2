import express from "express";
import postsRouter from "./apps/postsRouter.js";
import bodyParser from "body-parser";
import { pool } from "./utils/db.js";

const app = express();
const port = 4000;

app.use(bodyParser.json());

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstname = req.body.firstName;
  const lastname = req.body.lastName;
  const created_at = new Date();
  const updated_at = new Date();
  await pool.query(
    "INSERT INTO users (username, password, first_name,last_name,created_at,updated_at) VALUES ($1,$2,$3,$4,$5,$6);",
    [username, password, firstname, lastname, created_at, updated_at]
  );
  return res.json({
    message: "Created a new User successfully",
  });
});

app.use("/posts", postsRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));
