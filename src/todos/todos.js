import _ from 'lodash';

export default function($scope, todoFactory){
	// create object
	let params = {
		createHasInput: false
	};
console.log(todoFactory.createTask);
	$scope.todos = [
	{
		task: 'do dishes',
		isCompleted: false,
		isEditing: false
	},
	{
		task: 'walk the dog',
		isCompleted: true,
		isEditing: false
	}
	];

	// ES6 syntax
	$scope.onCompletedClick = todo => {
		todo.isCompleted = !todo.isCompleted;
	};

	$scope.onEditClick = todo => {
		todo.isEditing = true;
		todo.updatedTask = todo.task;
	};

	$scope.onCancelClick = todo => {
		todo.isEditing = false;
	};

	// using lodash
	$scope.createTask = _.partial(todoFactory.
		createTask, $scope, params);
		
		//.bind(this, $scope, params)
	
	// no need to pass todo as param due to binding
	$scope.updateTask = _.partial(todoFactory.
		updateTask);

	$scope.deleteTask = _.partial(todoFactory.
		deleteTask, $scope);

	$scope.$watch('createTaskInput', _.partial(todoFactory.
		watchCreateTaskInput, params, $scope));

}