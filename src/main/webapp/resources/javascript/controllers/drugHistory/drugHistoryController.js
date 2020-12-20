app.controller('DrugHistoryController', function($scope, $modal, $rootScope, limitToFilter, $location, DrugHistoryService) {
	
	$scope.currentDrugList = [];
	$scope.oldDrugList = [];
	$scope.masterUpdate = true;
	
	
	$scope.init = function(){
		$scope.bringPatientDrugList();
		$scope.bringOldDrugList();
    };
    
	$scope.bringPatientDrugList = function (){
		var dataString = {'status' : 1, 'query': 1};
		
		DrugHistoryService.getDrugHistory.query({}, dataString).$promise.then(function(result) {
			if (result && result.success) {
				$scope.currentDrugList = result;
			}else{
	
			}
		});
		
	};
	
	$scope.bringOldDrugList = function (){
		
		
		var dataString = {'status' : 0,  'query': 1};
		
		DrugHistoryService.createDrugHistory.query({}, dataString).$promise.then(function(result) {
			if (result && result.success) {
				$scope.oldDrugList = result;
			}else{
	
			}
		});
		
	};
	
	$scope.addDrug = function(status){
		
		$scope.showDrugAdvice = true;
		var data = {};
		
		data.drugName = "";
		data.editMode = true;
		$scope.masterUpdate = false;
		
		if(status == 1){
			angular.forEach($scope.currentDrugList, function(value, key) {
				value.otherEditMode = true;
			});
			
			$scope.currentDrugList.splice(0,0, data);
		}else{
			angular.forEach($scope.oldDrugList, function(value, key) {
				value.otherEditMode = true;
			});
			
			$scope.oldDrugList.splice(0,0, data);
		}
	};

    $scope.saveDrug = function(data, status) {
    	
    	var data = {'drugName': data.drugName, 'status': status, 'query': 2};
        
		DrugHistoryService.saveDrugHistoryList.query({}, data).$promise.then(function(result) {
			if (result && result.success) {
				if(status == 1){
					$scope.bringPatientDrugList();
				}else{
					$scope.bringOldDrugList();
				}
			}else{
	
			}
		});
    };
    
    $scope.delDrug = function(data, status) {
    	
    	var data = {'delId': data.drugHistoryID, 'query': 3};
		
		DrugHistoryService.deleteDrugHistory.query({}, data).$promise.then(function(result) {
			if (result && result.success) {
				if(status == 1){
					$scope.bringPatientDrugList();
				}else{
					$scope.bringOldDrugList();
				}
			}else{
	
			}
		});
    };
    
	$scope.addToPresPast = function(data){
		
		if(data.addedToPres == 0){
			
			var dataStr = {'drugName': data.drugName, 'status': data.currentStatus, 'query': 7};
			
			DrugHistoryService.addContentDetail.query({}, dataStr).$promise.then(function(result) {
				if (result && result.success) {
					data.contentDetailID = result;
	        		data.addedToPres = true;
				}else{
		
				}
			});
	        
	    }else{
			
	    	var dataStr = {'contentDetailID': data.contentDetailID, 'query': 8};
			
			DrugHistoryService.delContentDetail.query({}, dataStr).$promise.then(function(result) {
				if (result && result.success) {
					data.addedToPres = false;
				}else{
		
				}
			});
	    }
	    
		};
    

    $scope.init();
});