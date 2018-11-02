const express = require("express");
const app = express();
const sessions = {
  monday: ["lolo"],
  tuesday: ["lala"],
  wednesday: ["lele"]
};
app.get("/", function(req, res) {
  console.log("Received a request.");
  res.send(sessions);
});

const port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on port", port);
});
