import angular from 'angular';

const todoFactory = angular.module('app.todoFactory', [])

.factory('todoFactory', () => {
	function createTask() {
		return true;
	}

	return {
		// Since using ES6 do not need long hand createTask: createTask
		createTask
	};
});

export default todoFactory;