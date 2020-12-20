app.controller('PrescriptionController', function($scope, $http, $modal, $rootScope, limitToFilter, $location, $filter,
                                                  $window, JsonService, $upload, PrescriptionService, PatientService,
                                                  PresSaveService, DoctorService, DrugService) {

    $scope.menuDataList = [];
    $scope.patientData = {};
    $scope.doctorData = {};
    $scope.patientTypeList =[];
    $scope.appoinmentData ={};
    $scope.patientStateList = [];

    $scope.refferedAdderData = {};
    $scope.nextVisitData ={};
    $scope.prescribedDrugList = [];
    $scope.prescribedInvList = [];
    $scope.prescribedComplainList = [];
    $scope.prescribedAdviceList = [];
    $scope.historyList = [];
    $scope.pastDiseaseList = [];
    $scope.familyDiseaseList = [];
    $scope.referredDoctorDataList = [];
    $scope.drugHistory = [];
    $scope.diagnosisData = {};
    $scope.dayTypeList = JsonService.dayTypeList;
    $scope.numOfDayList = JsonService.numberList;

    $scope.nextVisitDayTypeList = JsonService.nextVisitDayTypeList;


    $scope.numberOfPrescribedDrugs = 0;
    $scope.numberOfInvAdded = 0;
    $scope.menuState = true;



    $scope.prescribedVitalList = [];
    $scope.hideMenu= false;

    $scope.bringAppointmentDetail = function (){
        PrescriptionService.getPrescriptionInfo.query({}, {appointmentID: $scope.appoinmentData.appointmentID}).$promise.then(function (result) {
            $scope.diagnosisData = result.diagnosis;
            $scope.dietData = result.diet;
            $scope.prescribedDrugList = result.drug;
            $scope.vm = {
                list: $scope.prescribedDrugList
            };
            $scope.prescribedInvList = result.inv;
            $scope.prescribedComplainList = result.complain;
            $scope.prescribedAdviceList = result.advice;
            $scope.prescribedVitalList = result.vital;
            $scope.referredDoctorDataList = result.reference;
            if(!result.reference ||  result.reference.length == 0){
                $scope.referredAdderData = {};
                $scope.referredAdderData.isEmpty = true;
            }
            $scope.pastDiseaseList = result.pastDisease;
            $scope.familyDiseaseList = result.familyHistory;
            $scope.currentDrugHistoryList = result.currentDrugHistory;
            $scope.oldDrugHistoryList = result.oldDrugHistory;
            if(result.newtVisit &&  result.newtVisit.length > 0){
                $scope.nextVisitData = result.newtVisit[0];
            }
        });
        $scope.bringPrescribedHistory($scope.appoinmentData.appointmentID, $scope.appoinmentData.patientID);

        //$scope.bringPrescribedReferredDoctor($scope.appoinmentData.appointmentID);

        //$scope.bringPrescribedComment($scope.appoinmentData.appointmentID);

        //$scope.bringClinicalRecord($scope.appoinmentData.appointmentID);
    };

    $scope.hoverIn = function(){
        this.hoverState = true;
    };

    $scope.hoverOut = function(){
        this.hoverState = false;
    };

    $scope.toggoleButton = function () {
        $scope.hideMenu = !$scope.hideMenu;
    };

    $scope.getComplainString = function (complain) {
        var data = complain.symptomName;
        if(complain.durationType != null && complain.durationType < 5){
            data = data + " " + complain.durationNum + " " + JsonService.dayTypeList[complain.durationType - 1].engName;
        }
        if(complain.durationType == 7){
            data = data + " " + JsonService.dayTypeList[complain.durationType].engName;
        }
        return data;
    };

    $scope.drugDoseString = function (drugData) {

    };

    $scope.onFileSelect = function($files){
        $scope.file = $files[0];
        $scope.uploading = true;
        $scope.hasCsvError = false;

        $upload.upload({
            url : 'phpServices/prescription/savePhoto.php',
            method: 'POST',
            data : {},
            file: $scope.file
        }).then(function(result) {
            $scope.bringPatientInfo();
        }, function(result) {
            $scope.uploading = false;
        }, function(evt) {

        });
    };

    $scope.fixNextVisit = function (nextVisitType){
        $scope.nextVisitData.needSaveButton = false;
        $scope.nextVisitData.nextVisitType = nextVisitType;

        if($scope.nextVisitData.nextVisitType == 2){
            $scope.nextVisitData.visitDate = null;
            $scope.nextVisitData.stringDate = null;
        }else{
            $scope.nextVisitData.stringDate = $filter('date')($scope.nextVisitData.visitDate, "yyyy-MM-dd");
            $scope.nextVisitData.numOfDay = null;
            $scope.nextVisitData.durationType = null;
        }
        delete $scope.nextVisitData.needSaveButton;
        $scope.nextVisitData.appointmentID = $scope.appoinmentData.appointmentID;
        PrescriptionService.saveNextVisit.query({}, $scope.nextVisitData).$promise.then(function(result) {
            $scope.nextVisitData = result.data;
        });
    };

    $scope.refDoc = {};

    $scope.getClinicalNote = function(term) {
        var dataString = 'query=22'+ '&detail=' + term;
        return $http({
            method: 'POST',
            url: "/api/rest/autoComplete/prescription",
            data: dataString
        }).then(function(result) {
            $scope.content = result.data;
            return limitToFilter($scope.content, 10);
        });
    };

    $scope.getRefDoctor = function(term) {
        var dataString = {};
        dataString.term = term;
        return $http({
            method: 'POST',
            url: "/api/rest/autoComplete/refDoctor",
            data: dataString
        }).then(function(result) {
            $scope.refDoc = result.data;
            return limitToFilter($scope.refDoc, 10);
        });
    };

    $scope.onSelectRefDoctor = function(item, model, label){
        $scope.referredAdderData.doctorAddress = item.doctorAddress;
    };

    $scope.saveReferredDoctor = function(refDocData){
        delete refDocData.isEmpty;
        refDocData.appointmentID = $scope.appoinmentData.appointmentID;
        PresSaveService.savePresDoctorRefer.query({}, refDocData).$promise.then(function (result) {
            $scope.referredDoctorDataList.push(result.data);
            $scope.referredAdderData = {};
        });
    };

    $scope.deleteReferredDoctor = function(prescriptionReferenceID){
        PrescriptionService.deletePresDocRefer.remove({}, {prescriptionReferenceID: prescriptionReferenceID}).$promise.then(function (result) {
            $scope.bringPrescribedReferredDoctor($scope.appoinmentData.appointmentID);
        });
    };

    $scope.bringDoctorInfo = function (doctorID){
        DoctorService.getDoctorDetail.query({}, {doctorID:doctorID}).$promise.then(function (result) {
            $scope.doctorData = result.doctorData;
            $scope.patientStateList = result.appointmentType;
            $scope.bringAppointmentDetail();
        });
    };

    $scope.bringPatientInfo = function(){
        PatientService.getPatientDetail.query({}, {patientID:$scope.appoinmentData.patientID}).$promise.then(function (result) {
            $scope.patientData = result;
        });
    };

    $scope.menuPopUp = function (popUp) {
        if(popUp = 'history'){
            $scope.historyModal();
        }
    };

    $scope.hasAccess = function(accessKey){
        if($rootScope.userData.permissions['DOCTOR'] || $rootScope.userData.permissions[accessKey]){
            return true;
        }
        return false;
    };

    $scope.hasAccessMenu = function(main){
        if($scope.userAccessInfo){
            if($scope.userAccessInfo.userType == 'DOCTOR'){return true;}
            var temp = $filter('filter')($scope.userAccessInfo.accessList, {parentAccessID: main}, true)[0];
            return temp == null ? false : true;
        }
    };


    $scope.changePatientType = function(patientTypeID){
        $scope.patientData.patientType = patientTypeID;
        PatientService.updatePatientType.query({}, {patientID:$scope.patientData.patientID, patientTypeID: patientTypeID}).$promise.then(function (result) {
        });
    };

    $scope.changePatientState = function (patientState){
        $scope.appoinmentData.appointmentType = patientState.appointmentTypeID;
        var searchData = {};
        searchData.appointmentID = $scope.appoinmentData.appointmentID;
        searchData.appointmentType = patientState.appointmentTypeID;
        PrescriptionService.updateAppStatus.query({},searchData).$promise.then(function (result) {
        });
    };


    $scope.bringAppointmentInfo = function (){
        PrescriptionService.getCurrentAppointment.query({}, {}).$promise.then(function (result) {
            $scope.appoinmentData = result;
            $scope.bringDoctorInfo($scope.appoinmentData.doctorID);
            $scope.bringPatientInfo();
        });
    };

    $scope.clinicalRecordList = [];
    $scope.bringClinicalRecord = function (appointmentID) {
        var dataString = "query=12" + '&appointmentID=' + appointmentID + '&contentType=' + 'CLINICAL_RECORD';
        PrescriptionService.getRecordOfClinical.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.clinicalRecordList = result;
                angular.forEach($scope.clinicalRecordList, function (value, key) {
                    var dataString = "query=13" + '&appointmentID=' + appointmentID + '&contentType=' + 'CLINICAL_RECORD' + '&code=' + value.code;
                    PrescriptionService.getDetailOfClinical.query({}, dataString).$promise.then(function (result) {
                        if (result && result.success) {
                            value.followUpList = data;
                        } else {
                        }
                    });
                });
            } else {

            }
        });
    };

    $scope.bringDietInfo = function (appointmentID) {
        PrescriptionService.getPrescribedDiet.query({}, {appointmentID:appointmentID}).$promise.then(function (result) {
            if(result && result.length == 1){
                $scope.dietData.id = result[0].contentDetailID;
                $scope.appointmentID = result[0].entityID;
                $scope.dietData.dietName = result[0].shortName;
            }
        });
    };
    $scope.bringPrescribedHistory = function(appointmentID, patientID){
        angular.forEach($scope.doctorData.menuList, function(value, key) {
            if(value.inPrescription == 2){
                PrescriptionService.getPrescribedHistory.query({}, {patientID: patientID, appointmentID:appointmentID, typeCode: value.defaultName}).$promise.then(function (result) {
                    var historyData = {};
                    historyData.headerName = value.menuHeader;
                    historyData.prescribedHistoryList = result;
                    $scope.historyList.push(historyData);
                });
            }
        });
    };

    $scope.bringPrescribedDrugHistory = function(appointmentID){
        $scope.drugHistory = [];
        PrescriptionService.getPrescribedOldDrugs.query({}, {appointmentID:appointmentID}).$promise.then(function (result) {
            var historyData = {};
            historyData.headerName = "Old Drugs";
            historyData.prescribedDrugList = result;
            $scope.drugHistory.push(historyData);
        });
        PrescriptionService.getPrescribedCurrentDrug.query({}, {appointmentID:appointmentID}).$promise.then(function (result) {
            var historyData = {};
            historyData.headerName = "Current Drugs";
            historyData.prescribedDrugList = result;
            $scope.drugHistory.push(historyData);
        });

    };

    $scope.removeDrugHistory = function (data){

        PrescriptionService.delDrugHistoryById.remove({ contentDetailID: data.contentDetailID}).$promise.then(function (result) {
            if (result && result.success) {
                $scope.bringPrescribedDrugHistory($scope.appoinmentData.appointmentID);
            } else {

            }
        });

    };

    $scope.removeClinicalHistory = function (data){

        //var dataString = "query=19" + '&contentDetailID=' + data.contentDetailID;

        PrescriptionService.delClinicalHistoryById.remove({contentDetailID: data.contentDetailID}).$promise.then(function (result) {
            if (result && result.success) {
                $scope.bringClinicalRecord($scope.appoinmentData.appointmentID);
            } else {

            }
        });

    };

    $scope.deleteInv = function (presInvID, index){
        PrescriptionService.deletePrescribedInv.remove({presInvID: presInvID}).$promise.then(function (result) {
            $scope.prescribedInvList.splice(index, 1);
        });
    };

    $scope.updateCommentText = function (commentText){

        var dataString = "query=17" + '&comment=' + commentText;

        PresSaveService.updateComment.query({}, dataString).$promise.then(function (result) {

        });
    };


    $scope.bringPrescribedComment = function (appointmentID){
        PrescriptionService.getPrescribedComment.query({}, {appointmentID:appointmentID}).$promise.then(function (result) {
            if (result && result.success) {
                if(result && result.length > 0){
                    $scope.commentText = result[0].detail;
                }
            } else {

            }
        });
    };
    $scope.bringPrescribedDrugs = function (appointmentID){
        PrescriptionService.getPrescribedDrug.query({}, {appointmentID:appointmentID}).$promise.then(function (result) {
            $scope.prescribedDrugList = result;
            $scope.vm = {
                list: $scope.prescribedDrugList
            };
        });
    };

    $scope.vm = {
        list: []
    };

    $scope.$watch('vm', function(newValue, oldValue) {
        if (oldValue && oldValue.list && oldValue.list.length > 0 && newValue !== oldValue) {
            var temp = {};
            temp.drugList = newValue.list;
            var dataString = 'jsonString=' + JSON.stringify(temp);
            PrescriptionService.updateDrugPrescriptionJson.query({}, dataString).$promise.then(function (result) {
                console.log("done" + result);
            });
        }
    }, true);


    $scope.bringPrescribedInv = function (appointmentID){
        PrescriptionService.getPrescribedInv.query({}, {appointmentID:appointmentID}).$promise.then(function (result) {
            $scope.prescribedInvList = result;
        });
    };

    $scope.bringPrescribedAdvice = function(appointmentID){
        PrescriptionService.getPrescribedAdvice.query({}, {appointmentID:appointmentID}).$promise.then(function (result) {
            $scope.prescribedAdviceList = result;
        });
    };

    $scope.bringPrescribedVital = function(appointmentID){
        PrescriptionService.getPrescribedVital.query({}, {appointmentID:appointmentID}).$promise.then(function (result) {
            $scope.prescribedVitalList = result;
        });
    };

    $scope.bringPrescribedComplain = function(appointmentID){
        PrescriptionService.getPrescribedComplain.query({}, {appointmentID:appointmentID}).$promise.then(function (result) {
            $scope.prescribedComplainList = [];
            $scope.prescribedComplainList = result;
        });
    };

    $scope.bringPrescribedNextVisit = function (appointmentID){
        PrescriptionService.getPrescribedNextVisit.query({}, {appointmentID:appointmentID}).$promise.then(function (result) {
            $scope.nextVisitData = result;
        });
    };

    $scope.bringPrescribedReferredDoctor = function (appointmentID){
        PrescriptionService.getPrescribedRefDoc.query({}, {appointmentID:appointmentID}).$promise.then(function (result) {
            $scope.referredDoctorDataList = result;
            if(!$scope.referredDoctorDataList || $scope.referredDoctorDataList.length == 0){
                $scope.referredAdderData = {};
                $scope.referredAdderData.isEmpty = true;
            }
        });
    };


    $scope.bringPrescribedDiagnosis = function (appointmentID){
        PrescriptionService.getPrescribedDiagnosis.query({}, {appointmentID:appointmentID}).$promise.then(function (result) {
            $scope.diagnosisData = result;
        });
    };

    $scope.bringPrescribedPastHistory = function (appointmentID){
        PrescriptionService.getPrescribedPastHistory.query({}, {appointmentID:appointmentID}).$promise.then(function (result) {
            $scope.pastDiseaseList = result;
        });
    };

    $scope.deletePastHistory = function(id){
        PrescriptionService.deletePastHistory.remove({pastHistoryID: id}).$promise.then(function (result) {
            $scope.bringPrescribedPastHistory($scope.appoinmentData.appointmentID);
            //$scope.prescribedComplainList.splice(index, 1);
        });
    };



    $scope.bringPrescribedFamilyHistory = function (appointmentID){
        PrescriptionService.getPrescribedFamilyHistory.query({}, {appointmentID:appointmentID}).$promise.then(function (result) {
            $scope.familyDiseaseList = result;
        });
    };

    $scope.deleteFamilyHistory = function(id){
        PrescriptionService.deleteFamilyHistory.remove({familyHistoryID: id}).$promise.then(function (result) {
            $scope.bringPrescribedFamilyHistory($scope.appoinmentData.appointmentID);
            //$scope.prescribedComplainList.splice(index, 1);
        });
    };

    $scope.deleteVital = function(presVitalId, index){
        PrescriptionService.deletePrescribedVital.remove({prescribedVitalID: presVitalId}).$promise.then(function (result) {
            $scope.prescribedComplainList.splice(index, 1);
        });
    };

    $scope.deleteComplain = function(complainID, index){
        PrescriptionService.deletePrescribedComplain.remove({complainID: complainID}).$promise.then(function (result) {
            $scope.prescribedComplainList.splice(index, 1);
        });
    };

    $scope.deleteHistory = function(data){
        PrescriptionService.deletePrescribedHistory.remove({savedHistorysID: data.id}).$promise.then(function (result) {
            $scope.bringPrescribedHistory($scope.appoinmentData.appointmentID, $scope.appoinmentData.patientID);
        });
    };

    $scope.deleteAdvice = function (prescriptionAdviceID, index){
        PrescriptionService.deletePrescribedAdvice.remove({prescriptionAdviceID: prescriptionAdviceID}).$promise.then(function (result) {
            $scope.prescribedAdviceList.splice(index, 1);
        });
    };



    $scope.print = function (){
        $scope.printPreview();
        /*if($scope.diagnosisData.diseaseID){


         var dataString = "query=13" + '&diseaseID=' + $scope.diagnosisData.diseaseID + '&doctorID=' + $scope.doctorData.doctorID;

         $http({
         method: 'POST',
         url: "phpServices/prescription/prescriptionHelperService.php",
         data: dataString,
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         }).success(function (result) {
         if(parseInt(result) == -1){

         var prescriptionSettingData = {};
         prescriptionSettingData.diseaseID = $scope.diagnosisData.diseaseID;
         prescriptionSettingData.diseaseName = $scope.diagnosisData.diseaseName;
         prescriptionSettingData.doctorID = $scope.doctorData.doctorID;

         var modalInstance = $modal.open({
         templateUrl: 'javascript/templates/prescription/prescriptionSetting.html',
         windowClass: 'fade in',
         controller: 'PrescriptionController.PrescriptionSettingController',
         resolve: {
         data: function () {
         return {
         prescriptionSettingData
         };
         }
         },
         backdrop: 'static'
         });
         modalInstance.result.then(function(result) {
         $scope.printPreview();
         });


         }else{
         $scope.printPreview();
         }
         });

         }else{
         $scope.printPreview();
         }*/
    };
    $scope.noteModal = function () {
        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/note/noteModal.html',
            windowClass: 'fade in',
            controller: 'PrescribeNoteController',
            size: 'sm',
            resolve: {
                appointmentData: function () {
                    return $scope.appoinmentData;
                }
            },
            backdrop: 'static'
        });
        modalInstance.result.then(function(result) {
            $scope.bringPrescribedInv($scope.appoinmentData.appointmentID);
        });
    };

    $scope.invModal = function () {

        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/inv/invModal.html',
            windowClass: 'fade in',
            controller: 'PrescribeInvController',
            size: 'lg',
            resolve: {
                appointmentData: function () {
                    return $scope.appoinmentData;
                }
            },
            backdrop: 'static'
        });
        modalInstance.result.then(function(result) {
            $scope.bringPrescribedInv($scope.appoinmentData.appointmentID);
        });
    };

    $scope.adviceModal = function () {
        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/advice/adviceModal.html',
            windowClass: 'fade in',
            controller: 'PrescribeAdviceController',
            size: 'lg',
            resolve: {
                appointmentData: function () {
                    return $scope.appoinmentData;
                },
                doctorData: function () {
                    return $scope.doctorData;
                }
            },
            backdrop: 'static'
        });
        modalInstance.result.then(function(result) {
            $scope.bringPrescribedAdvice($scope.appoinmentData.appointmentID);
        });
    };

    $scope.addVital = function () {
        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/prescription/vitalModal.html',
            windowClass: 'fade in',
            controller: 'PrescribeVitalController',
            size: 'lg',
            resolve: {
                appointmentData: function () {
                    return $scope.appoinmentData;
                }
            },
            backdrop: 'static'
        });
        modalInstance.result.then(function(result) {
            $scope.bringPrescribedVital($scope.appoinmentData.appointmentID);
        });
    };

    $scope.historyModal = function () {
        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/history/pastHistory.html',
            windowClass: 'fade in',
            controller: 'PastHistoryController',
            size: 'lg',
            resolve: {
                doctorData: function () {
                    return $scope.doctorData;
                },
                appointmentData: function () {
                    return $scope.appoinmentData;
                }
            },
            backdrop: 'static'
        });
        modalInstance.result.then(function(result) {
            $scope.bringPrescribedHistory($scope.appoinmentData.appointmentID, $scope.appoinmentData.patientID);
            $scope.bringPrescribedPastHistory($scope.appoinmentData.appointmentID);
            $scope.bringPrescribedFamilyHistory($scope.appoinmentData.appointmentID);
            $scope.bringPrescribedDrugHistory($scope.appoinmentData.appointmentID);
        });
    };

    $scope.addComplain = function(){
        var complainData ={};
        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/complain/complain.html',
            windowClass: 'center-modal',
            controller: 'PrescriptionController.PrescribeComplainController',
            resolve: {
                complainData: function () {
                    return complainData;
                },
                appointmentID: function () {
                    return $scope.appoinmentData.appointmentID;
                }
            },
            backdrop: 'static'
        });
        modalInstance.result.then(function(result) {
            $scope.bringPrescribedComplain($scope.appoinmentData.appointmentID);
        });
    };

    $scope.editPatientInfo = function () {
        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/appointment/addNewPatient.html',
            windowClass: 'center-modal',
            controller: 'PrescriptionController.UpdatePatientInfoController',
            resolve: {
                patientData: function () {
                    return $scope.patientData;
                }
            },
            backdrop: 'static'
        });
        modalInstance.result.then(function(result) {
            $scope.bringPatientInfo();
        });
    };

    $scope.editComplain = function (complainData){
        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/complain/complain.html',
            windowClass: 'fade in',
            controller: 'PrescriptionController.PrescribeComplainController',
            resolve: {
                complainData: function () {
                    return complainData;
                },
                appointmentID: function () {
                    return $scope.appoinmentData.appointmentID;
                }
            },
            backdrop: 'static'
        });
        modalInstance.result.then(function(result) {
            $scope.bringPrescribedComplain($scope.appoinmentData.appointmentID);
        });
    };

    $scope.addDrugsToPrescription = function(){
        var drugData = {};
        drugData.presNum = $scope.prescribedDrugList.length + 1;
        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/drugs/drugModalNew.html',
            windowClass: 'fade in',
            controller: 'PrescriptionController.PrescribeDrugsController',
            resolve: {
                drugData: function () {
                    return drugData;
                },
                appointmentData: function () {
                    return $scope.appoinmentData;
                }
            },
            backdrop: 'static'
        });
        modalInstance.result.then(function(result) {
            $scope.bringPrescribedDrugs($scope.appoinmentData.appointmentID);
        });

    };

    $scope.editDrugsFromPresciption = function(drugDataDB){

        var drugData = {};

        drugData = drugDataDB;

        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/drugs/drugModalNew.html',
            windowClass: 'fade in',
            controller: 'PrescriptionController.PrescribeDrugsController',
            resolve: {
                drugData: function () {
                    return drugData;
                },
                appointmentData: function () {
                    return $scope.appoinmentData;
                }
            },
            backdrop: 'static'
        });
        modalInstance.result.then(function(result) {
            $scope.bringPrescribedDrugs($scope.appoinmentData.appointmentID);
        });

    };

    $scope.deletePrescribedDrug = function(drugPrescribeID){
        PrescriptionService.deletePrescribedDrug.remove({drugPrescribeID: drugPrescribeID}).$promise.then(function (result) {
            $scope.bringPrescribedDrugs($scope.appoinmentData.appointmentID);
        });
    };


    $scope.printPreview = function (){
        $window.open("http://localhost/doc_feed_php_api/api/reportHelper.php?appointmentID="+ $scope.appoinmentData.appointmentID+"&XDEBUG_SESSION_START=ECLIPSE_DBGP&KEY=16071395666061", '_blank');
        /*if(!$rootScope.defaultPdf){
            var dataString = "query=20" + '&doctorID=' + $scope.doctorData.doctorID;

            PrescriptionService.getContentDetailByDocId.query({}, dataString).$promise.then(function (result) {
                if (result && result.success) {
                    if(result && result.length > 1){
                        var modalInstance = $modal.open({
                            templateUrl: 'resources/javascript/templates/prescription/pdfSelection.html',
                            windowClass: 'fade in',
                            controller: 'PrescriptionController.PdfSelectionController',
                            resolve: {
                                modalConfig: function () {
                                    return result;
                                }
                            },
                            backdrop: 'static'
                        });
                        modalInstance.result.then(function(modalResult) {
                            $rootScope.defaultPdf = modalResult.code;
                            $scope.openPdf(modalResult.code);
                        });

                    }else if(result && result.length == 1) {
                        $rootScope.defaultPdf = result[0].code;
                        $scope.openPdf(result[0].code);
                    }else{
                        $rootScope.defaultPdf = "default";
                        $scope.openPdf("default");
                    }
                } else {

                }
            });
        }else {
            $scope.openPdf($rootScope.defaultPdf);
        }*/
    };

    $scope.openPdf = function(pdf){
        var dataString = "query=15";
        $window.open("http://localhost/doc_feed_php_api/api/reportHelper.php?appointmentID=16&XDEBUG_SESSION_START=ECLIPSE_DBGP&KEY=16071395666061", '_blank');
        /*PrescriptionService.updateAppoinmentStatusByApointmentNo.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $window.open("http://localhost/doc_feed_php_api/api/reportHelper.php?appointmentID=16&XDEBUG_SESSION_START=ECLIPSE_DBGP&KEY=16071395666061", '_blank');
                $location.path("/appointment");
            } else {

            }
        });*/
    };

    $scope.performDiagnosis = function () {

        if($scope.diagnosisData == null){
            $scope.diagnosisData = {};
            $scope.diagnosisData.appointmentID = $scope.appoinmentData.appointmentID;
        }
        var diagnosisData = {};
        angular.copy($scope.diagnosisData, diagnosisData);
        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/diagnosis/diagnosis.html',
            windowClass: 'fade in',
            size: 'sm',
            controller: 'PrescriptionController.PrescribeDiagnosisController',
            resolve: {
                diagnosisData: function () {
                    return diagnosisData;
                }
            },
            backdrop: 'static'
        });
        modalInstance.result.then(function(result) {
            $scope.bringAppointmentDetail();
        });
    };

    $scope.performDiet = function () {

        if($scope.dietData == null){
            $scope.dietData = {};
            $scope.dietData.appointmentID = $scope.appoinmentData.appointmentID;
        }
        var dietData = {};
        angular.copy($scope.dietData, dietData);

        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/diet/diet.html',
            windowClass: 'fade in',
            size: 'sm',
            controller: 'PrescriptionController.PrescribeDietController',
            resolve: {
                dietData: function () {
                    return dietData;
                }
            },
            backdrop: 'static'
        });
        modalInstance.result.then(function(result) {
            $scope.bringDietInfo($scope.appoinmentData.appointmentID);
        });
    };

    $scope.patientInfoEdit = false;


    $scope.cancelPatientInfo = function(){
        $scope.patientInfoEdit = false;
    };

    $scope.inIt = function (){
        $scope.bringAppointmentInfo();
    };

    $scope.inIt();


});

app.controller('PrescriptionController.UpdatePatientInfoController', function($scope, $modalInstance, patientData, PatientService) {

    $scope.patientData = {};
    $scope.patientData = patientData;
    $scope.error = false;
    $scope.errorMessage = "";
    patientData.dob = true;


    $scope.save = function (){
        if(validator.validateForm("#validateReq","#lblMsg_modal",null)) {
            delete $scope.patientData.dob;
            PatientService.update.query({}, $scope.patientData).$promise.then(function (result) {
                $modalInstance.close(true);
            });
        }else{
            $scope.error = true;
        }
    };

    $scope.cancel = function (){
        $modalInstance.dismiss('cancel');
    };
});