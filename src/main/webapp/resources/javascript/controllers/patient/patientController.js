app.controller('PatientController', function($scope, $http, $modal, $rootScope, limitToFilter, $location, $filter, $window, PatientService) {
	
	$scope.numberOfAppointment = 0;
 	$scope.limit = 10;
	$scope.nextDate = "";	
 	$scope.addMoreToLimit = 10;
 	$scope.appointmentList = [];
 	$scope.doctorData = {};
 	$scope.followUpSearch = false;
 	$scope.patientName = "";
 	$scope.addAppointMentData = {};
 
 	$scope.numberOfPatient = 0;	
 	$scope.patientList = [];
	
	$scope.numberOfAppointedPatient = 0;	
 	$scope.appointmentNextList = [];
	
	
	$scope.bringAllNextAppointedPatient = function (){
		var today = new Date();
		var dd = today.getDate()+1;
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();		
		if(dd<10) 		dd = '0'+dd;
		if(mm<10)		mm = '0'+mm;

        $scope.nextDate = yyyy + '-' + mm + '-' + dd;
        var filteredDate = $filter('date')( $scope.nextDate, "yyyy-MM-dd");		
        var  dataString='filteredDate='+  filteredDate +'&query='+11;
        
        PatientService.getNextAppointedPatient.query({}, dataString).$promise.then(function(result) {
            if (result && result.success) {
                $scope.appointmentNextList = result;
                $scope.numberOfAppointedPatient = $scope.appointmentNextList.length;
            }else{
    
            }
        });
    };



	$scope.bringByDatesing = function (appointmentDatesingle){
        var filteredDate = $filter('date')(appointmentDatesingle, "yyyy-MM-dd");
        var  dataString='filteredDate='+  filteredDate +'&query='+1;
        
        PatientService.getAppoinmentByDatesing.query({}, dataString).$promise.then(function(result) {
            if (result && result.success) {
                $scope.appointmentList = result;
                $scope.numberOfAppointment = $scope.appointmentList.length;
            }else{
    
            }
        });
    };


    $scope.bringByDisease = function (disease){
        var  dataString='filteredDate='+ disease +'&query='+981;
        
        PatientService.getAppoinmentByDisease.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.appointmentList = result;
                $scope.numberOfAppointment = $scope.appointmentList.length;

                $scope.patientList = result;
                $scope.numberOfPatient = $scope.patientList.length;
                return limitToFilter($scope.patientCode, 10);
            } else {

            }
        });
    };


    $scope.bringByDiseaseShow = function(term) {
        var  dataString='data='+  term +'&query='+77;
        return $http({
            method: 'POST',
            url: "rest/autoComplete/appointment",
            data: dataString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(result) {
            $scope.patients = result.data;
            return limitToFilter($scope.patients, 10);
        });
        // return $scope.products;
    };


 	$scope.BringByPatientID = function(term) {
        var  dataString='data='+  term +'&query='+68;
        return $http({
            method: 'POST',
            url: "rest/autoComplete/appointment",
            data: dataString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(result) {
            $scope.patients = result.data;
            return limitToFilter($scope.patients, 10);
        });
        // return $scope.products;
    };

    $scope.bringByPatientAddd = function (pCode){
        var  dataString='filteredDate='+ pCode +'&query='+888;
        
        PatientService.getAppoinmentByPatient.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.appointmentList = result;
                $scope.numberOfAppointment = $scope.appointmentList.length;
            return limitToFilter($scope.patientCode, 10);
            } else {

            }
        });
    };


    $scope.bringShowDname = function(term) {
        var  dataString='data='+  term +'&query='+75;
        return $http({
            method: 'POST',
            url: "rest/autoComplete/appointment",
            data: dataString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(result) {
            $scope.patients = result.data;
            return limitToFilter($scope.patients, 10);
        });
        // return $scope.products;
    };
	
	$scope.bringShowType = function(term) {
        var  dataString='data='+  term +'&query='+12;
        return $http({
            method: 'POST',
            url: "rest/autoComplete/appointment",
            data: dataString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(result) {
            $scope.patients = result.data;
            return limitToFilter($scope.patients, 10);
        });
        // return $scope.products;
    };
	

	$scope.bringByPatientType = function (name){
        var  dataString='filteredDate='+ $.trim(name) +'&query='+13;
        
        PatientService.getAppoinmentByPatientType.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.patientList = result;
                $scope.numberOfPatient = $scope.patientList.length;
			    return limitToFilter($scope.patientCode, 10);
            } else {

            }
        });
    };
	


    $scope.bringByPatientName = function (name){
        var  dataString='filteredDate='+ name +'&query='+999;
        
        PatientService.getDrugsAppoinment.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.appointmentList = result;
                $scope.numberOfAppointment = $scope.appointmentList.length;

                $scope.patientList = result;
                $scope.numberOfPatient = $scope.patientList.length;

                return limitToFilter($scope.patientCode, 10);
            } else {

            }
        });
    };

		$scope.bringAllPatient = function(){
        var  dataString='query=14';
        
        PatientService.getPatientOfAllType.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.appointmentList = result;
                $scope.numberOfAppointment = $scope.appointmentList.length;

                $scope.patientList = result;
                $scope.numberOfPatient = $scope.patientList.length;

                return limitToFilter($scope.patientCode, 10);
            } else {

            }
        });
    };

    $scope.bringByDate = function (appointmentDate, end){
    	var filteredDate = $filter('date')(appointmentDate, "yyyy-MM-dd");
    	var endDate = $filter('date')(end, "yyyy-MM-dd");
    	var  dataString='filteredDate='+  filteredDate +'&endDate=' + endDate +'&query='+99;
        
        PatientService.getPatientOfAllType.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.appointmentList = result;
        	    $scope.numberOfAppointment = $scope.appointmentList.length;
            } else {

            }
        });
    };
    
    $scope.printPreview = function (appointmentData){
    	var  dataString = 'patientCode='+ appointmentData.patientCode  +'&patientID='+ appointmentData.patientID +'&appointmentID='+ appointmentData.appointmentID +'&query='+18;
        
        PatientService.printAppoinment.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $window.open("mpdf/" + $scope.doctorData.pdfPage + ".php", '_blank');
            } else {

            }
        });   	
    };
    
    $scope.addINAppointment  = function (patientCode){   	 
    	 var currentDate = new Date();
      	 var filteredDate = $filter('date')(currentDate, "yyyy-MM-dd");   	 
     	 var  dataString='doctorCode='+ $scope.doctorData.doctorCode +'&patientCode='+ patientCode +'&doctorID='+ $scope.doctorData.doctorID +'&query='+3 + '&filteredDate='+  filteredDate;
         
        PatientService.createAppoinment.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                
            } else {
                
            }
        });
    };
    
     
     $scope.bringDoctorInfo = function (){     	
         var dataString = "query=0";
         
         PatientService.getInformationDoctor.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.doctorData = result;
         	    $rootScope.doctorData = $scope.doctorData;
            } else {
                location.path("/login");
            }
        });
     };

	(function(){
		$scope.bringDoctorInfo();
		$scope.bringAllNextAppointedPatient();
    })()
	
});