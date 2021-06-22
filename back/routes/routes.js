const express = require('express');
const router = express();
const signUpTemplateCopy = require('../models/RegisterModels');
const bcrypt = require('bcrypt');
const passport = require('passport');

const jwt = require('jsonwebtoken');

const User = require('../models/RegisterModels')


router.post('/register', async (req,res) => {

	const {firstName, lastName, username, email, password, password2} = req.body;
	let errors = [];

	// Check form for errors
	if (!firstName || !lastName || !email || !username || !password || !password2) {
		errors.push ({msg: 'Please fill in all fields.'})
	}
	if (password !== password2 && password.length>0 && password2.length>0) {
		errors.push ({msg: 'Passwords do not match.'})
	}
	if (password.length<6 && password.length>0) {
		errors.push ({msg: 'Password must be at least 6 characters.'})
	}


	// Check for duplicate user data

	let alreadyEmail = await User.findOne({email})
	alreadyEmail && errors.push ({msg: 'There is already an account with that email.'})

	let alreadyUsername = await User.findOne({username})
	alreadyUsername && errors.push ({msg: 'That username is already in use.'})	


	if (errors.length > 0) {
		res.send({errors});
		return;
	}


	// encrypt password
	const saltPassword = await bcrypt.genSalt(10);
	const securePassword = await bcrypt.hash(password, saltPassword);
	const signedUpUser = new signUpTemplateCopy({
		firstName,
		lastName,
		username,
		email,
		password:securePassword
	});
	signedUpUser.save()
	.then(data => {
		res.json(data);
		// res.redirect('http://localhost:3000/login')
	})
	.catch(err => {
		res.json(err);
	})
	// res.send('send')
})

router.get('/login', async (req,res) => {
	res.send("login")
})

// router.post('/ ', async (req,res) => {
// 	res.send("login")
// })


// router.post('/login', (req,res,next) => {
// 	console.log(req.body);
// 	passport.authenticate('local', {
// 		successRedirect: '/',
// 		failureRedirect: '/login'
// 	})(req,res,next);
// });

router.post('/login', (req,res) => {
	const {username, password} = req.body;

	User.findOne({username: username})
	.then(user => {
		if(!user) {
			res.send({message: "user not found"});
			return;
			// return done(null, false, { message: 'That email is not registered' });
		}
		// Match password
		bcrypt.compare(password, user.password, (err, isMatch) => {
				if(err) throw err;
				if(isMatch) {
					const id = user._id;
					const token = jwt.sign({id}, "jwtSecret", {

						expiresIn: 300 //300 = 5 minutes
					})
					res.json({auth:true, token, user});
					// res.send("you are logged in");
					// return done(null, user);
				} else {
					res.send({message: "not a match"});
					// return done(null,false, { message: 'Password is incorrect' })
				}
		});

	})
	.catch(err => console.log(err));

});


const verifyJWT = (req,res,next) => {
	const token = req.headers["x-access-token"]
	if (!token) {
		res.send("Token needed.");
	} else {
		jwt.verify(token, "jwtSecret", (err, decoded) => {
			if (err) {
				res.send({ auth: false, message: "Authenication failed"})
			} else {
				req.userId = decoded.id;
				next();
			}
		})
	}
}

router.get('/isUserAuthenticated', verifyJWT, (req,res) => {
	res.send("authenticated")
})


// router.post('/login',
// 	passport.authenticate('local'),
// 	  function(req, res) {
// 	    // If this function gets called, authentication was successful.
// 	    // `req.user` contains the authenticated user.
// 	    // res.redirect('/users/' + req.user.username);
// 	    res.send(req.user.username);
// });


module.exports = router;