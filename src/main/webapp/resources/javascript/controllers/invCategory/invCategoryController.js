app.controller('InvCategoryController', function($scope, $http, $modal, $rootScope, limitToFilter, $location, InvCategoryService) {


    $scope.invCategoryList = [];
    $scope.invList = [];
    $scope.pageInfo = {};
    $scope.pageInfo.perPage = 10;
    $scope.pageInfo.from = 0;
    $scope.pageInfo.to = $scope.pageInfo.from + $scope.pageInfo.perPage;



    $scope.bringInvCategoryData = function () {
        $scope.hasError = false;
        var dataString = "query=14"+ '&perPage=' + $scope.pageInfo.perPage + '&from=' + $scope.pageInfo.from;
        $scope.pageInfo.to = parseInt($scope.pageInfo.from)  + parseInt($scope.pageInfo.perPage);

        InvCategoryService.getInvCategoryList.query({}, dataString).$promise.then(function(result) {
            if (result && result.success) {
                $scope.invList = result;
            }else{
    
            }
        });
    };
    
    $scope.save = function () {
        if(validator.validateForm("#validateReq","#lblMsg",null)) {
            var dataString = "query=16"+ '&invList=' + JSON.stringify($scope.invList);

            $scope.pageInfo.to = parseInt($scope.pageInfo.from)  + parseInt($scope.pageInfo.perPage);

            InvCategoryService.updateInvByCategoryId.query({}, dataString).$promise.then(function (result) {
                if (result && result.success) {
                    $scope.pageInfo.from += $scope.pageInfo.perPage;
                    $scope.bringInvCategoryData();
                } else {

                }
            });
        }else{
            $scope.hasError = true;
            $scope.errorMessage = "Please Select Category of each item";
        }

    };

   $scope.init = function () {


       $scope.bringInvCategoryData();
       
       var dataString = "query=15";

       InvCategoryService.getCategoryOfInv.query({}, dataString).$promise.then(function (result) {
        if (result && result.success) {
            $scope.invCategoryList = result;
        } else {

        }
    });
   };


    $scope.init();


});