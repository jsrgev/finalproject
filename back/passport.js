const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const express = require('express');

let app = express();

const passport = require('passport');

app.use(passport.initialize());

const User = require('./models/RegisterModels')



module.exports = function(passport) {
	passport.use(
		new LocalStrategy((username, password, done) => {
			console.log(username + " / " + password);
			// Match user
			User.findOne({username: username})
			.then(user => {
				if(!user) {
					console.log("no user");
					return done(null, false, { message: 'That email is not registered' });
				}
				// Match password
				bcrypt.compare(password, user.password, (err, isMatch) => {
						if(err) throw err;
						if(isMatch) {
							console.log("yes password");
							console.log(user);
							return done(null, user);
						} else {
							console.log("no password");
							return done(null,false, { message: 'Password is incorrect' })
						}
				});

			})
			.catch(err => console.log(err));
		})
	);
};

passport.serializeUser((user,done) => {
	done(null,user.id);
});

passport.deserializeUser((id,done) => {
	User.findById(id, (err,user) => {
		done(err,user);
	})
})





