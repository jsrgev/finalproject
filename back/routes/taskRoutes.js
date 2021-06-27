const express = require('express');
const router = express();
const taskTemplateCopy = require('../models/TaskModel');
var CronJob = require('cron').CronJob;
var CronJobManager = require('cron-job-manager');
var manager = new CronJobManager();

const Task = require('../models/TaskModel')

// generated private and public keys from https://www.csfieldguide.org.nz/en/interactives/rsa-key-generator/
const dotenv = require('dotenv');
dotenv.config();


router.post('/addTask', async (req,res) => {
	// console.log(req.body)
	// const {taskName, userId, penaltyText, penaltyUrl,  description, dateDue, shared} = req.body;

	// const newTask = new taskTemplateCopy({
		// taskName, userId, penaltyText, penaltyUrl, description, dateDue, shared
	// });

	const newTask = new taskTemplateCopy({...req.body});

	// console.log(newTask)

	newTask.save()
	.then(data => {
		startCronJobs();
		res.json(data);
	})
	.catch(err => {
		res.json(err);
	})
})

router.post('/getUserTasks', async (req,res) => {
	Task.find({userId: req.body.id}).sort({dateDue:1})
		.then(tasks => {
			if(!tasks) {
				res.send({result: false, message: "This user has no tasks."});
			} else {
				res.send({result: true, tasks});
			}
		})
		.catch(err => console.log(err));
})

router.get('/getAllPublicTasks', async (req,res) => {
	Task.find({shared: true}).sort({dateEntered:-1})
		.then(tasks => {
			if(!tasks) {
				res.send({result: false, message: "There are no shared tasks right now."});
			} else {
				res.send({result: true, tasks});
			}
		})	
		.catch(err => console.log(err));
})

//adding likes or following public tasks/posts
router.post('/updatePublicTask', async (req,res) => {
	let {taskId, field, userId, add} = req.body;
	if (add) {
		Task.updateOne(
				{ _id: taskId },
		  		{ $push: 
		  			{ [field]: userId }
		  		})
		.then(results => res.send(results))
			.catch(err => console.log(err))
	} else {
		Task.updateOne(
				{ _id: taskId },
		  		{ $pull: 
		  			{ [field]: userId }
		  		})
		.then(results => res.send(results))
			.catch(err => console.log(err))
	}
})


// changing a task to completed or back to uncompleted
router.post('/updateUserTaskCompleted', async (req,res) => {
	let {taskId, field, value} = req.body;
	let date = value ? new Date() : ""
	Task.updateOne(
			{ _id: taskId },
	  			{ 
	  				"completed": value,
	  				"dateCompleted": date 
		  		}
	  		)
	.then(results => {
		startCronJobs();
		res.send(results)
	})
	.catch(err => console.log(err))
	}
)

router.post('/updateUserTask', async (req,res) => {
	let {taskId, field, value} = req.body;
	Task.updateOne(
			{ _id: taskId },
	  			{ [field]: value }
	  		)
	.then(results => {
		startCronJobs();
		res.send(results)
	})
	.catch(err => console.log(err))
	}
)


router.post('/addComment', async (req,res) => {
	let {taskId, field, userId, add, text} = req.body;
	let comment = {userId, text, date: new Date()}
	if (add) {
		Task.updateOne(
				{ _id: taskId },
		  		{ $push: 
		  			{ [field]: comment }
		  		})
		.then(results => res.send(results))
			.catch(err => console.log(err))
	} else {
		Task.updateOne(
				{ _id: taskId },
		  		{ $pull: 
		  			{ [field]: userId }
		  		})
		.then(results => res.send(results))
			.catch(err => console.log(err))
	}
})

const startCronJobs = async () => {
	Task.find({
		shared: true,
		completed: false,
		active: true,
		penaltyUrl: { $ne : ""},
		dateDue: {$gt: new Date()}
	})
	.then(results => {
		let pending = results.length;
		if (pending===0) {
			console.log("There are no pending penalties");
			return;
		}
		results.forEach(a => {
		let jobName = a._id.toString()
		let seconds = '*/1 * * * * *';
		let date = new Date(a.dateDue);
			manager.add(jobName,
				date,
				() => {
					// action to be carried out
					console.log(a.penaltyText + " . . ." + a.penaltyUrl)
				},
				{
				  onComplete: () => {console.log("the job has stopped....")}
				}
			);
			manager.start(jobName);
		})
		console.log(`There are ${pending} cron jobs pending:\n${manager.listCrons()}`);
	})
	.catch(err => console.log(err))
};


router.get('/startCronJobs', async (req,res) => {
	Task.find({
		shared: true,
		completed: false,
		active: true,
		penaltyUrl: { $ne : ""},
		dateDue: {$gt: new Date()}
	})
	.then(results => {
		let pending = results.length;
		if (pending===0) {
			res.send("There are no pending penalties");
			return;
		}
		results.forEach(a => {
		// console.log(a._id)
		let jobName = a._id.toString()
		// console.log(jobName)
		let seconds = '*/1 * * * * *';
		let date = new Date(a.dateDue);
			manager.add(jobName,
				date,
				() => {
					// action to be carried out
					console.log(a.penaltyText + " . . ." + a.penaltyUrl)
				},
				{
				  onComplete: () => {console.log("the job has stopped....")}
				}
			);
			manager.start(jobName);
		})
		// res.send("Cron jobs have been started.")
		res.send(`There are ${pending} cron jobs pending:\n${manager.listCrons()}`);
		// console.log(manager.listCrons());
	})
	.catch(err => console.log(err))
})


router.post('/stopCron', async (req,res) => {
	manager.stop('next_job');
	// manager.stop(req.body.taskId);
	res.send("Cron job has been stopped.");
})





module.exports = router;

