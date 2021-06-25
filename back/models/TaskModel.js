const mongoose = require('mongoose');

const taskTemplate = new mongoose.Schema({
	taskName: {
		type:String,
		required:true
	},
	userId: {
		type:String,
		required:true
	},
	penalty: {
		type:String,
		required:false
	},
	description: {
		type:String,
		required:false
	},
	shared: {
		type:Boolean,
		default:false
	},
	completed: {
		type:Boolean,
		default:false
	},
	likes: {
		type:Array,
		required:false
	},
	followers: {
		type:Array,
		required:false
	},
	comments: {
		type:Array,
		required:false
	},
	dateDue: {
		type:Date,
		required:false
	},
	dateEntered: {
		type:Date,
		default:Date.now
	},
	active: {
		type: Boolean,
		default: true
	}
})

const Task = mongoose.model('tasks',taskTemplate);

module.exports = Task;
  






