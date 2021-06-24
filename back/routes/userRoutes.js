const express = require('express');
const router = express();
const userTemplateCopy = require('../models/UserModel');
const bcrypt = require('bcrypt');
// const passport = require('passport');

const jwt = require('jsonwebtoken');

const User = require('../models/UserModel')

// generated private and public keys from https://www.csfieldguide.org.nz/en/interactives/rsa-key-generator/
const dotenv = require('dotenv');
dotenv.config();


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
	if (password === username) {
		errors.push ({msg: 'Password cannot match username.'})
	}
	if (password === email) {
		errors.push ({msg: 'Password cannot match email.'})
	}
	if (password === firstName || password === lastName || password === firstName+lastName) {
		errors.push ({msg: 'Password cannot be your name.'})
	}
	if (password === "password") {
		errors.push ({msg: 'Password is too easy to guess. Please choose a different one.'})
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

	const newUser = new userTemplateCopy({
		firstName,
		lastName,
		username,
		email,
		password:securePassword
	});
	newUser.save()
	.then(data => {
		res.json(data);
	})
	.catch(err => {
		res.json(err);
	})
})

router.get('/login', async (req,res) => {
	res.send("login")
})


router.post('/login', (req,res) => {
	const {username, password} = req.body;

	// Check form for errors
	if (!username || !password) {
		// console.log("nope");
		res.send({auth: false, message: 'Please fill in both fields.'});
		return;
	}

	User.findOne({username: username})
	.then(user => {
		if(!user) {
			res.send({auth: false, message: "User not found."});
			return;
		}
		// Match password
		bcrypt.compare(password, user.password, (err, isMatch) => {
				if(err) throw err;
				if(isMatch) {
					const id = user._id;
					const token = jwt.sign({id}, process.env.PRIVATE_KEY, {
						expiresIn: "30d"
					})
					// send user info, excluding password
					let userInfo = {
						id: user._id,
						firstName: user.firstName,
						lastName: user.lastName,
						username: user.username,
						email: user.email,
						date: user.date
					}
					res.json({auth:true, token, userInfo});
				} else {
					res.send({auth: false, message: "Password is incorrect."});
				}
		});

	})
	.catch(err => console.log(err));

});


const verifyJWT = (req,res,next) => {
	const token = req.headers["x-access-token"]
	if (!token) {
		res.send({ auth: false, message: "Token needed."});
	} else {
		jwt.verify(token, process.env.PUBLIC_KEY, (err, decoded) => {
			if (err) {
				console.log(err);
				res.send({ auth: false, message: "Authentication failed."})
			} else {
				req.userId = decoded.id;
				next();
			}
		})
	}
}

router.get('/isUserAuthenticated', verifyJWT, (req,res) => {
	res.send({auth: true, message: "Authenticated."})
})


router.get('/logout', (req,res) => {

	res.send({auth: true, message: "Authenticated."})
})


router.get('/getUsers', async (req,res) => {
	// console.log(req.body);
	User.find({},{password:0})
		.then(users => {
			if(!users) {
				res.send({result: false, message: "No registered users have been found."});
			} else {
				res.send({result: true, users});
			}
			})		
		.catch(err => console.log(err));
})


module.exports = router;