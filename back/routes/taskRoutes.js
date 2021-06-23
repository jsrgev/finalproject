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

	// Check form for errors
	// let errors = [];
	// if (errors.length > 0) {
	// 	res.send({errors});
	// 	return;
	// }

	const newTask = new taskTemplateCopy({
		taskName, userId, penalty, details, dateDue
	});

	newTask.save()
	.then(data => {
		res.json(data);
	})
	.catch(err => {
		res.json(err);
	})
})

router.post('/getTasks', async (req,res) => {
	// console.log(req.body);
	Task.find({userId: req.body.userId})
		.then(tasks => {
			if(!tasks) {
				res.send({result: false, message: "This user has no tasks."});
				// return;
				// return done(null, false, { message: 'That email is not registered' });
			} else {
				res.send({result: true, tasks});
			}
			})		
		.catch(err => console.log(err));
})






module.exports = router;