app.controller('AdminModuleController', function($scope, $modal, $rootScope, limitToFilter, $location, $filter, AdminModuleService) {
	
	$scope.userProfileList = [];
    
	$scope.getUserProfileList = function(){
        var dataString = "query=0";
    
        AdminModuleService.getUserProfileList.query({}, dataString).$promise.then(function(result) {
            if (result && result.success) {
                $scope.userProfileList = result;
            }else{
    
            }
        });
    };

	$scope.processEditor = function (datastring, userProfile) {

        AdminModuleService.getAppAccess.query({}, dataString).$promise.then(function(result) {
            if (result && result.success) {
                userProfile.accessList = $scope.processAccessList(result);
                var modalInstance = $modal.open({
                    templateUrl: 'javascript/templates/admin/addNewUser.html',
                    windowClass: 'fade in',
                    size: 'lg',
                    controller: 'AdminModuleController.UserProfileEditorController',
                    resolve: {
                        data: function () {
                            return {
                                userProfile
                            };
                        }
                    },
                    backdrop: 'static'
                });
                modalInstance.result.then(function(result) {
                    $scope.getUserProfileList();
                });
            }else{
    
            }
        });


    };


    $scope.addUserProfile = function(){
        var dataString = "query=5";
        var userProfile = {};
        userProfile.userID = null;
        $scope.processEditor(dataString, userProfile);
    };

    $scope.changeUserStatus = function (userProfile, status) {

        var dataString = "query=6" + "&userId=" + userProfile.userID + '&activeStatus=' + status ;

        AdminModuleService.updateUserStatus.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                userProfile.isActive = status;  
            } else {
            }
        });
    };

    $scope.editUser = function(user){
        var dataString = "query=1&userId="+user.userID;
        $scope.processEditor(dataString, user);
    };

    $scope.processAccessList = function (accessList) {
        var reDesignedAccessList = [];
        angular.forEach(accessList, function(value, key) {
            if(value.accessType == 'MAIN'){
                value.subAccessList = $filter('filter')(accessList, {parentAccessID: value.accessID}, true);
                reDesignedAccessList.push(value);
            }
        });
        return reDesignedAccessList;
    };




	$scope.inIt = function (){
		$scope.getUserProfileList();
		
	};
	
	(function(){
		$scope.inIt();
    })()

	
});


app.controller('AdminModuleController.UserProfileEditorController', function($scope, $modalInstance, data, AdminModuleService) {

    $scope.userProfile = data.userProfile;
    $scope.error = false;
    $scope.errorMessage = "";

    $scope.changeStatus = function (item) {

        if(item.haveAccess == 0){
            item.haveAccess = 1;
        }else{
            item.haveAccess = 0;
        }
    };

    $scope.save = function (){
        if(validator.validateForm("#validateReq","#lblMsg_modal",null)) {
            AdminModuleService.manegeUserProfile.query({}, $scope.userProfile).$promise.then(function(result) {
                if (result && result.success) {
                    if(data.trim() == '-1'){
                        $scope.error = true;
                        $scope.errorMessage = "Login name already exist, please select another login name";
                    }else{
                        $modalInstance.close(null);
                    }
                }else{
        
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