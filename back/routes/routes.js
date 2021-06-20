const express = require('express');
const router = express();
const signUpTemplateCopy = require('../models/RegisterModels');
const bcrypt = require('bcrypt');

router.post('/register', async (req,res) => {

	const saltPassword = await bcrypt.genSalt(10);
	const securePassword = await await bcrypt.hash(req.body.password, saltPassword);

	const signedUpUser = new signUpTemplateCopy({
		firstName:req.body.firstName,
		lastName:req.body.lastName,
		username:req.body.username,
		email:req.body.email,
		password:securePassword
	});
	signedUpUser.save()
	.then(data => {
		res.json(data);
	})
	.catch(err => {
		res.json(err);
	})
	// res.send('send')
})

module.exports = router;