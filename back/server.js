const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/routes');
const cors = require('cors');

// from traversey

//Passport config
// const passport = require('passport');

// require('./passport.js')(passport);

// const expressLayouts = require('express-ejs-layouts');
// app.use(expressLayouts);
// app.set('view engine', 'ejs');
// body parser
app.use(express.urlencoded({ extended: false}));

// Passport middleware
// passport.use(passport.initialize());
// passport.use(passport.session());


// traversey up to here

dotenv.config();

mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DATABASE_ACCESS,{ useNewUrlParser: true })
.then(()=>console.log("Database connected"))
.catch(err=>console.log(err))

app.use(express.json());
app.use(cors());
app.use('/app', routesUrls);





const port = 4000
app.listen(port, ()=> console.log(`Listening on port ${port}`));



 