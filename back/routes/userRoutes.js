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
	console.log("running!");
	console.log(req.body);
	const {firstName, lastName, username, email, password, password2} = req.body;
	let errors = [];

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
	// console.log(password)
	// console.log(saltPassword)
	const securePassword = await bcrypt.hash(password, saltPassword);


	const newUser = new userTemplateCopy({...req.body, password:securePassword});
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
				// console.log(user._doc)
				// console.log(user.lastName)
				let {password, __v, ...userInfo} = user._doc;
				// 	userInfo
				// 	id: user._id,
				// 	firstName: user.firstName,
				// 	lastName: user.lastName,
				// 	username: user.username,
				// 	email: user.email,
				// 	date: user.date
				// }
				// console.log(userInfo);
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

router.post('/updateProfile', (req,res) => {
	console.log(req.body);
	let {userId, user} = req.body; 
	User.updateOne(
		{ _id: userId },
  			user
  		)
	.then(results => {
		// console.log(results);
		return User.findOne({ _id: userId},{password:0})
	})
	.then(user => {
		// console.log(user);
		res.send(user);
	})
	.catch(err => console.log(err));
	// res.send(req.body);
})



module.exports = router;