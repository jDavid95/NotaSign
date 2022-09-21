const mongoose = require ("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DATABASE_LOGIN, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) throw err;
    console.log("connected");
});