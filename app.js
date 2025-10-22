import express from "express";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "public");

import { requireLogin } from "./middleware.js";
import loginRoute from "./routes/loginRoutes.js";

const app = express();
const port = 3003;

const server = app.listen(port, () =>
  console.log("Server listening on port " + port)
);

app.set("view engine", "pug");
app.set("views", "views");
app.use(express.static(publicPath));

// Routes
app.use("/login", loginRoute);

app.get("/", requireLogin, (req, res, next) => {
  let payload = {
    pageTitle: "Home",
  };

  res.status(200).render("home", payload);
});
