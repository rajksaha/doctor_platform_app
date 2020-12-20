app.controller('HomeController', function($scope, $state, $rootScope, $modal, $http, $timeout, $location, UserSetupService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";

    $scope.changeState = function (url, claimType, actionState){
        $state.go(url);
    };

    $scope.changePassword = function(){

        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/user/changePasswordModal.html',
            controller: 'HomeController.ChangePasswordModal',
            backdrop: "static",
            windowClass: 'fade in ',
            resolve: {
                modalConfig: function () {
                    return $rootScope.userData;
                }
            }
        });

        modalInstance.result.then(function(result) {
            modalInstance.result.then(function(result) {
                if(result == 1){
                    $scope.hasError = false;
                    $scope.hasSuccess = true;
                    $scope.message = "Password changed Successfully";
                    $rootScope.userData.status = 1;
                }
            });
        });

    };

    if($rootScope.userData.status == 2){
        //Ask for password change
        $scope.changePassword($rootScope.userData);
        $rootScope.userData.status = 2;
    }


});

app.controller('HomeController.ChangePasswordModal', function($scope, $modalInstance, $timeout, $filter, $rootScope, modalConfig, UserSetupService) {

    $scope.userData = modalConfig;



    $scope.save = function(){

        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {

            var userData = {};
            userData.password = $scope.password;
            userData.userID = $scope.userData.userID;
            UserSetupService.updateUserPassword.query({}, userData).$promise.then(function(result) {
                if(result && result.success) {
                    $modalInstance.close(1);
                } else {
                }
            });
        }
    };
    $scope.cancel = function (){
        $modalInstance.close(0);
    };


});