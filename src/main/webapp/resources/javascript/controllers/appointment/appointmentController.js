app.controller('AppointmentController', function($scope, $state, $modal, $rootScope, limitToFilter, $location, $filter, AppointmentService) {
	
	$scope.numberOfAppointment = 0;
 	$scope.limit = 10;
 	$scope.addMoreToLimit = 10;
 	$scope.appointmentList = [];
 	$scope.followUpSearch = false;
 	$scope.patientName = "";
 	$scope.addAppointMentData = {};
    $scope.appointmentSearch = "";
 	

 	$scope.changePage = function (page) {
         if(page == 3){
            $location.path("/researchHome");
        }else if(page == 4){
            $location.path("/settingSelection");
        }
    };

    $scope.renderGraph = function (result, container) {

        var chart = new CanvasJS.Chart(container, {
            title: {
                text: "Daily Patient History"
            },
            data: [{
                type: "pie",
                startAngle: 45,
                showInLegend: "true",
                legendText: "{label}",
                indexLabel: "{label} ({y})",
                dataPoints: [
                    { label: "Old Patient", y: result.oldPatient },
                    { label: "New Patient", y: result.newPatient },
                    { label: "Report", y: result.freePatient },
                    { label: "Free", y: result.relative },
                    { label: "Others", y: result.report }
                ]
            }]
        });
        chart.render();
    };

    $scope.initiateDashboard = function () {

        AppointmentService.getDoctorDashboard.query({}, {}).$promise.then(function(result) {
            if (result) {
                var chart = new CanvasJS.Chart("chartContainer1", {
                    title: {
                        text: "Daily Patient History"
                    },
                    data: [{
                        type: "pie",
                        startAngle: 45,
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabel: "{label} ({y})",
                        dataPoints: [
                            { label: "Old Patient", y: result.numOfOldPatient },
                            { label: "New Patient", y: result.numOfNewPatient },
                            { label: "Report", y: result.numOfReportPatient },
                            { label: "Free", y: result.numOfFreePatient }/*,
                            { label: "Relative", y: result.numOfFreePatient }*/
                        ]
                    }]
                });
                chart.render();
    
                var chart2 = new CanvasJS.Chart("chartContainer2", {
                    title: {
                        text: "By Gender"
                    },
                    data: [{
                        type: "column",
                        dataPoints: [
                            { label: "Male",  y: result.numOfMalePatient  },
                            { label: "Female", y: result.numOfFemalePatient  }
                        ]
                    }]
                });
                chart2.render();
            }else{
                $location.path("/login");  
            }
        });
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

	 $scope.searchAppointment = function (){
        var $rows = $('.panelChild>.ng-scope');
        var val = $.trim($('#searcheString').val()).replace(/ +/g, ' ').toLowerCase();
        $rows.show().filter(function() {
            var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
            return !~text.indexOf(val);
        }).hide();
    };

    $scope.bringAppointment = function (){
    	
    	$scope.followUpSearch = false;
    	$scope.patientName = "";
    	$scope.addByName = false;
        AppointmentService.getByParam.query({}, {}).$promise.then(function(result) {
            if(result.length > 0){
                $scope.appointmentList = result;
                $scope.numberOfAppointment = $scope.appointmentList.length;
            }
        });
    };
    
    $scope.addNewAppointment = function () {
    	var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/appointment/addNewPatient.html',
            windowClass: 'fade in',
            controller: 'AppointmentController.AddNewPatientController',
            backdrop: 'static'
        });
        modalInstance.result.then(function(result) {
        	$scope.bringAppointment();
            $scope.initiateDashboard();
         });
    };

    $scope.addFollowUpAppointment = function () {
        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/appointment/addFollowUpPatient.html',
            windowClass: 'fade in',
            controller: 'AppointmentController.AddFollowUptController',
            backdrop: 'static'
        });
        modalInstance.result.then(function(result) {
            $scope.bringAppointment();
            $scope.initiateDashboard();
        });
    };
    
    $scope.showHelp = function(){    	
    	$scope.modalInstance = $modal.open({
			templateUrl: 'javascript/templates/header/helpMenuPopup.html',
            controller: 'appointmentController.InformationModalController',
            size: 'sm',
            resolve: {
            	modalConfig: function () {
            		var data = {};
            		data.title = "Help Desk";
                    return data;
                }
            }
		});
    };
    
    $scope.letsPrescribe = function (appointmentData){
        var  dataString = {};
        dataString.appointmentID = appointmentData.appointmentID;
        AppointmentService.visitPatient.query({}, dataString).$promise.then(function(result) {
            $state.go("root.prescription");
        });
    };
     $scope.removeFromAppointment = function(appointmentID){
    	 
    	 var  dataString='appointmentID='+  appointmentID +'&query='+9;

         AppointmentService.deleteAppointment.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.bringAppointment();
            } else {
            }
        });
     };
     
     $scope.removeFromAppointmentList = function(appointmentID){
    	 
    	 var  dataString='appointmentID='+  appointmentID +'&query='+10;

         AppointmentService.updateAppointment.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.bringAppointment();
            } else {
            }
        });
     };
    

	
	(function(){
    	$scope.bringAppointment();
        $scope.initiateDashboard();
    })()

	
});

