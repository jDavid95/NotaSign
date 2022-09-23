const express = require("express");
const path = require("path");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const database = require("./lib/database");
const routes = require("./routes");
const userAuth = require("./lib/userAuth");
const notaryPublicAuth = require("./lib/notaryPublicAuth")
require("dotenv").config();

const app = express();
const port = 3000;

app.use(helmet({ contentSecurityPolicy: false }));

app.use(express.static(path.join(__dirname, './')));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: false, store: MongoStore.create({ mongoUrl: process.env.DATABASE_LOGIN }) }));

app.use(userAuth.initialize);
app.use(userAuth.session);
app.use(userAuth.setUser);

app.use(notaryPublicAuth.initialize);
app.use(notaryPublicAuth.session);
app.use(notaryPublicAuth.setNotaryPublic);

app.use(routes());

app.use(function(req, res) {
	res.status(404);

	if(req.user) {
		fullName = req.user.firstName + " " + req.user.lastName;
	} else if(req.notaryPublic) {
		fullName = req.notaryPublic.firstName + " " + req.notaryPublic.lastName;
	}

	return res.render('404', { userLoggedIn: req.user, notaryPublicLoggedIn: req.notaryPublic, fullName: fullName });
});

app.listen(port, () =>
    console.log(`Listening on Port: ${port}`)
);
