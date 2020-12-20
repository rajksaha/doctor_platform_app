app.controller('PrescribeAdviceController', function($scope, $http, $modal, $rootScope, limitToFilter, $modalInstance, doctorData, appointmentData, DoctorService, PresSaveService, PrescriptionService) {

    $scope.activeTab = 'bngPrefList';
	$scope.doctorPrefAdviceData = {};
	$scope.selectedInvID = 0;
	$scope.advcieSettingData = [];
	$scope.adviceAdderData = {};
	$scope.invAdderData = {};
	$scope.addByName = false;
	
	$scope.doctorData = doctorData;

    $scope.prescription = function () {
        $modalInstance.close(true);
    };
	
	$scope.adviceAdderData.lang = 0;

    $scope.getAdviceName = function(term) {
        
        var searchData = {};
        searchData.term = term;
        if($scope.doctorPrefAdviceData.lang){
            searchData.intLang = $scope.doctorPrefAdviceData.lang;
		}else{
            searchData.intLang = $scope.prescribeAdviceData.lang;
		}
        searchData.intType = $scope.doctorData.category;
        return $http({
            method: 'POST',
            url: "/api/rest/autoComplete/advice",
            data: searchData
        }).then(function(result) {
        	$scope.adviceNameData = result.data;
        	return limitToFilter($scope.adviceNameData, 10);
        });
      };

    $scope.addToDoctorPreference = function (addAnother){
        var displayOrder = 1;
        if($scope.doctorPrefAdviceList != undefined && $scope.doctorPrefAdviceList.length > 0){
            displayOrder = parseInt($scope.doctorPrefAdviceList[$scope.doctorPrefAdviceList.length -1].displayOrder) + 1;
        }
        $scope.doctorPrefAdviceData.displayOrder = displayOrder;
        $scope.doctorPrefAdviceData.doctorID = appointmentData.doctorID;
        DoctorService.createPrefAdvice.query({}, $scope.doctorPrefAdviceData).$promise.then(function(result) {
            if (result && result.success) {
                if(addAnother){
                    $scope.doctorPrefAdviceData = {};
                }else {
                    if($scope.doctorPrefAdviceData.lang == 1){
                        $scope.setActiveTab('bngPrefList');
                    }else{
                        $scope.setActiveTab('engPrefList');
                    }
                }
            }else{

            }
        });

    };

    $scope.deleteFromDoctorPref = function (advicePreferenceID) {
        DoctorService.deletePrefAdvice.remove({advicePreferenceID: advicePreferenceID}).$promise.then(function (result) {
        	$scope.bringDoctorPrefAdvice();
        });
    };

    $scope.deciderAdvice = function (addedInPrescription,advice){
        advice.addedInPrescription = addedInPrescription;
        if(addedInPrescription){
            $scope.addToPres(advice.adviceID);
        }else{
            $scope.deletePrescribedAdvice(advice.adviceID);
        }
    };

    $scope.addToPres = function (adviceID){
        PresSaveService.saveAdviceFromPref.query({}, {appointmentID: appointmentData.appointmentID, adviceID: adviceID}).$promise.then(function (result) {
        });
    };

    $scope.deletePrescribedAdvice = function (prescriptionAdviceID){
        PrescriptionService.deletePrescribedAdvice.remove({prescriptionAdviceID: prescriptionAdviceID}).$promise.then(function (result) {
        });
    };

    $scope.bringDoctorPrefAdvice = function (){
        $scope.doctorPrefAdviceList = [];
        DoctorService.getDoctorPrefAdvice.query({}, {doctorID: appointmentData.doctorID, appointmentID : appointmentData.appointmentID}).$promise.then(function (result) {
            $scope.doctorPrefAdviceList = result;
        });
    };

    $scope.bringPrescribedAdvice = function (){
        $scope.prescribedAdviceList = [];
        PrescriptionService.getPrescribedAdvice.query({}, {appointmentID : appointmentData.appointmentID}).$promise.then(function (result) {
            $scope.prescribedAdviceList = result;
        });
    };

    $scope.addToPrescription = function () {
        if(validator.validateForm("#validateReq","#lblMsg_modal",null)) {
            $scope.prescribeAdviceData.appointmentID = appointmentData.appointmentID;
            PresSaveService.createPrescribedAdvice.query({}, $scope.prescribeAdviceData).$promise.then(function(result) {
            	$scope.prescribeAdviceData.advice = null;
                $scope.bringPrescribedAdvice();
            });
        }else {
            $scope.error = true;
        }
    };

    $scope.engFilter = function (item) {
        if(item.lang == 0){
            return true;
        }
        return false;
    };

    $scope.bangFilter = function (item) {
        if(item.lang == 1){
            return true;
        }
        return false;
    };

    $scope.setActiveTab = function (tab) {
        switch (tab){
            case 'bngPrefList':
                $scope.bringDoctorPrefAdvice();
                break;
            case 'engPrefList':
                $scope.bringDoctorPrefAdvice();
                break;
            case 'addPref':
                $scope.doctorPrefAdviceData = {};
                $scope.doctorPrefAdviceData.lang = 0;
                break;
            case 'prescribedList':
                $scope.prescribeAdviceData = {};
                $scope.prescribeAdviceData.lang = 0;
                $scope.bringPrescribedAdvice();
                break;
            default:
                $scope.activeTab = tab;
        }
        $scope.activeTab = tab;

    };

    $scope.inIt = function (){
        $scope.bringDoctorPrefAdvice();
    };

    $scope.inIt();

	
});