const express = require("express");
const app = express();

const port = 3000;
const path = require("path");

app.use(express.static(path.join(__dirname, './')));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port, () =>
    console.log(`listening on Port: ${port}`)
);


