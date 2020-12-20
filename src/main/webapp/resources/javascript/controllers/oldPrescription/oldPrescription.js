app.controller('OldPrescriptionController', function($scope, $http, $modal, $rootScope, limitToFilter, $location, OldPrescriptionService) {
	
	$scope.patientData = {};
	$scope.oldAppoinmentList =[];
	$scope.appoinmentData ={};
	$scope.patientStateList = [];
	
	$scope.history1 = "MH";
	$scope.history2 = "OBS";
	
	$scope.bringPatientInfo = function(){
		
		var dataString = "query=0";

        OldPrescriptionService.getPatientInfo.query({}, dataString).$promise.then(function(result) {
            if (result && result.success) {
                $scope.patientData = result;
        	    $scope.bringPatientOldPrescription($scope.patientData.patientID)
            }else{
    
            }
        });
	};
	
    
	$scope.bringPatientOldPrescription = function (patientID){
    	
		var dataString = "query=0" + '&patientID=' + patientID;

        OldPrescriptionService.getAppoinment.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.oldAppoinmentList = result;
                if ($scope.oldAppoinmentList.length > 0) {
                    $scope.viewPrescription($scope.oldAppoinmentList[0]);
                }
            } else {

            }
        });
    };
    
    $scope.prescribedDrugList = [];
	
	$scope.bringPrescribedDrugs = function (appointmentID){
		
		var dataString = "query=0" + '&appointmentID=' + appointmentID;

        OldPrescriptionService.getDrugPrescription.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.prescribedDrugList = result;
            } else {

            }
        });
	};
	
	$scope.prescribedInvList = [];
	
	$scope.bringPrescribedInv = function (appointmentID){
		
		$scope.invAdderData = {};
		
		var dataString = "query=1" + '&appointmentID=' + appointmentID;

        OldPrescriptionService.getInvPrescription.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.prescribedInvList = result;
            } else {

            }
        });
	};
	
	$scope.prescribedAdviceList = [];
	
	$scope.bringPrescribedAdvice = function(appointmentID){
		
		var dataString = "query=2" + '&appointmentID=' + appointmentID;

        OldPrescriptionService.getAdvicePrescription.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.prescribedAdviceList = result;
            } else {

            }
        });
		
	};
	
	$scope.prescribedVitalData = [];
	
	$scope.bringPrescribedVital = function(appointmentID){
		
		var dataString = "query=3" + '&appointmentID=' + appointmentID;

        OldPrescriptionService.getVitalPrescription.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.prescribedVitalData = result;
            } else {

            }
        });
		
	};

    $scope.getComplainString = function (complain) {

        var data = complain.symptomName;

        if(complain.durationID < 5){
            data = data + " " + complain.durationNum + " " + complain.durationType
        }
        if(complain.durationID == 7){
            data = data + " " + complain.durationType
        }

        return data;
    };
	
	$scope.prescribedComplainData = [];
	
	$scope.bringPrescribedComplain = function(appointmentID){

        $scope.prescribedComplainData = [];
		var dataString = "query=4" + '&appointmentID=' + appointmentID;

        OldPrescriptionService.getComplainPrescription.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.prescribedComplainData = result;
            } else {

            }
        });
		
	};
	
	$scope.prescribedMHData = [];
	
	$scope.bringPrescribedMH = function(appointmentID, patientID){
        $scope.prescribedMHData = [];
		var dataString = "query=5" + '&typeCode=MH' + '&appointmentID=' + appointmentID + '&patientID=' + patientID;

        OldPrescriptionService.getHistoryMHPrescription.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.prescribedMHData = result;
            } else {

            }
        });
		
	};
	
	$scope.prescribedOBSData = [];
	
	$scope.bringPrescribedOBS = function(appointmentID, patientID){
        $scope.prescribedOBSData = [];
		var dataString = "query=5" + '&typeCode=OBS' + '&appointmentID=' + appointmentID + '&patientID=' + patientID;

        OldPrescriptionService.getHistoryOBSPrescription.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.prescribedOBSData = result;
            } else {

            }
        });
		
	};
	
	$scope.diagnosisData = {};
	
	$scope.bringPrescribedDiagnosis = function (appointmentID){
        $scope.diagnosisData = {};
		var dataString = "query=6" + '&appointmentID=' + appointmentID;

        OldPrescriptionService.getDiagnosisPrescription.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.diagnosisData = result;
            } else {

            }
        });
	};
	
	$scope.historyList = [];
	    
	    $scope.bringPrescribedHistory = function(appointmentID, patientID){
	    	$scope.historyList = [];
	    	angular.forEach($scope.menuDataList, function(value, key) {
	    		if(value.inPrescription == 2){
	    			var dataString = "query=5" + '&typeCode='+ value.defaultName  + '&appointmentID=' + appointmentID + '&patientID=' + patientID;
	
                    OldPrescriptionService.getPrescriptionHistory.query({}, dataString).$promise.then(function (result) {
                        if (result && result.success) {
                            if(result){
                                var historyData = {};
                                historyData.headerName = value.menuHeader;
                                historyData.prescribedHistoryList = result;
                                $scope.historyList.push(historyData);
                            }
                        } else {
            
                        }
                    });
	    		}
	    	});
	    	
	    };
	    
	    $scope.bringMenu = function(){
			
			var dataString = "query=1";

            OldPrescriptionService.getMenuSettings.query({}, dataString).$promise.then(function (result) {
                if (result && result.success) {
                    $scope.menuDataList = result;
                } else {
    
                }
            });
			
		};
    
	
	
    $scope.viewPrescription = function (data) {
    	
    	$scope.bringPrescribedDiagnosis(data.appointmentID);
        $scope.bringDietInfo(data.appointmentID);
    	$scope.bringPrescribedDrugs(data.appointmentID);
    	$scope.bringPrescribedInv(data.appointmentID);
    	$scope.bringPrescribedAdvice(data.appointmentID);
    	$scope.bringPrescribedVital(data.appointmentID);
    	$scope.bringPrescribedComplain(data.appointmentID);
    	$scope.bringPrescribedHistory(data.appointmentID, data.patientID);
        $scope.bringPrescribedComment(data.appointmentID);
        $scope.bringPrescribedFollowUp(data.appointmentID);

    	$scope.showPrescriptionView = true;
    	$scope.prescriptionViewDate = data.date;
    };

    $scope.bringDietInfo = function (appointmentID) {
        var dataString = "query=11" + '&appointmentID=' + appointmentID + '&contentType=' + 'DIET';
        
        OldPrescriptionService.getContentInfo.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.dietData = {};
                if (result && result.length > 0) {
                    $scope.dietData.contentDetailID = result[0].contentDetailID;
                    $scope.dietData.dietName = result[0].detail;
                } else {
                    $scope.dietData.contentDetailID = null;
                    $scope.dietData.dietName = null;
                }
            } else {

            }
        });
    };

    $scope.bringPrescribedComment = function (appointmentID){

        var dataString = "query=11" + '&appointmentID=' + appointmentID + '&contentType=' + 'COMMENT';

        OldPrescriptionService.getContentComment.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                if(result && result.length > 0){
                    $scope.commentData= result[0];
                }else{
                    $scope.commentData= {};
                }
            } else {

            }
        });
    };

    $scope.bringPrescribedFollowUp = function (appointmentID){

        var dataString = "query=11" + '&appointmentID=' + appointmentID + '&contentType=' + 'CLINICAL_RECORD';

        OldPrescriptionService.getContentRecord.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                if(result && result.length > 0){
                    $scope.followUpDataList= result;
                }else{
                    $scope.followUpDataList= [];
                }
            } else {

            }
        });
    };

    $scope.addToPrescription = function (state, requestedData, queryNo){
    	
    	requestedData.addedToPrescription = state;
    	if(state){
    		var dataString = "query="+ queryNo + '&requestedID=' + requestedData.id;
            $http({
                method: 'POST',
                url: "phpServices/oldPrescription/oldPrescription.php",
                data: dataString,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (result) {
            	
            });
    	}else{
    		alert("Please remove it from Prescription Page");
    		requestedData.addedToPrescription = !state;
    	}
    };

    $scope.masterAddToPrescription = function (state, requestedData){

        requestedData.addedToPrescription = state;
        if(state){
            angular.forEach($scope.prescribedComplainData, function(value, key) {
                $scope.addToPrescription(!value.addedToPrescription, value, 10);
            });
            angular.forEach($scope.prescribedVitalData, function(value, key) {
                $scope.addToPrescription(!value.addedToPrescription, value, 1);
            });
            angular.forEach($scope.prescribedInvList, function(value, key) {
                $scope.addToPrescription(!value.addedToPrescription, value, 8);
            });

            angular.forEach($scope.prescribedDrugList, function(value, key) {
                $scope.addToPrescription(!value.addedToPrescription, value, 7);
            });
            angular.forEach($scope.prescribedAdviceList, function(value, key) {
                $scope.addToPrescription(!value.addedToPrescription, value, 9);
            });

            $scope.addDiagnosisToPrescription();
            $scope.addCommentToPrescription();
            $scope.addDietToPrescription();


        }else{
            alert("Please remove it from Prescription Page");
            requestedData.addedToPrescription = !state;
        }
    };

    $scope.addDiagnosisToPrescription = function () {

        var dataString = "query="+ 3 + '&requestedID=' + $scope.diagnosisData.id;
        
        OldPrescriptionService.createDiagnosisPrescription.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.diagnosisData.addedToPrescription = true;
            } else {

            }
        });

    };

    $scope.addCommentToPrescription = function () {

        var dataString = "query="+ 4 + '&requestedID=' + $scope.commentData.contentDetailID;
        
        OldPrescriptionService.createContentComment.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.commentData.addedToPrescription = true;
            } else {

            }
        });

    };

    $scope.addDietToPrescription = function () {

        var dataString = "query="+ 4 + '&requestedID=' + $scope.dietData.contentDetailID;
        
        OldPrescriptionService.createContentDiet.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.dietData.addedToPrescription = true;
            } else {

            }
        });

    };



	$scope.inIt = function (){
		$scope.bringMenu();
		$scope.bringPatientInfo();
		
	};
	
	(function(){
		$scope.inIt();
    })()

	
});


app.controller('OldPrescriptionController.ViewPrescriptionController', function($scope, $modalInstance, data, $http) {
	
	
	$(".modal-dialog").addClass('finalStepWidth');
	angular.element(".modal-dialog").addClass('finalStepWidth');
	$scope.$apply();
	
	
	
	$scope.cancelNewPatient = function (){
		$modalInstance.dismiss('cancel');
	};
	
	
});