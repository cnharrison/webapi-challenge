require('dotenv').config()
const server = require("./server.js");

const port = process.env.PORT || 9090;

server.listen(9090, () => {
  console.log("we out here listening");
});

