const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routers = require('./routes');
const mongoose = require('mongoose');

//mongodb connection
//mongoose.connect('mongodb://localhost:27017/api_todo');
mongoose.connect('mongodb://admin:admin1234@ds025180.mlab.com:25180/api_todo');
mongoose.Promise = global.Promise;

//initialize body-parser
app.use(bodyParser.json());
//initialize routers
app.use('/api',routers);
//error middleware
app.use((err,req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.status(422).send({
    err: err.message
  });
});
//run server
app.listen(process.env.PORT || 5000,()=>{
  console.log('active');
});
