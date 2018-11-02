const express = require("express");
const app = express();
const MESSAGE = process.env.MESSAGE;

app.get("/", function(req, res) {
  console.log("Received a request.");
  res.send(MESSAGE);
});

const port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on port", port);
});
