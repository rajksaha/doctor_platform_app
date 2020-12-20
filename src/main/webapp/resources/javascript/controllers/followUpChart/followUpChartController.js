app.controller('FollowUpChartController', function($scope, $http, $modal, $rootScope, limitToFilter, $location, $filter, FollowUpChartService) {
	
	$scope.invNameData = [];
	$scope.invData = {};
	$scope.invFollowUpChart = [];
	$scope.followUpChartData = [];
	$scope.recentStart = 0;
	$scope.recentEnd = 0;
	$scope.patientAppoinmentList = [];
	
	$scope.typeHeadSelected = false;


	
    $scope.bringFollowUpChart = function () {


        var dataString = "query=3";

        FollowUpChartService.getFollowUpChartList.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.uniqueDateList = result;

                angular.forEach($scope.uniqueDateList, function (uniqueApp, key) {
                    uniqueApp.followUpDataList = [];
                    var filteredDate = $filter('date')(uniqueApp.entryDate, "yyyy-MM-dd");
                    angular.forEach($scope.patientFollowUpList, function (value, key) {
                        var dataString = "query=2" +
                            "&patientFollowUpID=" + value.followUpSerttingID +
                            "&appID=" + uniqueApp.appID +
                            "&invID=" + value.invID +
                            "&entryDate=" + filteredDate;

                        FollowUpChartService.getListFromFollowUPResult.query({}, dataString).$promise.then(function (result) {
                            if (result && result.success) {
                                if (result && result.length > 0) {
                                    uniqueApp.followUpDataList.push(result[0]);
                                }
                            } else {

                            }
                        });
                    });
                });
            } else {

            }
        });
    };

    $scope.getFollowupResult = function (date, reportList) {
        if(reportList.data){
            return reportList.data;
        }


          return "";
      };

    $scope.addToPrescription = function (uDate, uniqueDate) {
        var result = "";
        var filteredDate = $filter('date')(uDate.entryDate, "yyyy-MM-dd");
        var jsonArray = [];
        angular.forEach(uniqueDate.followUpDataList, function(value, key) {
            if(value.data != ''){
                //checking list empty value
                console.log(value.name + " --- " + value.data);
                var jsonItem = {data : value.name + "-" + value.data};
                jsonArray.push(jsonItem);

            }
        });

        var dataString = 'query=5'+ '&jsonArray=' + JSON.stringify(jsonArray) + "&entryDate=" + filteredDate ;

        FollowUpChartService.addToContentDetail.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                uDate.addedToPrescription = true;
            } else {

            }
        });

    };

    $scope.editFinding = function (uDate, patientFollowUpList) {

        var followUp = {};
        followUp.entryDate = uDate.entryDate;
        followUp.followUpList = [];
        angular.forEach(patientFollowUpList, function(value, key) {
            var data = null;
            angular.forEach(value.invReportList, function(inv, key) {
                if(inv.entryDate == uDate.entryDate){
                    data = inv.data
                }
            });
            var jsonItem = {invName : value.invName, data: data, patientFollowUpID : value.followUpSerttingID};
            followUp.followUpList.push(jsonItem);
        });
        var modalInstance = $modal.open({
            templateUrl: 'javascript/templates/followUpChart/followUpSetupModal.html',
            windowClass: 'fade in',
            controller: 'PatientFollowUPController',
            resolve: {
                modalConfig: function () {
                    return followUp;
                }
            },
            backdrop: 'static'
        });
        modalInstance.result.then(function(result) {
            $scope.init();
        });
    };

	  $scope.addFollowUp = function () {

          var followUp = {};
          followUp.followUpList = [];
          angular.forEach($scope.patientFollowUpList, function(value, key) {
              var jsonItem = {invName : value.invName, patientFollowUpID : value.followUpSerttingID};
              followUp.followUpList.push(jsonItem);
          });

          var modalInstance = $modal.open({
              templateUrl: 'javascript/templates/followUpChart/followUpSetupModal.html',
              windowClass: 'fade in',
              controller: 'PatientFollowUPController',
              resolve: {
                  modalConfig: function () {
                      return followUp;
                  }
              },
              backdrop: 'static'
          });
          modalInstance.result.then(function(result) {
              $scope.init();
          });
      };

	  $scope.save  = function () {

          if(validator.validateForm("#validateReq","#lblMsg_modal",null)) {


              var followUpAdder = [];
              /*var filteredDate = $filter('date')($scope.uniqueDateList[0].entryDate, "yyyy-MM-dd");
              angular.forEach($scope.patientFollowUpList, function(value, key) {
                  if(value.editMode){
                      var temp = {followUpID : value.invReportList[0].followUpID, data : value.invReportList[0].data, entryDate : filteredDate};
                      followUpAdder.push(temp);
                  }
              });*/

              var dataString = 'query=4'+ '&jsonString=' + JSON.stringify($scope.uniqueDateList[0]);

              FollowUpChartService.createFollowUpResult.query({}, dataString).$promise.then(function (result) {
                  if (result && result.success) {
                      //$scope.init();
                      console.log(result);
                  } else {
                  }
              });
          }

      };
	    
	    $scope.displayStatus = function (invData, index){

	    	var maxIndex = 3;
	    	if(invData.maxLength){
	    		maxIndex = invData.maxLength;
	    	}else{
	    		invData.minLength = 0;
	    	}
	    	if(invData.minLength <= index && index <= maxIndex){
	    		return true;
	    	}else{
	    		return false;
	    	}
	    };
	    
	    $scope.progressFlow = function (invData,increment){
	    	
	    	if(increment){
	    		if(invData.maxLength){
	    			invData.maxLength = invData.maxLength + 1;
	    			invData.minLength = invData.minLength + 1;
	    		}else{
	    			invData.maxLength = 4;
	    			invData.minLength = invData.minLength + 1;
	    		}
	    		invData.needPrevious  = true;
	    		
	    		
	    	}else{
	    		invData.maxLength = invData.maxLength - 1;
	    		invData.minLength = invData.minLength - 1;
	    		if(invData.minLength == 0){
	    			invData.needPrevious = false;
	    		}
	    	}
	    	
	    	if((invData.invReportList.length -1) == invData.maxLength){
	    		invData.noNeedNext = true;
	    	}else{
	    		invData.noNeedNext = false;
	    	}
	    	
	    	
	    };

	
	
	$scope.addFollowUpINV = function () {

        var modalInstance = $modal.open({
            templateUrl: 'javascript/templates/followUpChart/invSelectorModal.html',
            windowClass: 'fade in',
            controller: 'InvSelectorController',
            resolve: {
                record: function () {
                    return {
                    };
                }
            },
            backdrop: 'static'
        });
        modalInstance.result.then(function(result) {
            $scope.init();
        });
    };

	$scope.init = function (){


		var dataString = "query=0";

        FollowUpChartService.getDoctorFollowUpSettingsList.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.patientFollowUpList = $filter('orderBy')(result, 'invName') ;
      	        $scope.bringFollowUpChart();
            } else {
            }
        });
	};
	
	$scope.init();
	
	

	
});


