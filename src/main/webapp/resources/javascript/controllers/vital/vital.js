app.controller('PrescribeVitalController', function($scope, $http, $modal, $rootScope, limitToFilter, $location, VitalService) {
	
	
	$scope.vitalData = {};
	$scope.vitalNameData = {};
	$scope.prescribedVitalData = [];
	$scope.addByName = false;
	
	
    $scope.getVital = function(term) {
        
    	var dataString = 'query=5'+ '&name=' + term;
        
        return $http({
            method: 'POST',
            url: "rest/autoComplete/vital",
            data: dataString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(result) {
        	$scope.vitalNameData = result.data;
        	return limitToFilter($scope.vitalNameData, 10);
        });

        
       // return $scope.products;
      };
      
	  $scope.onSelectVital = function(item, model, label){
		  $scope.vitalNameData.vitalId = item.vitalId;
		  $scope.vitalData.shortName = item.shortName;
		  $scope.vitalData.unit = item.unit;
		  $scope.addByName = true;
	  };
	  
	  
		$scope.addVitalToDoctorPref = function (){
			
			if(validator.validateForm("#vitalSetting","#lblMsg",null)) {
				
				$scope.error = false;
				$scope.succcess = false;
				if($scope.addByName == false){
					
					var dataString = 'query=6'+ '&vitalName=' + $scope.vitalData.vitalName + '&shortName=' + $scope.vitalData.shortName + '&unit=' + $scope.vitalData.unit;

					VitalService.updateVital.query({}, dataString).$promise.then(function(result) {
						if (result && result.success) {
							$scope.vitalSameAS = false;
			        		$scope.addToDoctorPreference(result);
						}else{
				
						}
					});
					
				}else{
					$scope.vitalSameAS = false;
					$scope.addToDoctorPreference($scope.vitalNameData.vitalId);
				}
				
				
				
			}else{
				$scope.error = true;
				$scope.succcess = false;
			}
		};
		
		$scope.addToDoctorPreference = function (vitalID){
			
			$scope.vitalData = {};
			$scope.vitalNameData = {};
			 $scope.addByName = false;
			var vitID = parseInt(vitalID);
			var displayOrder = 1;
			if($scope.prescribedVitalData != undefined && $scope.prescribedVitalData.length > 0){
				displayOrder = parseInt($scope.prescribedVitalData[$scope.prescribedVitalData.length -1].displayOrder) + 1;
			}
			
			var dataString = 'query=7'+ '&vitalID=' + vitID + '&displayOrder=' + displayOrder;

			VitalService.createDoctorVital.query({}, dataString).$promise.then(function(result) {
				if (result && result.success) {
					$scope.bringDoctorPrefVital();
				}else{
		
				}
			});
			
		};
		
		$scope.deleteVitalFromSetting = function (vitalSettingID){
			
			var dataString = 'query=8'+ '&vitalSettingID=' + vitalSettingID;

			VitalService.createDoctorVitalOrder.query({}, dataString).$promise.then(function(result) {
				if (result && result.success) {
					$scope.bringDoctorPrefVital();
				}else{
		
				}
			});
		};
	
	$scope.bringDoctorPrefVital = function (){
		
		var dataString = "query=0";

		VitalService.getVital.query({}, dataString).$promise.then(function(result) {
			if (result && result.success) {
				$scope.prescribedVitalData = result;
			}else{
	
			}
		});
	};
	
	$scope.bringVitalOption = function(vitalData){
		
		angular.forEach($scope.prescribedVitalData, function(value, key) {
			value.optionListON = false;
			value.optionAdderON = false;
		});
		
		var dataString = 'query=1'+ '&vitalID=' + vitalData.vitalId;

		VitalService.getVitalOption.query({}, dataString).$promise.then(function (result) {
			if (result && result.success) {
				vitalData.optionList = result;
				var data = { "id": -1, "vitalOptionID": -1, "name": 'Add Options' };
				var data1 = { "id": -2, "vitalOptionID": -2, "name": 'Close' };
				vitalData.optionList.unshift(data1, data);
				vitalData.optionSelector = vitalData.optionList[0];
				vitalData.optionListON = true;
				vitalData.optionAdderON = false;
			} else {

			}
		});
	};
	
	$scope.performVital = function(vital){
		if(vital.optionSelector.vitalOptionID == -1){
			vital.optionListON = false;
			vital.optionAdderON = true;
		}else if(vital.optionSelector.vitalOptionID == -2){
			vital.optionListON = false;
		}else{
			vital.vitalResult = vital.optionSelector.name;
			vital.optionListON = false;
		}
	};
	
	$scope.addVitalOption = function (vitalData){
		if(vitalData.optionAdder){
			var dataString = 'query=2'+ '&vitalID=' + vitalData.vitalId + '&vitalOptionName=' + vitalData.optionAdder ;
	        
			VitalService.createVitalOption.query({}, dataString).$promise.then(function (result) {
				if (result && result.success) {
					vitalData.optionAdder = "";
	        		$scope.bringVitalOption(vitalData);
				} else {
	
				}
			});
			
		}else{
			//maybe a pop- up saying please enter a value
			return false;
		}
	};
	
	$scope.saveVital = function(prescribedVital){
		
		angular.forEach(prescribedVital, function(value, key) {
			if(parseInt(value.prescribedVitalID) > 0 && value.vitalResult){ // update
				var dataString = 'query=4'+ '&vitalID=' + value.vitalId + '&vitalResult=' + value.vitalResult ;
		        
				VitalService.updateVitalPrescription.query({}, dataString).$promise.then(function (result) {
					if (result && result.success) {
						
					} else {
		
					}
				});
			}else if(!(parseInt(value.prescribedVitalID) > 0) &&  value.vitalResult){// inssert
				var dataString = 'query=3'+ '&vitalID=' + value.vitalId + '&vitalResult=' + value.vitalResult ;
		        
				VitalService.createVitalPrescription.query({}, dataString).$promise.then(function (result) {
					if (result && result.success) {
						
					} else {
		
					}
				});
			}else if(parseInt(value.prescribedVitalID) > 0 && value.vitalResult == ""){
				
				var dataString = 'query=9'+ '&prescribedVitalID=' + value.prescribedVitalID;
		        
				VitalService.deleteVitalPrescription.query({}, dataString).$promise.then(function (result) {
					if (result && result.success) {
						
					} else {
		
					}
				});
			}
		});
		
		$location.path("/prescription");
	};
	
	
	(function(){
		$scope.bringDoctorPrefVital();
    })()

	
});