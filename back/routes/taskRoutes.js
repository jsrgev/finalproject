const express = require('express');
const router = express();
const taskTemplateCopy = require('../models/TaskModel');
// const bcrypt = require('bcrypt');
// const passport = require('passport');

// const jwt = require('jsonwebtoken');

const Task = require('../models/TaskModel')

// generated private and public keys from https://www.csfieldguide.org.nz/en/interactives/rsa-key-generator/
const dotenv = require('dotenv');
dotenv.config();


router.post('/addTask', async (req,res) => {
	const {taskName, userId, penalty, details, dateDue} = req.body;
	let errors = [];

	// Check form for errors
	// if (!firstName || !lastName || !email || !username || !password || !password2) {
		// errors.push ({msg: 'Please fill in all fields.'})
	// }
	// if (password !== password2 && password.length>0 && password2.length>0) {
		// errors.push ({msg: 'Passwords do not match.'})
	// }
	// if (password.length<6 && password.length>0) {
		// errors.push ({msg: 'Password must be at least 6 characters.'})
	// }


	if (errors.length > 0) {
		res.send({errors});
		return;
	}

	const newTask = new taskTemplateCopy({
		taskName, userId, penalty, details, dateDue
	});

	newTask.save()
	.then(data => {
		res.json(data);
		// res.redirect('http://localhost:3000/login')
	})
	.catch(err => {
		res.json(err);
	})
	// res.send('send')
})








module.exports = router;