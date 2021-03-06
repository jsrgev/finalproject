const path = require('path');
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

// process.env.port in case 4000 not available
const port = process.env.PORT || 4000;


if (process.env.NODE_ENV === 'production') {

}

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));



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

const startCronJobs = (req,res) => {
  // console.log("startCronJobs");
	axios.get(`http://localhost:${port}/task/startCronJobs`)
      .then(response=> {
        console.log(response.data);
	  })
      .catch(err => console.log(err))
  }

startCronJobs();

// Below code to allow pages other than index.html to load when entered in address bar. Due to react router there are no other actual pages to load, so it's necessary to redirect to index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})



app.listen(port, ()=> console.log(`Listening on port ${port}`));



 