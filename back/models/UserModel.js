const mongoose = require('mongoose');

const userTemplate = new mongoose.Schema({
	firstName: {
		type:String,
		required:true
	},
	lastName: {
		type:String,
		required:true
	},
	username: {
		type:String,
		required:true
	},
	email: {
		type:String,
		required:true
	},
	password: {
		type:String,
		required:true
	},
	date: {
		type:Date,
		default:Date.now
	},
	active: {
		type:Boolean,
		default:true
	}
})

const User = mongoose.model('users',userTemplate);

module.exports = User;
  






