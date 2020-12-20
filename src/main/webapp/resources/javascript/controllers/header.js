/**
 * Created by raj on 1/6/16.
 */
app.controller('HeaderController', function($scope, $rootScope,$state, $location, $timeout, $modal, $http, AuthenticationService, UserSetupService) {

    $scope.dateString = new Date();
    $rootScope.baseApiUrl = 'http://localhost:8080/api/rest';
    $scope.logout = function () {
        AuthenticationService.logout().then(function() {
            $rootScope.userData = {};
            $location.path('/login');
            $scope.$emit('event:clearStatus');
        });
    };

    $scope.goUserHome = function () {
        $state.go('root.userHome');
    };

    $scope.toggoleButton = function () {
        $state.go('root.appointment');
    };
    $scope.changePassword = function(userData){


        var modalInstance = $modal.open({
            templateUrl: 'resources/javascript/templates/user/changePasswordModal.html',
            controller: 'ChangePasswordModal',
            backdrop: "static",
            windowClass: 'fade in ',
            resolve: {
                modalConfig: function () {
                    return userData;
                }
            }
        });

        modalInstance.result.then(function(result) {
            $scope.hasError = false;
            $scope.hasSuccess = true;
            $scope.message = result;
        });

    };


    $scope.home = function () {

        $location.path('/home');
        $scope.$emit('event:clearStatus');
    };


    $rootScope.$on('event:logout', function() {
        $scope.logout();
    });

});

app.controller('ChangePasswordModal', function($scope, $modalInstance, $timeout, $filter, $rootScope, modalConfig, UserSetupService) {

    $scope.userData = modalConfig;



    $scope.save = function(){

        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {

            var userData = {};
            userData.password = $scope.password;
            userData.userID = $scope.userData.userID;
            UserSetupService.updateUserPassword.query({}, userData).$promise.then(function(result) {
                if(result && result.success) {

                    $modalInstance.close("Password changed Successfully");
                } else {
                }
            });
        }
    };
    $scope.cancel = function (){
        $modalInstance.dismiss('cancel');
    };


});