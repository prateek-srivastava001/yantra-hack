const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const os = require("os");
const cors = require("cors");
const authRoute = require("./api/routes/auth_router");
const transRoute = require("./api/routes/transcript_router");
const forumRoute = require("./api/routes/forum_router");
require("dotenv").config();

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

const mongoURI = process.env.DB_URI;

console.log(mongoURI);
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.get("/ping", (_, res) => {
  res.status(200).json({ msg: "pong", hostname: os.hostname() });
});

app.use(authRoute);
app.use(forumRoute);
app.use(transRoute);

app.listen(8080, () => {
  console.log("Server started at port: 8080");
});