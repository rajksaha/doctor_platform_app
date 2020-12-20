app.controller('PrescribeDiagnosisController', function($scope, $modal, $rootScope, limitToFilter, $location, $filter, DiagnosisService) {
	
	
	$scope.diagnosisData = {};
	$scope.diagnosisName = "";
	
	$scope.diagnosisNote = "";
	
	$scope.saveDiagnosis = function(){
		
		var dataString = "";
		if($scope.diagnosisData.id){
			
			dataString = "query=" + 3 + '&diagnosisName=' + $('.diagnosisAdderName').val() + '&note=' + $scope.diagnosisNote + '&id=' + $scope.diagnosisData.id;

		}else{
			dataString = "query=" + 2 + '&diagnosisName=' + $('.diagnosisAdderName').val() + '&note=' + $scope.diagnosisNote;
		}
		
		DiagnosisService.createorupdateDiagnosis.query({}, dataString).$promise.then(function (result) {
			if (result && result.success) {
				$location.path("/prescription");
			} else {
			}
		});
	};
	
	$scope.bringDiagnosisData = function(){
		
		var dataString = "query=1";
		
		DiagnosisService.getDiagnosisData.query({}, dataString).$promise.then(function (result) {
			if (result && result.success) {
				$scope.diagnosisData = result;
				if ($scope.diagnosisData.id) {
					$scope.diagnosisName = $scope.diagnosisData.diseaseName;
					$scope.diagnosisNote = $scope.diagnosisData.note;
				}
			} else {

			}
		});
	};
	
	
	(function(){
		
		
		$scope.bringDiagnosisData();
    })()

	
});

function lookup(inputString) {
	if(inputString.length == 0) {
		$('.suggetionBox').fadeOut(); // Hide the suggestions box
	} else {
            $.post("phpServices/diagnosis/diagnosis.php", {queryString: ""+inputString+"", query : 0}, function(data) { // Do an AJAX call
			$('.suggetionBox').fadeIn(); // Show the suggestions box
			$('.suggetionBox').html(data); // Fill the suggestions box
		});
	}
}

function autocomplete(dataString) {
	$('.diagnosisAdderName').val(dataString);
	$('.suggetionBox').fadeOut();
	$('.suggetionBox').hide();
}