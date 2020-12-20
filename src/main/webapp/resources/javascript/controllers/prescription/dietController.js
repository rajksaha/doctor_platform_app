app.controller('PrescriptionController.PrescribeDietController', function($scope, $http, $modalInstance, limitToFilter, $filter, dietData, PresSaveService) {

    $scope.dietData = dietData;

    $scope.save = function(){
        if(validator.validateForm("#validateReq","#lblMsg_modal",null)) {
            PresSaveService.saveDiet.query({},  $scope.dietData).$promise.then(function(result) {
                $modalInstance.close(true);
            });
        }else{
            $scope.error = true;
        }
    };

    $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
    };

    $scope.getDiet = function(term) {

        var dataString = {};
        dataString.term = term;

        return $http({
            method: 'POST',
            url: "/api/rest/autoComplete/dietSearch",
            data: dataString
        }).then(function(result) {
            $scope.dietNameData = result.data;
            return limitToFilter($scope.dietNameData, 10);
        });
    };

    $scope.onSelectDisease = function(item, model, label){
        $scope.dietData.dietName = item.name;
    };


});