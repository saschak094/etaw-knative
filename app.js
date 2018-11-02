const express = require("express");
const app = express();
const sessions = {
  monday: [{ title: "lolo", time: "8:00-9:00" }],
  tuesday: [{ title: "lala", time: "9:00-10:00" }],
  wednesday: [{ title: "lele", time: "10:00-11:00" }]
};

app.get("/", function(req, res) {
  console.log("Received a request.");
  res.send(sessions);
});

const port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on port", port);
});
