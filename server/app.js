import express from "express";
import postsRouter from "./apps/postsRouter.js";
import bodyParser from "body-parser";
import { pool } from "./utils/db.js";

const app = express();
const port = 4000;

app.use(bodyParser.json());

app.post("/register", async (req, res) => {
  //console.log(req.body);
  const userId = req.body.user_id;
  const username = req.body.username;
  const password = req.body.password;
  const firstname = req.body.firstName;
  const lastname = req.body.lastName;
  await pool.query(
    "INSERT INTO users (user_id, username, password, first_name,last_name) VALUES ($1,$2,$3,$4,$5);",
    [userId, username, password, firstname, lastname]
  );
  return res.json({
    message: "Created a new User successfully",
  });
});

app.use("/posts", postsRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));
