const express = require("express");
const path = require("path");
const helmet = require("helmet");



const routes = require("./routes");
require("dotenv").config();



const app = express();
const port = 3000;

app.use(helmet({ contentSecurityPolicy: false }));

app.use(express.static(path.join(__dirname, './')));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(routes());

app.listen(port, () =>
    console.log(`Listening on Port: ${port}`)
);


