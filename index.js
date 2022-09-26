const express = require("express");
const path = require("path");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const database = require("./lib/database");
const routes = require("./routes");
const auth = require("./lib/auth");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));

app.use(express.static(path.join(__dirname, '/')));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: false, store: MongoStore.create({ mongoUrl: process.env.DATABASE_LOGIN }) }));

app.use(auth.initialize);
app.use(auth.session);
app.use(auth.setUser);

app.use(routes());

app.use(function(req, res) {
	res.status(404);

	let fullName = ""
	let notaryPublicLoggedIn = false;

	if(req.user) {
		fullName = req.user.firstName + " " + req.user.lastName;
		if(req.user.notaryPublic) {
			notaryPublicLoggedIn = true;
		}
	} 

	return res.render("404", { anyUserLoggedIn: req.user, notaryPublicLoggedIn: notaryPublicLoggedIn, fullName: fullName });
});

app.listen(port, () =>
    console.log(`Listening on Port: ${port}`)
);
