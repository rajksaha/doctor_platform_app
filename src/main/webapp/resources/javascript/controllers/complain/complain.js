app.controller('PrescribeComplainController', function($scope, $http, $modal, $rootScope, limitToFilter, $location, JsonService, ComplainService) {
	
	$scope.symptom = {};
	$scope.complainList = [];
	$scope.drugNumOfDayList = JsonService.fractionNumberList;
	$scope.drugDayTypeList = JsonService.timesADay;
	
	
	$scope.init = function(){
		$scope.bringDrugsDayType(true, null);
    };
    
	$scope.bringDrugsDayType = function (addMood, selectedDayTypeID){
		
		var dataString = "query=1";
		
		ComplainService.getDrugDayType.query({}, dataString).$promise.then(function (result) {
			if (result && result.success) {
				$scope.drugDayTypeList = result;
				if (addMood) {
					var data = { "title": "Symptom 1", "numOfDay": $scope.drugNumOfDayList[1], "dayType": $scope.drugDayTypeList[0], "note": "" };
					$scope.complainList.push(data);
					data = { "title": "Symptom 2", "numOfDay": $scope.drugNumOfDayList[1], "dayType": $scope.drugDayTypeList[0], "note": "" };
					$scope.complainList.push(data);
					data = { "title": "Symptom 3", "numOfDay": $scope.drugNumOfDayList[1], "dayType": $scope.drugDayTypeList[0], "note": "" };
					$scope.complainList.push(data);
					data = { "title": "Symptom 4", "numOfDay": $scope.drugNumOfDayList[1], "dayType": $scope.drugDayTypeList[0], "note": "" };
					$scope.complainList.push(data);

				} else {
				}
			} else {

			}
		});
		
	};
	
	$scope.saveGroupOfComplain = function(){
		
		var entryFound = false;
		
		angular.forEach($scope.complainList, function(value, key) {
			if(value.name){
				entryFound = true;
				
				var dataString = {'complainName ': value.name , 'numOfDay' : value.numOfDay ,'dayType' :  value.dayType, 'note' : value.note, 'complainPrescribeID' : value.id, 'query' : 2};
				
				ComplainService.updateComplain.query({}, dataString).$promise.then(function (result) {
					if (result && result.success) {
			
					} else {
					}
				});
			}
		});
		
		
		if(!entryFound){
			$scope.message = "Please Select At-least One Symptom";
			$scope.succcess = false;
			$scope.error = true;
		}
		
	};

    $scope.getSymptoms = function(term) {
    	
    	var data = {'data': term, 'query': 1};
        
        return $http({
            method: 'POST',
            url: "rest/autoComplete/complain",
            data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }).then(function(result) {
        	$scope.symptoms = result.data;
        	return limitToFilter($scope.symptoms, 10);
        });
    };
    
      $scope.onSelectSymptoms = function(item, model, label){
    	  alert(item.name);
      };

    $scope.init();
});