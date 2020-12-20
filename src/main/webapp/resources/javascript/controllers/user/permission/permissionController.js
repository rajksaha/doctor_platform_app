/**
 * Created by raj on 5/21/2016.
 */
app.controller('PermissionController', function($scope, $rootScope, $state, $http, $timeout, $location, UserCommonService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.permission = {};
    $scope.showForm = false;
    $scope.editObj = {};


    //reloading the grid
    $scope.reloadList = false;
    $scope.refreshList = function () {
        $scope.reloadList = !$scope.reloadList;
        $scope.dataSourceConfig.params.refresh = $scope.reloadList;
    };

    $scope.searchParam = {};
    $scope.search = function() {
        $scope.dataSourceConfig.params = angular.copy($scope.searchParam);
    };


    $scope.save = function(permission) {
        $scope.hideMessage();
        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {
            $scope.populateModuleID(permission);
            UserCommonService.savePermission.query({}, permission ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information saved successfully");
                    $scope.permission = {};
                    $scope.refreshList();
                    $scope.showForm = false;
                } else {
                    $scope.showErrorMessage(result.message);
                }
            });
        }

    };

    $scope.update = function(permission){
        $scope.hideMessage();
        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {
            $scope.populateModuleID(permission);
            UserCommonService.updatePermission.query({}, permission ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information updated successfully");
                    $scope.permission = {};
                    $scope.refreshList();
                    $scope.showForm = false;
                } else {
                    $scope.showErrorMessage(result.message);
                }
            });
        }
    };

    $scope.delete = function(permission){

        UserCommonService.deletePermission.remove({permissionID : permission.permissionID} ).$promise.then(function(result) {
            $scope.refreshList();
            $scope.showSuccessMessage("Information deleted successfully");
        });
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
    };

    $scope.edit = function(permission){
        $scope.permission = {};
        angular.copy(permission, $scope.editObj);
        angular.copy(permission, $scope.permission);
        $scope.hideMessage();
        $scope.showForm = true;
    };

    $scope.reset = function(){
        angular.copy($scope.editObj, $scope.permission);
        $scope.hideMessage();
    };

    $scope.add = function(){
        $scope.editObj = {};
        $scope.reset();
        $scope.showForm = true;
    };

    $scope.cancel = function(){
        $scope.reset();
        $scope.showForm = false;
    };

    $scope.backToList = function() {
        $scope.cancel();
    };
    $scope.populateModuleID = function(permissionData){
        if(permissionData && !permissionData.companyModuleID){
            permissionData.companyModuleID = $scope.companyModuleData.companyModuleID;
        }
    };

    $scope.init = function(){
        UserCommonService.getAllCompanyModule.query({}, {} ).$promise.then(function(result) {
            $scope.companyModuleList = result;
            if($scope.companyModuleList.length == 1){
                $scope.companyModuleData = $scope.companyModuleList[0];
                //$scope.setDefinition(false);
                //$scope.refreshList();
            }
        });
    };
    //datasource configuration
    $scope.setDefinition = function (moduleColumn){
        $scope.columnDefinition = [
            {columnHeaderDisplayName: 'Permission Code', displayProperty: 'functionCode', sortKey: 'functionCode'},
            {columnHeaderDisplayName: 'Permission Name', displayProperty: 'shortName', sortKey: 'shortName'},
            {columnHeaderDisplayName: 'Module Name', displayProperty: 'companyModuleName', sortKey: 'companyModuleName', visible: moduleColumn},
            {columnHeaderDisplayName: 'Action', templateUrl: 'action_template', width: '5em'}
        ];
    };
    $scope.setDefinition(false);
    $scope.dataSourceConfig = {
        url: '/api/rest/permission/getAll',
        method: "GET",
        params: {},
        paginationConfig: {
            response: {
                totalItems: 'count',
                itemsLocation: 'list'
            }
        }
    };
    $scope.init();

});