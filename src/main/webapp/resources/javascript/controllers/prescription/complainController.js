app.controller('PrescriptionController.PrescribeComplainController', function($scope, $http, $filter, $modalInstance, JsonService, complainData, appointmentID, limitToFilter, PresSaveService) {

    $scope.symptom = {};
    $scope.complainData = complainData;
    $scope.complainList = [];
    $scope.drugNumOfDayList = JsonService.fractionNumberList;
    $scope.drugDayTypeList = JsonService.dayTypeList;
    $scope.defaultNumOfDay = $scope.drugNumOfDayList[1].value;
    $scope.defaultDayType = $scope.drugDayTypeList[6].id;


    $scope.init = function(){
        if($scope.complainData != null && $scope.complainData.complainID){
            $scope.complainList.push($scope.complainData);
        }else{
            $scope.populateForAdd();
        }
    };

    $scope.populateForAdd = function (){
        $scope.complainList.push({});
        $scope.complainList.push({});
        $scope.complainList.push({});
        $scope.complainList.push({});
        angular.forEach($scope.complainList, function (value, key) {
            value.appointmentID = appointmentID;
            value.durationNum = $scope.defaultNumOfDay;
            value.durationType = $scope.defaultDayType[1];
        });
    };

    $scope.saveGroupOfComplain = function(){

        var int = 0;
        for (int; int < $scope.complainList.length; int++) {
            if($scope.complainList[int].symptomName){
                break;
            }
        }

        if(int == $scope.complainList.length){
            if($scope.complainList.length == 1){
                $scope.errorMessage = "Please Select Symptom Name";
                $scope.succcess = false;
                $scope.error = true;
            }else{
                $scope.errorMessage = "Please Select At-least One Symptom";
                $scope.succcess = false;
                $scope.error = true;
            }

        }else{
            var searchData = {};
            searchData.complainList = $scope.complainList;
            PresSaveService.saveComplain.query({}, searchData).$promise.then(function (result) {
                $modalInstance.close();
            });
        }



    };


    $scope.cancelGroupOfComplain = function(){
        $modalInstance.dismiss('cancel');
    };

    $scope.getSymptoms = function(term) {

        var data = {"term": term};

        return $http({
            method: 'POST',
            url: "/api/rest/autoComplete/complain",
            data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }).then(function(result) {
            $scope.symptoms = result.data;
            return limitToFilter($scope.symptoms, 10);
        });
    };

    $scope.init();
});