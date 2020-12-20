app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});

app.controller('LoginController', function($scope, $rootScope, $filter, $state, $http, $timeout, $location, ApplicationService) {

	$scope.username = "";
	$scope.password = "";
	$scope.userNotexist = false;
	$scope.passwordErr = false;
	$scope.error = false;
	$scope.errorMessage = "";
	$scope.slideImages = [];	
	var data1 = {"contentURL":'/app/resources/images/slides/slide1.jpg'};
	var data2 = {"contentURL":'/app/resources/images/slides/slide2.jpg'};
	var data3 = {"contentURL":'/app/resources/images/slides/slide3.jpg'};
	var data4 = {"contentURL":'/app/resources/images/slides/slide4.jpg'};
	var data5 = {"contentURL":'/app/resources/images/slides/slide5.jpg'};
	var data6 = {"contentURL":'/app/resources/images/slides/slide6.jpg'};
	var data7 = {"contentURL":'/app/resources/images/slides/slide7.jpg'};
	//$scope.slideImages = {"contentURL":'images/slides/slide1.jpg',"contentURL":'images/slides/slide1.jpg',"contentURL":'images/slides/slide1.jpg',"contentURL":'images/slides/slide1.jpg',"contentURL":'images/slides/slide1.jpg'};
	
	$scope.slideImages.push(data1);
	$scope.slideImages.push(data2);
	$scope.slideImages.push(data3);
	$scope.slideImages.push(data4);
	$scope.slideImages.push(data5);
	$scope.slideImages.push(data6);
	$scope.slideImages.push(data7);
	
	$timeout(function() {
		angular.element('#slides').superslides({
			play: 5000,
			animation: 'fade',
			pagination: true
		});
    }, 100);


    $scope.credentials = {};
    $scope.login = function () {
        if(validator.validateForm("#loginFormID",".validatorMsg",null)) {
            $scope.$emit('event:loginRequest', $scope.credentials.username, $scope.credentials.password, function() {
                ApplicationService.getAppData.query().$promise.then(function(result) {
                    $rootScope.userData = result.userData;
                    if($rootScope.userData.permissions.SUPER_ADMIN || $rootScope.userData.permissions.COMPANY_ADMIN){
                        $state.go('root.userHome');
					}else{
                        $state.go('root.appointment');
					}

                });
            });
        }

    };


    $scope.forgetPassword = function(){
        $state.go('forgetPassword');
    };

    if($rootScope.userData && $rootScope.userData.userID && $rootScope.userData.userID > 0){
        $state.go('root.appointment');
    }


    /*$scope.login = function(){

    	if($scope.username == "" && $scope.password == ""){
    		$scope.passwordErr = true;
    		$scope.userNotexist = true;
    		$scope.error = true;
    		$scope.errorMessage = "Please select a doctor code and password";
    		return false;
    	}
    	
    	if($scope.username == ""){
    		$scope.userNotexist = true;
    		$scope.error = true;
    		$scope.errorMessage = "Please select a doctor code";
    		return false;
    	}
    	
    	if($scope.password == ""){
    		$scope.passwordErr = true;
    		$scope.error = true;
    		$scope.errorMessage = "Please Provide a password";
    		return false;
    	}
    	
        var dataString = 'username='+ $scope.username +'&query='+1+'&password='+ $scope.password;
        $("#loader").addClass("loading");
        $http({
            method: 'POST',
            url: "phpServices/login/loginHelper.php",
            data: dataString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (result) {
            $("#loader").removeClass("loading");
        	if(result == -1){
        		$scope.userNotexist = true;
        		$scope.error = true;
        		$scope.errorMessage = "User dose not exist";
        		return false;
        	}else if(result == 0){
        		$scope.passwordErr = true;
        		$scope.error = true;
        		$scope.errorMessage = "Password dose not match";
        		return false;
        	}else if(result == 1){
        		$location.path("/appointment");
        	}
        });
    }*/
}); 