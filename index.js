const express = require("express");
const session = require("express-session");
const passport = require("passport");
const discordStrategy = require("./strategies/discordstrategy");

const mongoose = require('mongoose');
const config = require('./config.json');
require("dotenv").config();

const PORT = process.env.PORT;

const app = express();

app.use(session({
    secret: '8C81FJ8iDvK6tDELKTQYUYdmDpusAT',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', passport.authenticate('discord'));

app.get('/verified', passport.authenticate('discord'),  function(req, res) {
  res.status(200).sendFile('index.html', { root: __dirname });
});

app.listen(PORT, () => {
    console.log(`Listening for requests on port ${PORT}`);
});

    mongoose.connect(config.dataURL, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('connected',( )=> {
      console.log('[✅DataBase] Connected!')
  })
