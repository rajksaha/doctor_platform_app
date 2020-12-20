app.controller('PatientTypeController', function($scope, $http, $modalInstance, limitToFilter, $filter, record, PatientTypeService) {
    $scope.patientTypeList = record.data.patientTypeList;
    $scope.globalAdd = true;
    $scope.doctorTypeId = record.data.doctorTypeId;

    if(!$scope.patientTypeList || $scope.patientTypeList.length == 0){
        var emptyData = {};
        emptyData.editMode = true;
        $scope.patientTypeList.push(emptyData);
        $scope.globalAdd = false;
    }

    $scope.itemSave = function (patientType) {
        if(!patientType.typeName){
            $scope.error = true;
            $scope.errorMessage = "Please write a name";
            return false;
        }
        var query = 1;
        if(patientType.id){
            query = 2;
        }
        var dataString = "query="+ query + '&doctorType=' + $scope.doctorTypeId + "&name=" + patientType.typeName + "&id=" + patientType.id;
        
        PatientTypeService.createAndupdatePatientType.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                patientType.editMode = false;
                if (!patientType.id) {
                    patientType.id = result;
                }
                $scope.globalAdd = true;
                $scope.error = false;
            } else {

            }
        });
    };

    $scope.deletePatientType = function (patientTypeId, index) {

        var dataString = "query="+ 3  +"&id=" + patientTypeId;
        
        PatientTypeService.delPatientType.query({}, dataString).$promise.then(function (result) {
            if (result && result.success) {
                $scope.patientTypeList.splice(index, 1);
            } else {

            }
        });
    };

    $scope.add = function () {
        var emptyData = {};
        emptyData.editMode = true;
        $scope.patientTypeList.push(emptyData);
        $scope.globalAdd = false;
    };

    $scope.cancel = function () {

        if(!$scope.globalAdd){
            $scope.patientTypeList.splice($scope.patientTypeList.length - 1, 1);
        }
        $modalInstance.close($scope.patientTypeList);
    };
});