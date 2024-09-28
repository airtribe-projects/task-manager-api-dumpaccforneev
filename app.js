const express = require("express");
const app = express();
const routes = require("./routes/routes");
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/tasks", routes);

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
