const express = require('express');
const router = express();
const signUpTemplateCopy = require('../models/RegisterModels');
const bcrypt = require('bcrypt');
const passport = require('passport');

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


router.post('/login', (req,res,next) => {
	console.log(req.body);
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login'
	})(req,res,next);
});


module.exports = router;