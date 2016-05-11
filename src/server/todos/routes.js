var mongoose = require('mongoose');
var Todo = require('server/db/db').Todo;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	Todo.find(function(err, results){
		if(err){console.log(err);}

		res.send({ todos: results });
	})
});

// Post or save todo to db
router.post('/', function(req, res){
	// req.body data being sent, requires body parser
	var todo = new Todo(req.body);
	todo.save(function(err){
		if(err){ console.log(err); }

		console.log('SAVED!!!');
		res.send('SUCCESS!');
	})
});

module.exports = router;