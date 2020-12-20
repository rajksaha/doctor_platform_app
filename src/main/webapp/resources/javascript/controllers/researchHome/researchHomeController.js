app.controller('ResearchHomeController', function($scope, $modal, $rootScope, limitToFilter, $location, $filter, $window, ResearchHomeService) {
	$scope.changePage = function (page) {
		$scope.selectedPage = page;
		if(page == 1){
			$scope.pageName = "All Apointment List";
		}else if(page == 2){
            $scope.pageName = "Patient List";
		}else if(page == 3){
            $scope.pageName = "Next Day's Appointment List";
        }else if(page == 4){
            $scope.pageName = "Follow-up Report";
        }
        $scope.detailView = true;
    };

    $scope.bringDoctorInfo = function (){
        var dataString = "query=2";

        ResearchHomeService.getAllAccessList.query({}, $scope.searchData).$promise.then(function(result) {
            if (result && result.success) {
                $scope.userAccessInfo = result;
                $rootScope.userAccessInfo = $scope.userAccessInfo;
            }else{
                $location.path("/login");
            }
        });
    };


    $scope.hasAccess = function(accessKey){
        if($scope.userAccessInfo){
            if($scope.userAccessInfo.userType == 'DOCTOR'){return true;}
            var temp = $filter('filter')($scope.userAccessInfo.accessList, {accessCode: accessKey}, true)[0];
            return temp == null ? false : true;
        }

    };

    $scope.hasAccessMenu = function(main){
        if($scope.userAccessInfo){
            if($scope.userAccessInfo.userType == 'DOCTOR'){return true;}
            var temp = $filter('filter')($scope.userAccessInfo.accessList, {parentAccessID: main}, true)[0];
            return temp == null ? false : true;
        }
    };

    (function(){
        $scope.bringDoctorInfo();
    })()
});