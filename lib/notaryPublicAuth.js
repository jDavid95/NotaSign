const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const NotaryPublic = require("../schemas/notary");

passport.use(new LocalStrategy({ usernameField: "emailAddressLogin", passwordField: "passwordLogin" }, async (username, password, done) => {

    try {
		const notaryPublic = await NotaryPublic.findOne({ emailAddress: username }).exec();

		if (!user) {
			return done(null, false);
		}

		const checkPassword = await notaryPublic.comparePassword(password);

		if (!checkPassword) {
			return done(null, false);
		}

		return done(null, user);
	
	} catch (err) {
		return done(err);
	}
}));

passport.serializeUser((notaryPublic, done) => {
    return done(null, notaryPublic._id);
});

passport.deserializeUser(async (id, done) => {
    
    try{
        const notaryPublic = await NotaryPublic.findById(id).exec();
        return done(null, notaryPublic);
    } catch (err) { 
        return done(err);
    }
});

module.exports = {
	initialize: passport.initialize(),
	session: passport.session(),
	setUser: (req, res, next) => {
		res.locals.notaryPublic = req.notaryPublic;
		return next();
	},
};
