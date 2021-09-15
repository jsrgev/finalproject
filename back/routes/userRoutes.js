const express = require('express');
const router = express();
const userTemplateCopy = require('../models/UserModel');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('../models/UserModel')

// generated private and public keys from https://www.csfieldguide.org.nz/en/interactives/rsa-key-generator/
const dotenv = require('dotenv');
dotenv.config();


router.post('/register', async (req,res) => {
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
	const securePassword = await bcrypt.hash(password, saltPassword);

	let avatarUrl = `https://joeschmoe.io/api/v1/${username}`
	const newUser = new userTemplateCopy({...req.body, password:securePassword, avatarUrl});
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
				let {password, __v, ...userInfo} = user._doc;
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
	let {userId, user} = req.body;
	User.updateOne(
		{ _id: userId },
  			user
  		)
	.then(results => {
		return User.findOne({ _id: userId},{password:0})
	})
	.then(user => {
		res.send(user);
	})
	.catch(err => console.log(err));
})

router.post('/updateAccount', async (req,res) => {
	let {userId, user} = req.body;
	const {firstName, lastName, username, email, password, password2} = user;
	let errors = [];

	// Check for duplicate user data

	let alreadyEmail = await User.findOne({email, _id: {$ne: userId}})
	alreadyEmail && errors.push ({msg: 'There is already an account with that email.'})

	let alreadyUsername = await User.findOne({username, _id: {$ne: userId}})
	alreadyUsername && errors.push ({msg: 'That username is already in use.'})	

	if (errors.length > 0) {
		res.send({errors});
		return;
	} else {

	User.updateOne(
		{ _id: userId },
  			user
  		)
	.then(results => {
		return User.findOne({ _id: userId},{password:0})
	})
	.then(user => {
		res.send(user);
	})
	.catch(err => console.log(err));
	}
})

module.exports = router;