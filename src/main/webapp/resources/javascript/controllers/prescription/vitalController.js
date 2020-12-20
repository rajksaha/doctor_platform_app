app.controller('PrescribeVitalController', function($scope, $http, $modal, $rootScope, limitToFilter, $modalInstance,
													appointmentData, DoctorService, PresSaveService) {


    $scope.doctorVitalList = [];
	$scope.activeTab = "presVital";
	$scope.vitalData = {};
	$scope.vitalNameData = {};
	$scope.prescribedVitalData = [];


	$scope.addByName = false;

    $scope.setActiveTab = function (tab) {
        switch (tab){
            case 'presVital':
                $scope.bringDoctorPrefVital();
                break;
            case 'setupVital':
                $scope.vitalData = {};
                $scope.vitalData.sameAsName=true;
                break;
            default:
                $scope.activeTab = tab;
        }
        $scope.activeTab = tab;

    };
	
	
    $scope.getVital = function(term) {
    	var dataString = {};
    	dataString.term = term;
        return $http({
            method: 'POST',
            url: "/api/rest/autoComplete/vital",
            data: dataString
        }).then(function(result) {
        	$scope.vitalNameData = result.data;
        	return limitToFilter($scope.vitalNameData, 10);
        });
      };
      
	$scope.onSelectVital = function(item, model, label){
	  $scope.vitalData.shortName = item.shortName;
	  if(item.shortName == ""){
          $scope.vitalData.shortName = item.vitalName;
	  }
	  $scope.vitalData.unit = item.unit;
	};

	$scope.populateShortName = function(name){
		if($scope.vitalData.sameAsName){
            $scope.vitalData.shortName = name;
		}
	};
	  
	  
	$scope.addVitalToDoctorPref = function (addAnother){
		if(validator.validateForm("#vitalSetting","#lblMsg",null)) {
			delete  $scope.vitalData.sameAsName;
            $scope.vitalData.doctorID = appointmentData.doctorID;
            var displayOrder = 1;
            if($scope.doctorVitalList != undefined && $scope.doctorVitalList.length > 0){
                displayOrder = parseInt($scope.doctorVitalList[$scope.doctorVitalList.length -1].displayOrder) + 1;
            }
            $scope.vitalData.displayOrder = displayOrder;
			DoctorService.createPrefVital.query({}, $scope.vitalData).$promise.then(function(result) {
				if(addAnother){
                    $scope.vitalData = {};
                    $scope.vitalData.sameAsName=true;
				}else{
                    $scope.setActiveTab("presVital");
				}
			});
		}else{
			$scope.error = true;
			$scope.succcess = false;
		}
	};

	$scope.deleteVitalFromSetting = function (vitalSettingID){
		DoctorService.deletePrefVital.remove({}, {vitalSettingID:vitalSettingID}).$promise.then(function(result) {
            $scope.bringDoctorPrefVital();
		});
	};
	
	$scope.bringDoctorPrefVital = function (){
		DoctorService.getDoctorPrefVital.query({}, {doctorID: appointmentData.doctorID, appointmentID: appointmentData.appointmentID}).$promise.then(function(result) {
            $scope.doctorVitalList = result;
		});
	};

    $scope.getVitalOption = function(vital, term) {
		var searchData = {};
		searchData.term = term;
		searchData.entityID = vital.vitalID;
        return $http({
            method: 'POST',
            url: "/api/rest/autoComplete/vitalOption",
            data: searchData
        }).then(function(result) {
            $scope.vitalOption = result.data;
            return limitToFilter($scope.vitalOption, 10);
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
	
	$scope.saveVital = function(){
		var prescribedVital = {};
		prescribedVital.appointmentID = appointmentData.appointmentID;
		prescribedVital.vitalList = $scope.doctorVitalList;
        PresSaveService.savePrescribedVital.query({}, prescribedVital).$promise.then(function (result) {
            $modalInstance.close(true);
        });
	};

    $scope.cancelVital = function () {
        $modalInstance.close(true);
    };
	
	
	(function(){
		$scope.bringDoctorPrefVital();
    })()

	
});