app.controller('PrescriptionController.PrescriptionSettingController', function($scope, $modalInstance, data, $http, $window, $location, PrescriptionSettingService) {

    $scope.prescriptionSettingData = data;

    $scope.savePrint = function (){


        var dataString = "query=14" + '&diseaseID=' + $scope.prescriptionSettingData.prescriptionSettingData.diseaseID + '&doctorID=' + $scope.prescriptionSettingData.prescriptionSettingData.doctorID;

        PrescriptionSettingService.getDosePeriod.query({}, dataString).$promise.then(function(result) {
            if (result && result.success) {
                $modalInstance.close();
            }else{
    
            }
        });

    };



    $scope.printOnly = function (){
        $modalInstance.close();
    };


});