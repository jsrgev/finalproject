const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');

// delete the following?
app.use(express.urlencoded({ extended: false}));


dotenv.config();

// useUnifiedTopology and useNewUrlParser to avoid warnings
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DATABASE_ACCESS,{ useNewUrlParser: true })
.then(()=>console.log("Database connected"))
.catch(err=>console.log(err))

app.use(express.json());
app.use(cors());
app.use('/user', userRoutes);
app.use('/task', taskRoutes);





const port = 4000
app.listen(port, ()=> console.log(`Listening on port ${port}`));



 