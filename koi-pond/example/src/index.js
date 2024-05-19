import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "node:path";

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.static(path.join(path.resolve(), "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(), "public", "index.html"));
});

app.listen(port, () => {
  console.log(`app serving on port ${port}`);
});