app.controller('PatientFollowUPController', function($scope, $http, $modalInstance, record, $filter, FollowUpChartService) {



    $scope.followUp = {};
	$scope.followUp.entryDate = record.followUp.entryDate;
	$scope.followUp.followUpList= record.followUp.followUpList;



	$scope.save = function () {

        if($scope.followUp.entryDate) {
            var filteredDate = $filter('date')($scope.followUp.entryDate, "yyyy-MM-dd");
            var jsonArray = [];
            angular.forEach($scope.followUp.followUpList, function(value, key) {
                var jsonItem = {followUpID : value.patientFollowUpID, data: value.data, entryDate : filteredDate};
                jsonArray.push(jsonItem);
            });
            var dataString = 'query=4'+ '&jsonArray=' + JSON.stringify(jsonArray);

            FollowUpChartService.delAndcreateFollowUpResult.query({}, dataString).$promise.then(function (result) {
                if (result && result.success) {
                    $modalInstance.close();
                } else {
                }
            });
        }else{
            $scope.error = true;
            $scope.errorMessage = "Date field required"
        }

    };
    $scope.cancel = function(){
        $modalInstance.close();
    };


});

app.controller('InvSelectorController', function($scope, $http, $modalInstance, limitToFilter, FollowUpChartService) {

    $scope.invName = "";

    $scope.getInvName = function(term) {

        var dataString = 'query=0'+ '&invName=' + term;

        return $http({
            method: 'POST',
            url: "rest/autoComplete/inv",
            data: dataString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(result) {
            $scope.invNameData = result.data;
            return limitToFilter($scope.invNameData, 10);
        });


        // return $scope.products;
    };

    $scope.invData = {};
    $scope.onSelectInvName = function(item, model, label){
        $scope.invData = item;
    };

    $scope.save = function(addAnother){

        var dataString = 'query=1'+ '&invName=' + $scope.invData.name;

        FollowUpChartService.getPatientDetailSetDoctorFollowUp.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                if(addAnother){
                    $scope.invData.name = "";
                }else{
                    $modalInstance.close();
                }
            } else {
            }
        });
	};

    $scope.cancel = function(){
        $modalInstance.close();
    };


});