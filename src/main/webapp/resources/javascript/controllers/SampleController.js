/**
 * Created by raj on 10/16/2020.
 */

app.controller('SampleController', function($scope, SampleService) {

    $scope.searchData = {};
    $scope.sampleID = 4;

    SampleService.getByObj.query({}, $scope.searchData).$promise.then(function(result) {
        if (result && result.success) {

        }else{

        }
    });

    SampleService.getSingleByID.query({},{sampleID : $scope.sampleID}).$promise.then(function(result) {
        $scope.sampleData = result;
    });

    SampleService.getListByID.query({},{sampleID : $scope.sampleID}).$promise.then(function(result) {
        $scope.sampleDataList = result;
    });

    SampleService.create.query({}, $scope.searchData).$promise.then(function (result) {
        if (result && result.success) {

        } else {
        }
    });

    SampleService.update.query({}, $scope.searchData).$promise.then(function (result) {
        if (result && result.success) {

        } else {
        }
    });
});