
 const express = require('express');
 const mongoose = require('mongoose');
 const cors =require("cors");
 const userRoutes =require("./routes/user")
 const app = express();

 const routes = require('./routes/ToDoRoute'); 
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
 require('dotenv').config();
 
 const PORT = process.env.port || 5002
 mongoose.set("strictQuery", false);
 app.use(bodyParser.json());
 app.use(cookieParser());
 app.use(express.json());
 app.use(cors());
 //import routes

 //using routes
 app.use('/api',userRoutes);
 mongoose
 .connect(process.env.MONGODB_URL)
 .then(()=> console.log(`connected to mongodb`))
 .catch((err)=> console.log(err))
 useNewUrlParser = true,
 useUnifiedTopology= true,
 useCreateIndex = true,
 app.use(routes)
 app.listen(PORT, ()=> console.log(`listening on: ${PORT}`))