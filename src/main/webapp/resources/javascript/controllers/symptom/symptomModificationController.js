app.controller('SymptomModificationController', function($scope, $http, $modal, $rootScope, limitToFilter, $location, SymptomModificationService) {
	
	$scope.symptomList = [];	
    
	$scope.getSymptoms = function(){  	
    	var dataString = "query=0";
        
        SymptomModificationService.getSymptomsList.query({}, dataString).$promise.then(function(result) {
            if (result && result.success) {
                $scope.symptomList = result;
            }else{
    
            }
        });
    };
	
	
	$scope.deleteSymptoms = function(symptom_id, index){  
    	var dataString = "query=1&symptom_id="+symptom_id;
        
        SymptomModificationService.delSymptoms.query({}, dataString).$promise.then(function(result) {
            if (result && result.success) {
                $scope.getSymptoms();
            }else{
    
            }
        });
    };
	  
    $scope.editSypmtom = function(symptomData){
    	
    	angular.forEach($scope.symptomList, function(value, key) {
			value.otherEditMode = true;
		});
		
    	symptomData.oterEditMode = false;
    	symptomData.editMode = true;
    };
	

    $scope.saveSymptom = function(symptomData){
    	
    	if(validator.validateForm("#validateReq","#lblMsg",null)) {
    		
    		var  dataString = "query=2" + '&symptom_id=' + symptomData.symptomID + "&symptomName=" +symptomData.name;
            
            SymptomModificationService.updateSymptoms.query({}, dataString).$promise.then(function(result) {
                if (result && result.success) {
                    $scope.getSymptoms();
                }else{
        
                }
            });
            
    	}else{
    		$scope.error = true;
    		$scope.message = "";
    		$scope.succcess = false;
    	}
    	
    };


	$scope.inIt = function (){
		$scope.getSymptoms();
		
	};
	
	(function(){
		$scope.inIt();
    })()

	
});