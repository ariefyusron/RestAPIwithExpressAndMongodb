const express = require('express');
const router = express.Router();
const Todo = require('./models/todo');

router.get('/todo', (req, res)=>{
  Todo.find()
    .sort({_id: -1})  
    .then((result) => {
      res.send(result);
    });
});

router.get('/todo/:id', (req, res) => {
  Todo.findOne({_id: req.params.id})
    .then((result) => {
      res.send(result);
    });
});

router.post('/todo', (req, res, next)=>{
  //save to mongodb
  Todo.create(req.body)
    .then(result => {
      res.send(result);
    }).catch(next);
});

router.put('/todo/:id', (req, res)=>{
  //put from mongodb
  Todo.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(() => {
      Todo.findOne({_id: req.params.id})
        .then((result) => {
          res.send(result);
        });
    });
});

router.delete('/todo/:id', (req, res)=>{
  //delete from mongodb
  Todo.findOneAndRemove({_id: req.params.id})
    .then((result) => {
      res.send(result);
    });
});

module.exports = router;