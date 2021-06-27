const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');
const axios = require('axios');

var CronJob = require('cron').CronJob;
var CronJobManager = require('cron-job-manager');

// delete the following?
app.use(express.urlencoded({ extended: false}));


dotenv.config();

// useUnifiedTopology and useNewUrlParser to avoid warnings


mongoose.connect(process.env.DATABASE_ACCESS, {
  keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

// mongoose.set('useUnifiedTopology', true);
// mongoose.connect(process.env.DATABASE_ACCESS,{ useNewUrlParser: true })
.then(()=>console.log("Database connected"))
.catch(err=>console.log(err))

app.use(express.json());
app.use(cors());
app.use('/user', userRoutes);
app.use('/task', taskRoutes);

const Task = require('./models/TaskModel')
var CronJobManager = require('cron-job-manager');
var manager = new CronJobManager();

// const startCronJobs = async (req,res) => {
// 	Task.find(
// 			{
// 				shared: true,
// 				completed: false,
// 				active: true,
// 				// penaltyUrl: { $ne : ""},
// 				dateDue: {$gt: new Date()}
// 			 },
// 	  		)
// 		.then(results => {
// 			results.forEach(a => {
// 			let seconds = '*/1 * * * * *';
// 			let date = new Date(a.dateDue);
// 				manager.add('next_job',
// 					seconds,
// 					() => {
// 						console.log(a.penaltyText)
// 					}
// 				);
// 				manager.start('next_job');
// 			})

// 			// res.send("ok")
// 		})
// 		.catch(err => console.log(err))
// }

const startCronJobs = (req,res) => {
	axios.get('http://localhost:4000/task/startCronJobs')
      .then(response=> {
        // console.log(taskName + " at " + this.formatDate(response.data))
        console.log(response.data);
      // this.props.updateTasks();
	  })
      .catch(err => console.log(err))
  }

startCronJobs()




const port = 4000
app.listen(port, ()=> console.log(`Listening on port ${port}`));



 