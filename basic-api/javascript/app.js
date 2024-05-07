import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "node:path";
import { logger } from "./middleware/logger";
import handlers from "./handlers";

dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.static(path.join(path.resolve(), "public")));
// here we establish a middleware handler
// use is a wrapper *essentially* for app.<any>('*', <middleware>)
// where any method and route combination are intercepted by the middleware handler before cascading down to a route handler declared here.
app.use(logger);

app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(), "public", "index.html"));
});

// to showcase the cascading nature of these endpoints, see below the 2 /ping endpoints
// We want the furthest endpoint to execute on a get request to /ping, however we have another
// handler that is intercepting the request first, and therefore returning early.
app.get("/ping", (req, res) => {
  res.send("uh oh, this one got the request first!\n");
});

app.get("/ping", (req, res) => {
  res.send("pong\n");
});

// A valid use of this ordering can be seen in the middleware above
// which we could write as this:
app.get("/example", (req, res, next) => {
  console.log("I am executed");
  next();
});

app.get("/example", (req, res, next) => {
  console.log("I am also executed");
  next();
});

app.get("/example", (req, res) => {
  // the reason the send command is the final stop is it formulates and sets the headers of the response object
  // which cannot be reset once they have been set (security).
  res.send("I am the final execution, as I have a send command");
});

app.post("/login", handlers.login);

app.listen(port, () => {
  console.log(`app serving on port ${port}`);
});
