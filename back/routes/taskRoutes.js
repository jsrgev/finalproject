const express = require('express');
const router = express();
const taskTemplateCopy = require('../models/TaskModel');
var CronJob = require('cron').CronJob;
var CronJobManager = require('cron-job-manager');
var manager = new CronJobManager();
const axios = require('axios');

const Task = require('../models/TaskModel')

// generated private and public keys from https://www.csfieldguide.org.nz/en/interactives/rsa-key-generator/
const dotenv = require('dotenv');
dotenv.config();


// CRON JOB FUNCTIONS

// let sampleUrl = 'https://maker.ifttt.com/trigger/post/with/key/cGg0CsIdj9AGj_Ius1Ihiw';

const triggerIfttt = (url) => {
	axios.get(url)
	.then(response=> console.log(response.data))
	.catch(err => console.log(err))
}

const startCronJobs = async () => {
	console.log("running 'startCronJobs'");
	Task.find({
		shared: true,
		completed: false,
		active: true,
		penaltyUrl: { $ne : ""},
		dateDue: {$gt: new Date()}
	})
	.then(results => {
		// console.log(results);
		let pending = results.length;
		if (pending===0) {
			console.log("There are no pending penalties");
		}
		results.forEach(a => {
		let jobName = a._id.toString()
		let seconds = '*/1 * * * * *';
		let date = new Date(a.dateDue);
			manager.add(jobName,
				date,
				() => {
					// action to be carried out
					triggerIfttt(a.penaltyUrl);
					console.log(`${a.penaltyUrl} is now being triggered.`);
				},
				{
				  onComplete: () => {console.log("the job has stopped....")}
				}
			);
			manager.start(jobName);
		})
		console.log (`There are ${pending} cron jobs pending:\n${manager.listCrons()}`);
	})
	.catch(err => {
		console.log(err)
	})
};

const stopCron = (taskId) => {
	manager.stop(taskId);
	// manager.stop(req.body.taskId);
	console.log("Cron job has been stopped.");
}




// ROUTES

router.post('/addTask', async (req,res) => {
	const newTask = new taskTemplateCopy({...req.body});
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
	Task.find({userId: req.body.id, active: true}).sort({dateDue:1})
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
	Task.find({shared: true, active: true}).sort({dateEntered:-1})
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


router.post('/updateUserTaskShared', async (req,res) => {
	let {taskId, field, dateShared} = req.body;
	Task.updateOne(
			{ _id: taskId },
	  			{ [field]: true,
	  				dateShared }
	  		)
	.then(results => {
		// startCronJobs();
		res.send(results)
	})
	.catch(err => console.log(err))
	}
)


// changing a task to completed or back to uncompleted
router.post('/updateUserTaskCompleted', async (req,res) => {
	let {taskId, value, penalty} = req.body;
	// if completing task with pending penalty, stop cronjob immediately
	if (value && penalty) {
		stopCron(taskId);
	}
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



router.get('/startCronJobs', async (req,res) => {
	let result = await startCronJobs();
	res.send("Cron jobs started from server.");
})



module.exports = router;

