import _ from 'lodash';
import angular from 'angular';

const todoFactory = angular.module('app.todoFactory', [])

.factory('todoFactory', ($http) => {
	// want params to be an object so it is passed by ref
	function createTask($scope, params) {
		$http.post('/todos', {
			task: $scope.createTaskInput,
			isCompleted: false,
			isEditing: false
		}).success(response => {
			$scope.createTaskInput = '';
			console.log(response);
		})

		//params.createHasInput = false;
		//$scope.createTaskInput = '';

		// This would be alternative if did not have $watch logic below
		//$scope.todos.push($scope.createTaskInput);
	}

	function updateTask(todo){
		todo.task = todo.updatedTask;
		todo.isEditing = false;
	}

	function deleteTask($scope, todoToDelete){
		// Using lodash t below is local var iterator
		_.remove($scope.todos, t => t.task === todoToDelete.task);
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
		createTask,
		updateTask,
		deleteTask, 
		watchCreateTaskInput
	};
});

export default todoFactory;