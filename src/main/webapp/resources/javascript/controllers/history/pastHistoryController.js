app.controller('PastHistoryController', function($scope, $http, $modal, $rootScope, limitToFilter, $modalInstance, $filter,
                                                 doctorData, appointmentData, PastHistoryService) {
	
	$scope.relationList = [];

	$scope.history = {};
	
	$scope.addMoreButton = true;

    $scope.typeCode = "";
	
	
	$scope.historyData = {};
	$scope.historySettingData = {};
	$scope.paientHistoryList = [];
	$scope.pageName = "";
	$scope.typeCode = "";
	$scope.addByName = false;

    $scope.pageNameList = ["M.H", "Obs History", "Gynaecological History", "Sub-fertility History", "Immunization History", "Others History", "Laparoscopy Findings", "Hospital Details"	];

    $scope.prescription = function () {
        $modalInstance.close(true);
    };

	/*Family History*/

    $scope.bringRelationList = function(){
        PastHistoryService.getRelationList.query({}, {}).$promise.then(function(result) {
            $scope.relationList = result;
        });

    };

    $scope.bringFamilyHistoryData = function(){
        $scope.bringRelationList();
        $scope.addMoreButton = true;

        PastHistoryService.getDiseaseFromFamilyHistory.query({}, {patientID: appointmentData.patientID}).$promise.then(function (result) {
            $scope.historyList[1].itemList = result;
            if ($scope.historyList[1].itemList.length == 0) {
                $scope.addFamilyHistory();
            }
        });
    };

    $scope.addFamilyHistory = function (){

        angular.forEach($scope.historyList[1].itemList, function(value, key) {
            value.otherEditMode = true;
        });

        $scope.addMoreButton = false;

        $scope.familyHistoryData = {};
        $scope.familyHistoryData.relation = $scope.relationList[0].relationID;
        $scope.familyHistoryData.patientID = appointmentData.patientID;
        $scope.familyHistoryData.type = "Consanguinity";
        $scope.familyHistoryData.present = "Yes";
        $scope.familyHistoryData.editMode = true;
        $scope.historyList[1].itemList.splice(0,0, $scope.familyHistoryData);
    };

    $scope.saveFamilyHistory = function(familyHistoryData){
        if(validator.validateForm("#validateReq","#lblMsg",null)) {
            delete familyHistoryData.editMode;
            delete familyHistoryData.addedToPres;
            delete familyHistoryData.oterEditMode;
            PastHistoryService.saveFamilyHistory.query({}, familyHistoryData).$promise.then(function (result) {
                $scope.succcess = true;
                $scope.error = false;
                $scope.message = "Information Updated Successfully";
                $scope.bringFamilyHistoryData();
            });
        }else{
            $scope.message = "";
            $scope.succcess = false;
            $scope.error = true;
        }

    };

    $scope.editFamilyHistory = function (familyHistoryData){

        angular.forEach($scope.familyHistoryList, function(value, key) {
            value.otherEditMode = true;
        });

        familyHistoryData.oterEditMode = false;
        familyHistoryData.editMode = true;

        angular.forEach($scope.relationList, function(value, key) {
            if(value.id == familyHistoryData.relation){
                familyHistoryData.relation = value;
            }
        });
    };

    $scope.addToPresFamily = function(data){
        if(data.addedToPres == 1){
            PastHistoryService.deleteFamilyHistoryInPres.remove({}, {presFamilyDiseaseID: data.presFamilyDiseaseID}).$promise.then(function (result) {
                $scope.succcess = true;
                $scope.error = false;
                $scope.message = "Information Deleted From Prescription";
                data.addedToPres = false;
            });
        }else{
            PastHistoryService.addFamilyHistoryInPres.query({}, {familyHistoryID:data.familyHistoryID, appointmentID: appointmentData.appointmentID}).$promise.then(function (result) {
                $scope.succcess = true;
                $scope.error = false;
                $scope.message = "Information Added To Prescription";
                data.addedToPres = true;
            });
        }

    };

    $scope.cancelFamilyHistory  = function(){
        $scope.bringFamilyHistoryData();
    };

    $scope.deleteFamilyHistory = function(familyHistoryID){
        PastHistoryService.deleteFamilyHistory.remove({}, {familyHistoryID:familyHistoryID}).$promise.then(function (result) {
            $scope.succcess = true;
            $scope.error = false;
            $scope.message = "Information Deleted Successfully";
            $scope.bringFamilyHistoryData();
        });
    };

    /*Family History Ends*/

    /*Past Disease*/
	
	
	$scope.savePastHistory = function(pastHistoryData){
		if(validator.validateForm("#validateReq","#lblMsg",null)) {
            delete pastHistoryData.editMode;
            delete pastHistoryData.addedToPres;
            delete pastHistoryData.oterEditMode;
            PastHistoryService.savePastHistory.query({}, pastHistoryData).$promise.then(function (result) {
                $scope.succcess = true;
                $scope.error = false;
                $scope.message = "Information Updated Successfully";
                $scope.bringPastHistoryData();
            });
		}else{
			$scope.message = "";
			$scope.succcess = false;
			$scope.error = true;
		}
		
		
	};
	
	$scope.editPastHistory = function (pastHistoryData){
		angular.forEach($scope.pastHistoryList, function(value, key) {
			value.otherEditMode = true;
		});
		pastHistoryData.oterEditMode = false;
		pastHistoryData.editMode = true;
		
	};
	
	$scope.addToPresPast = function(data){
		if(data.addedToPres == 1){
            PastHistoryService.deletePastHistoryFromPres.query({}, {patientPastDiseaseID: data.patientPastDiseaseID}).$promise.then(function (result) {
                $scope.succcess = true;
                $scope.error = false;
                $scope.message = "Information Deleted From Prescription";
                data.addedToPres = false;
            });
	    }else{
            PastHistoryService.addPassHistoryInPres.query({}, {patientPastDiseaseID: data.patientPastDiseaseID, appointmentID:appointmentData.appointmentID}).$promise.then(function (result) {
                $scope.succcess = true;
                $scope.error = false;
                $scope.message = "Information Added To Prescription";
                data.addedToPres = true;
            });
	    }
	    
		};
		
	$scope.cancelPastHistory  = function(){
		$scope.bringPastHistoryData();
	};

	$scope.deletePastHistory = function(patientPastDiseaseID){
        PastHistoryService.deletePastDisease.query({}, {patientPastDiseaseID:patientPastDiseaseID}).$promise.then(function (result) {
            $scope.succcess = true;
            $scope.error = false;
            $scope.message = "Information Deleted Successfully";
            $scope.bringPastHistoryData();
        });
	};

    $scope.addPastHistory = function (isPresent) {

        angular.forEach($scope.historyList[0].itemList, function (value, key) {
            value.otherEditMode = true;
        });

        $scope.addMoreButton = false;

        $scope.pastHistoryData = {};

        $scope.pastHistoryData.isPresent = isPresent;

        $scope.pastHistoryData.detail = "";

        $scope.pastHistoryData.patientID = appointmentData.patientID;

        $scope.pastHistoryData.editMode = true;

        $scope.historyList[0].itemList.push($scope.pastHistoryData);

    };

    $scope.bringPastHistoryData = function(){
        $scope.addMoreButton = true;
        PastHistoryService.getPastDisease.query({}, {patientID: appointmentData.patientID}).$promise.then(function (result) {
            $scope.historyList[0].itemList = [];
            if(result && result.length > 0){
                $scope.historyList[0].itemList = result;
            }
        });
    };

    /*Past History End*/

    /*Drug History*/

    $scope.bringPatientDrugList = function (){
        PastHistoryService.getCurrentDrugList.query({}, {patientID: appointmentData.patientID}).$promise.then(function (result) {
            $scope.patientDrugList = result;
        });
    };

    $scope.addDrug = function(status){

        $scope.showDrugAdvice = true;
        var data = {};

        data.drugName = "";
        data.editMode = true;
        data.currentStatus = status;
        data.patientID = appointmentData.patientID;
        $scope.masterUpdate = false;

        if($scope.patientDrugList){
            angular.forEach($scope.patientDrugList, function(value, key) {
                value.otherEditMode = true;
            });
        }else{
            $scope.patientDrugList=[];
        }
        $scope.patientDrugList.splice(0,0, data);
    };

    $scope.saveDrug = function(data, status) {
        delete data.editMode;
        delete data.otherEditMode;
        PastHistoryService.saveDrugHistory.query({}, data).$promise.then(function (result) {
            $scope.bringPatientDrugList();
        });
    };

    $scope.delDrug = function(data, status) {
        PastHistoryService.deleteDrugHistory.remove({}, {drugHistoryID:data.drugHistoryID}).$promise.then(function (result) {
            $scope.bringPatientDrugList();
        });
    };

    $scope.addDrugToPres = function(data){
        if(!data.addedToPres){
            delete data.addedToPres;
            var drugHistory = {};
            drugHistory.drugName = data.drugName;
            drugHistory.currentStatus = data.currentStatus;
            drugHistory.appointmentID = appointmentData.appointmentID;
            PastHistoryService.addDrugPresInPres.query({}, drugHistory).$promise.then(function (result) {
                data.contentDetailID = result.contentDetailID;
                data.addedToPres = true;
            });
        }else{
            PastHistoryService.deleteDrugPresFromPres.remove({}, {contentDetailID:data.contentDetailID}).$promise.then(function (result) {
                data.addedToPres = false;
            });
        }
    };


	$scope.getDisease = function(term) {
    	
        return $http({
            method: 'POST',
            url: "/api/rest/autoComplete/disease",
            data: {'term': term}
        }).then(function(result) {
        	$scope.diagnosisNameData = result.data;
        	return limitToFilter($scope.diagnosisNameData, 10);
        });
    };

	$scope.initialiseTab = function () {

        $scope.historyList = [];

        var item = 1;
        var temp = {name : 'Medical History', id :item++};
        $scope.historyList.push(temp);

        temp = {name : 'Family History' , id :item++};
        $scope.historyList.push(temp);

        temp = {name : 'Drug History' , id :item++};
        $scope.historyList.push(temp);

        angular.forEach(doctorData.menuList, function (value, key) {
            if (value.isPopUp == 1 && value.inPrescription == 2) {
                temp = { name: value.menuHeader, id: item++, typeCode: value.defaultName };
                $scope.historyList.push(temp);
            }
        });

    };
	
	$scope.changeTab = function (history) {
		$scope.error = false;
		$scope.succcess = false;

		if(history.id == 1){
            $scope.bringPastHistoryData();
		}else if (history.id == 2){
            $scope.bringFamilyHistoryData();
		}else if(history.id == 3){
            $scope.bringPatientDrugList();
            $scope.bringPatientDrugList();
		}else {
            $scope.typeCode = history.typeCode;

            		var num = 0;
		
		if($scope.typeCode == "OBS"){
			num = 1;
		}else if ($scope.typeCode == "GYNAE") {
			num = 2;
		}else if ($scope.typeCode == "SUB-FERTILITY") {
			num = 3;
		}else if ($scope.typeCode == "IMMUNIZATION") {
			num = 4;
		}else if ($scope.typeCode == "OTHERS") {
			num = 5;
		}else if ($scope.typeCode == "LAPAROSCOPY") {
			num = 6;
		}else if ($scope.typeCode == "HOSPITAL") {
			num = 7;
		}
            $scope.pageName = $scope.pageNameList[num];
            $scope.bringHistoryDetail();
        }
    };

    $scope.bringHistoryDetail = function (){

        $scope.historySettingData = {};

        PastHistoryService.getCustomHistoryDetail.query({}, {doctorID:appointmentData.doctorID,
            patientID:appointmentData.patientID, appointmentID:appointmentData.appointmentID, typeCode:$scope.typeCode}).$promise.then(function (result) {
            $scope.paientHistoryList = result;
            angular.forEach($scope.paientHistoryList, function (value, key) {
                if (parseInt(value.savedHistorysID) > 0) {
                    value.addToPrescription = true;
                }
            });
        });
    };

    $scope.getHistory = function(term) {
        var searchData = {};
        searchData.term = term;
        searchData.entityType = $scope.typeCode;
        return $http({
            method: 'POST',
            url: "/api/rest/autoComplete/history",
            data: searchData
        }).then(function(result) {
            $scope.historyData = result.data;
            return limitToFilter($scope.historyData, 10);
        });
    };

    $scope.bringHistoryOption = function(historydata, term){
        var searchData = {};
        searchData.term = term;
        searchData.entityID= historydata.historyID;
        return $http({
            method: 'POST',
            url: "/api/rest/autoComplete/historyOption",
            data: searchData
        }).then(function(result) {
            $scope.historyOption = result.data;
            return limitToFilter($scope.historyOption, 10);
        });
    };

    $scope.deleteHistoryFromSetting = function (historySettingID){
        PastHistoryService.deleteCustomHistory.query({}, {historySettingID: historySettingID}).$promise.then(function (result) {
            $scope.bringHistoryDetail();
        });
    };

    $scope.addHistoryToDoctorPref = function (addAnother){

        if(validator.validateForm("#historySetting","#lblMsg",null)) {
            var displayOrder = 1;
            if($scope.paientHistoryList != undefined && $scope.paientHistoryList.length > 0){
                displayOrder = parseInt($scope.paientHistoryList[$scope.paientHistoryList.length -1].displayOrder) + 1;
            }
            PastHistoryService.createHistoryToDocPref.query({}, $scope.historySettingData).$promise.then(function (result) {
                $scope.historySettingData = {};
                if(!addAnother){
                    $scope.bringHistoryDetail();
                }
            });

        }else{
            $scope.error = true;
        }
    };


    $scope.saveHistory = function(){
        var prescribedHistory = {};
        prescribedHistory.entityID = appointmentData.patientID;
        prescribedHistory.appointmentID = appointmentData.appointmentID;
        prescribedHistory.historyList = $scope.paientHistoryList;
        PastHistoryService.saveCustomHistory.query({}, prescribedHistory).$promise.then(function (result) {
            $scope.succcess = true;
            $scope.error = false;
            $scope.message = 'Information Saved Successfully';
        });
    };


  $scope.init = function () {
	  $scope.initialiseTab();
	  $scope.bringPastHistoryData();

  };

    $scope.init();

	
});