export default function($scope){
	// create object
	let params = {
		createHasInput: false
	};

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
	}

	$scope.onEditClick = todo => {
		todo.isEditing = true;
	}

	$scope.createTask = () => {
		params.createHasInput = false;
		$scope.createTaskInput = '';

		// This would be alternative if did not have $watch logic below
		//$scope.todos.push($scope.createTaskInput);
	}

	/* ES6 syntax, older is 
		$scope.$watch('createTaskInput', function(val){...}) */

	$scope.$watch('createTaskInput', val => {
		if(!val && params.createHasInput){
			$scope.todos.pop();
			params.createHasInput = false;
		} else if (val && !params.createHasInput){
			$scope.todos.push({task: val, isCompleted: false});
			params.createHasInput = true;
		} else if (val && params.createHasInput){
			$scope.todos[$scope.todos.length - 1].task = val;
		}
	});

}