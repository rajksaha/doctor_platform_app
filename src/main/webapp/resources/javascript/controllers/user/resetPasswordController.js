app.controller('ResetPasswordController', function($scope, $state, $stateParams, $http, $timeout, $location,UserSetupService) {


    delete httpHeaders.common.Authorization;

    if($stateParams.key == undefined || $stateParams.key == null){
        $state.go('root.login');
    }else{
        $scope.key = $stateParams.key;
        //$scope.init();
    }


    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.username = "";


    $scope.updatePassword = function(){
        if(validator.validateForm("#resetPasswordFormID", null , null)) {
            var user = {};
            user.secretKey = $scope.key;
            user.password = $scope.password;
            UserSetupService.updateUserPasswordByKey.query({}, user).$promise.then(function(result) {
                if(result.hasError){
                    $scope.showErrorMessage(result.message);
                }else{
                    $state.go('login');
                }
            });
        }
    };

    $scope.cancel = function(){
        $state.go('login');
    };


    $scope.showErrorMessage = function(message){
        $scope.hasError = true;
        $scope.hasSuccess = false;
        $scope.message = message;
    };

    $scope.showSuccessMessage = function(message){
        $scope.hasError = false;
        $scope.hasSuccess = true;
        $scope.message = message;
    };

    $scope.hideMessage = function(){
        $scope.hasError = false;
        $scope.hasSuccess = false;
        $('.validationErrMsg').addClass('hidden');
        $('.form-group').removeClass('has-error');
    };

});
