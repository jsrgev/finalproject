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
	details: {
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
	// likes: {
	// 	type:array,
	// 	required:false
	// },
	// followers: {
	// 	type:array,
	// 	required:false
	// },
	// comments: {
	// 	type:array,
	// 	required:false
	// },
	dateDue: {
		type:Date,
		required:false
	},
	dateEntered: {
		type:Date,
		default:Date.now
	}
})

const Task = mongoose.model('tasks',taskTemplate);

module.exports = Task;
  






