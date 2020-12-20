app.controller('DiseaseModificationController', function($scope, $modal, $rootScope, limitToFilter, $location, DiseaseModificationService) {
	
	$scope.diseaseList = [];	
    
	$scope.getdiseases = function(){  	
    	var dataString = "query=0";

        DiseaseModificationService.getDiseasesList.query({}, dataString).$promise.then(function(result) {
            if (result && result.success) {
                $scope.diseaseList = result;
            }else{
    
            }
        });
    };
	
	
	$scope.deletediseases = function(disease_id, index){  
    	var dataString = "query=1&disease_id="+disease_id;

        DiseaseModificationService.delDisease.query({}, dataString).$promise.then(function(result) {
            if (result && result.success) {
                $scope.getdiseases();
            }else{
    
            }
        });
    };
	  
    $scope.editSypmtom = function(diseaseData){
    	
    	angular.forEach($scope.diseaseList, function(value, key) {
			value.otherEditMode = true;
		});
		
    	diseaseData.oterEditMode = false;
    	diseaseData.editMode = true;
    };
	

    $scope.savedisease = function(diseaseData){
    	
    	if(validator.validateForm("#validateReq","#lblMsg",null)) {
    		
    		var  dataString = "query=2" + '&disease_id=' + diseaseData.id + "&diseaseName=" +diseaseData.name;

            DiseaseModificationService.updateDisease.query({}, dataString).$promise.then(function (result) {
                if (result && result.success) {
                    $scope.getdiseases();
                } else {
                }
            });
            
    	}else{
    		$scope.error = true;
    		$scope.message = "";
    		$scope.succcess = false;
    	}
    	
    };


	$scope.inIt = function (){
		$scope.getdiseases();
		
	};
	
	(function(){
		$scope.inIt();
    })()

	
});