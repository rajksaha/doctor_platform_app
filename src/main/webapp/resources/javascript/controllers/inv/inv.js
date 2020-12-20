app.controller('PrescribeInvController', function($scope, $http, $filter, $modal, $rootScope, limitToFilter, appointmentData, $modalInstance, DoctorService, PrescriptionService, PresSaveService) {
	

	$scope.invNameData = {};
	$scope.selectedInvID = 0;
	$scope.invSettingData = [];
	$scope.prescribedInvList = [];
	$scope.invsttingNameData = {};
	$scope.invAdderData = {};
	$scope.addByName = false;
    $scope.searchAlpha = 'ALL';
    $scope.doctorPrefInvData = {};
    $scope.activeTab = 'prefList';

    $scope.searchAlphaList = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p","q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "ALL"];

    $scope.prescription = function (num) {
        $modalInstance.close(true);
    };

    $scope.setSearchAlpha = function (item) {
        $scope.searchAlpha = item;
    };

    $scope.filterByAlphabet = function (item) {
        if($scope.searchAlpha == 'ALL' || $scope.searchAlpha.toUpperCase() == item.name){
            return true;
        }
        return false;
    };

    $scope.deleteFromDoctorPref = function (invPreferenceID) {
        DoctorService.deletePrefInv.remove({invPreferenceID: invPreferenceID}).$promise.then(function (result) {
            $scope.bringDoctorPreference($scope.selectedInvCategoryID);
        });
    };

    $scope.getInvName = function(term) {
    	var dataString = {};
    	dataString.term = term;
        
        return $http({
            method: 'POST',
            url: "/api/rest/autoComplete/inv",
            data: dataString
        }).then(function(result) {
        	$scope.invNameData = result.data;
        	return limitToFilter($scope.invNameData, 10);
        });
      };
      
	  $scope.onSelectInvName = function(item, model, label){
		  $scope.selectedInvID = item.id;
		  $scope.addByName = true;
	  };
	  
	
	$scope.addToDoctorPreference = function (isAnother){
        $scope.doctorPrefInvData.doctorID = appointmentData.doctorID;
        DoctorService.createPrefInv.query({}, $scope.doctorPrefInvData).$promise.then(function(result) {
            if (result && result.success) {
                if(isAnother){
                    $scope.doctorPrefInvData = {};
                }else {

                    $scope.setActiveTab('prefList');
                }
            }else{
    
            }
        });
	};
	
	$scope.addORDelINV = function (addedInPrescription,inv){
		inv.addedInPrescription = addedInPrescription;
		if(addedInPrescription){
			$scope.addByPref(inv.invID);
		}else{
			$scope.delete(inv.invID);
		}
	};
	
	$scope.addByPref = function (invID){
        PresSaveService.saveInvFromPref.query({}, {appointmentID:appointmentData.appointmentID, invID: invID}).$promise.then(function(result) {
            $scope.bringDoctorPreference($scope.selectedInvCategoryID);
        });
	};
	
	$scope.delete = function (presInvID){
        PrescriptionService.deletePrescribedInv.query({}, {presInvID:presInvID}).$promise.then(function(result) {
            $scope.bringPrescribedInv();
        });
	};

    $scope.bringDoctorPreference = function (categoryID) {
        $scope.doctorPrefInvList = [];
        DoctorService.getDoctorPrefInv.query({}, {doctorID: appointmentData.doctorID,
                                                    appointmentID : appointmentData.appointmentID,
                                                    categoryID: categoryID}).$promise.then(function(result) {
            $scope.doctorPrefInvList = result;
            $scope.alpha = [];
            angular.forEach($scope.doctorPrefInvList, function(value, key) {
                var fChar = value.invName.toUpperCase().charAt(0);
                var temp = $filter('filter')($scope.alpha, {name: fChar}, true)[0];
                if(temp){
                    temp.prefList.push(value)
                }else{
                    temp = {};
                    temp.name = fChar;
                    temp.prefList = [];
                    temp.prefList.push(value);
                    $scope.alpha.push(temp);
                }
            });
            $scope.numberOfInvAdded = $scope.doctorPrefInvList.length;
        });
    };
	
	$scope.bringINVDetail = function (){
        PrescriptionService.getInvDetail.query({}, {}).$promise.then(function (result) {
            $scope.invCategorySearchList = result;
            $scope.invCategorySearchList.push({ name: "No Category", invCategoryID: 0 });
            $scope.invCategorySearchList.push({ name: "All Category", invCategoryID: -1 });
            $scope.selectedInvCategoryID = -1;
            $scope.bringDoctorPreference($scope.selectedInvCategoryID);
        });


	};
	
	$scope.bringPrescribedInv = function (){
        $scope.prescribedInvList = [];
        PrescriptionService.getPrescribedInv.query({}, {appointmentID : appointmentData.appointmentID}).$promise.then(function(result) {
            $scope.prescribedInvList = result;
        });
	};
	
	$scope.prepareInvAdderData = function(invAdderData){
        PresSaveService.createDoctorInVSettings.query({}, $scope.searchData).$promise.then(function(result) {
            $scope.addInvToPrescription(result, invAdderData.note);
            $scope.bringPrescribedInv();
        });
	};

	$scope.manualAdd = function () {
	    var data = {};
        data.editMode = true;
        $scope.prescribedInvList.push(data);
    };

    $scope.manualSave = function (invData) {
        if(validator.validateForm("#validateReq","#lblMsg_modal",null)) {
            delete invData.editMode;
            if(invData.presInvID){
                PresSaveService.updatePrescribedInv.query({}, invData).$promise.then(function(result) {
                    $scope.bringPrescribedInv();
                });
            }else{
                invData.appointmentID = appointmentData.appointmentID;
                PresSaveService.createPrescribedInv.query({}, invData).$promise.then(function(result) {
                    $scope.bringPrescribedInv();
                });
            }
        }else {
            $scope.error = true;
        }
    };

    $scope.manualCancel = function (invData) {
        invData.editMode = false;
    };

	$scope.setActiveTab = function (tab) {
        switch (tab){
            case 'prefList':
                $scope.bringDoctorPreference($scope.selectedInvCategoryID);
                break;
            case 'addPref':
                $scope.doctorPrefInvData = {};
                break;
            case 'prescribedList':
                $scope.bringPrescribedInv();
                break;
            default:
                $scope.activeTab = tab;
        }
        $scope.activeTab = tab;

    };
    
	
    $scope.inIt = function (){
        $scope.bringINVDetail();
    };

    $scope.inIt();
});