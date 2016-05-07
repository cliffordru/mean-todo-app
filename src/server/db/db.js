// Not using ES6 on backend code
var mongoose = require('mongoose');

// Will automatically create todos db
mongoose.connect('mongodb://localhost/todos');

// Create schema for todos
var Todo = mongoose.model('Todo', {
	task: String,
	isCompleted: Boolean,
	isEditing: Boolean
});

// Could create another schema
//var anotherSchema =

module.exports.Todo = Todo;
//module.exports.anotherSchema