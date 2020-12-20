app.controller('ForgetPasswordController', function($scope, $state, $http, $timeout, $location,UserSetupService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.username = "";
    delete httpHeaders.common.Authorization;

    $scope.sendResetPasswordMail = function(){
        if(validator.validateForm("#resetPasswordFormID", null , null)) {
            var user = {};user.userName = $scope.userName;
            UserSetupService.sendResetPasswordMail.query({}, user).$promise.then(function(result) {
                if(result.hasError){
                    $scope.showErrorMessage(result.message);
                }else{
                    $scope.showSuccessMessage(result.message);
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

    $scope.reset = function(){
        $scope.role = {};
        $scope.hideMessage();
    };
});
