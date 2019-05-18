const express = require("express");

const ProjectsRouter = require("./projects-router.js");
const ActionsRouter = require("./actions-router.js");

const server = express();

server.use(express.json());
server.use("/api/projects", ProjectsRouter);
server.use("/api/actions", ActionsRouter);

server.get("/", (req, res) => {
  res.send("<h1>🙈🙉🙊🐵projects + actions server🐵🙊🙉🙈</h1>");
});

module.exports = server;
