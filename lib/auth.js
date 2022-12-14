const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../schemas/user");
const NotaryPublic = require("../schemas/notary");

passport.use("userLocal", new LocalStrategy({ usernameField: "emailAddressLogin", passwordField: "passwordLogin" }, async (username, password, done) => {

    try {
		const user = await User.findOne({ emailAddress: username }).exec();

		if (!user) {
			return done(null, false);
		}

		const checkPassword = await user.comparePassword(password);

		if (!checkPassword) {
			return done(null, false);
		}

		return done(null, user);
	
	} catch (err) {
		return done(err);
	}
}));

passport.use("notaryPublicLocal", new LocalStrategy({ usernameField: "emailAddressLogin", passwordField: "passwordLogin" }, async (username, password, done) => {

    try {
		const notaryPublic = await NotaryPublic.findOne({ emailAddress: username }).exec();

		if (!notaryPublic) {
			return done(null, false);
		}

		const checkPassword = await notaryPublic.comparePassword(password);

		if (!checkPassword) {
			return done(null, false);
		}

		return done(null, notaryPublic);
	
	} catch (err) {
		return done(err);
	}
}));


passport.serializeUser((user, done) => {
    return done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    
    try{
        let user = await User.findById(id).exec();
		if(!user) user = await NotaryPublic.findById(id).exec();
        return done(null, user);
    } catch (err) { 
        return done(err);
    }
});

module.exports = {
	initialize: passport.initialize(),
	session: passport.session(),
	setUser: (req, res, next) => {
		res.locals.user = req.user;
		return next();
	},
};
