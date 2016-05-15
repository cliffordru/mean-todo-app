import _ from 'lodash';
import angular from 'angular';

const todoFactory = angular.module('app.todoFactory', [])

.factory('todoFactory', ($http) => {
	
	function getTasks($scope){
		$http.get('/todos').success(response => {
			$scope.todos = response.todos;
		});
	}

	// want params to be an object so it is passed by ref
	function createTask($scope, params) {
		if(!$scope.createTaskInput) {return;}
		
		$http.post('/todos', {
			task: $scope.createTaskInput,
			isCompleted: false,
			isEditing: false
		}).success(response => {
			getTasks($scope);
			$scope.createTaskInput = '';			
		})

		//params.createHasInput = false;
		//$scope.createTaskInput = '';

		// This would be alternative if did not have $watch logic below
		//$scope.todos.push($scope.createTaskInput);
	}

	function updateTask($scope, todo){
		// Non ES6 way
		//$http.put('/todos' + todo._id)

		// ES6 string interpolation
		$http.put(`/todos/${todo._id}`, {task: todo.updatedTask})
		.success(response => {
			getTasks($scope);
			todo.isEditing = false;
		});

		//todo.task = todo.updatedTask;
		//todo.isEditing = false;
	}

	function deleteTask($scope, todoToDelete){
		$http.delete(`/todos/${todoToDelete._id}`)
		.success(response => {
			getTasks($scope);
		});

		// Using lodash t below is local var iterator
		//_.remove($scope.todos, t => t.task === todoToDelete.task);
	}

	function watchCreateTaskInput(params, $scope,
		val){
		// Not crazy about this const as below cannot use for assignments since passed by ref
		// Would be better to just remove and always use params.createHasInput
		const createHasInput = params.createHasInput;

		if(!val && createHasInput){
			$scope.todos.pop();
			params.createHasInput = false;
		} else if (val && !createHasInput){
			$scope.todos.push({task: val, isCompleted: false});
			params.createHasInput = true;
		} else if (val && createHasInput){
			$scope.todos[$scope.todos.length - 1].task = val;
		}
	}

	return {
		// Since using ES6 do not need long hand createTask: createTask
		getTasks,
		createTask,
		updateTask,
		deleteTask, 
		watchCreateTaskInput
	};
});

export default todoFactory;