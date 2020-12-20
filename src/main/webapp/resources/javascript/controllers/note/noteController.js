app.controller('PrescribeNoteController', function($scope, $modal, $rootScope, limitToFilter, $location, $filter, DiagnosisService) {
	
	$scope.presNoteList = [];

	$scope.init = function () {
		var presNoteData = {};
		presNoteData.header = "Empty Header";
		presNoteData.noteList = [];
        presNoteData.noteList.push();
    };
	
	
	(function(){
		$scope.init();
    })()

	
});