app.controller('AppointmentController.InformationModalController', function($scope, $modalInstance) {
	
	$scope.title = "";
	$scope.message = "";
	
	$scope.onOkClicked = function() {
		$modalInstance.dismiss('cancel');
	};
	
	(function() {
		
		$scope.title = "Information";
		
		//$scope.message = modalConfig.message;
		
	})();
	
});

app.controller('AppointmentController.AddNewPatientController', function($scope, $modalInstance, AppointmentService) {
	
	$scope.patientData = {};
	$scope.error = false;
	$scope.errorMessage = "";
	$scope.patientData.sex = "MALE";
    $scope.patientData.occupation = "NA";

	$scope.save = function (){
		if(validator.validateForm("#validateReq","#lblMsg_modal",null)) {
            delete $scope.patientData.dob;
            var appViewData = {};
            appViewData.patient = $scope.patientData;

            AppointmentService.createAppForNewPatient.save({}, appViewData).$promise.then(function(result) {
                if(result && result.success) {
                    $modalInstance.close(result);
                }
            });
		}else{
			$scope.error = true;
		}
    };
	
	$scope.cancel = function (){
		$modalInstance.dismiss('cancel');
	};
});

app.controller('AppointmentController.AddFollowUptController', function($scope, $modalInstance, AppointmentService, limitToFilter) {

    $scope.patientData = {};
    $scope.appointmentViewData = {};
    $scope.error = false;
    $scope.errorMessage = "";

    $scope.getPatients = function(term, type) {

        var entityType = type == 0 ? 'likePatientCode' : type == 1 ? 'likePatientName' : 'likeContactNo';
        var  searchData = {};
        searchData.entityType = entityType;
        searchData.term = term;

        return AppointmentService.patientSearch.query({}, searchData).$promise.then(function(result) {
            $scope.patients = result;
            return limitToFilter($scope.patients, 10);
        });
    };

    $scope.populatePatientInfo = function(item, model, label){
        $scope.appointmentViewData.patientID = item.patientID;
        $scope.patientData = item;
        $scope.patientData.dob = true;
        $scope.isSelected = true;
    };
    $scope.save = function (){
        if(validator.validateForm("#validateReq","#lblMsg_modal",null)) {
            delete $scope.patientData.dob;
            $scope.appointmentViewData.patient = $scope.patientData;

            AppointmentService.createFollowUpApp.save({}, $scope.appointmentViewData).$promise.then(function(result) {
                if(result && result.success) {
                    $modalInstance.close(result);
                }
            });
        }else{
            $scope.error = true;
        }
    };

    $scope.cancel = function (){
        $modalInstance.dismiss('cancel');
    };
});