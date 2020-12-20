/**
 * Created by raj on 5/21/2016.
 */
app.controller('GroupPermissionController', function($scope, $rootScope, $state, $http, $timeout, $location, UserManagementService, UserCommonService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.companyModule = {};
    $scope.showForm = false;
    $scope.editObj = {};
    $scope.moduleList = [];
    $scope.companyList = [];




    $scope.save = function(permission){
        $scope.hideMessage();
        var userGroup = {};
        userGroup.userGroupID = $scope.userGroupID;
        userGroup.groupPermissionList = permission;
        UserManagementService.updateGroupPermission.query({},userGroup).$promise.then(function(result) {

            $scope.showSuccessMessage("Information Updated successfully");
            $scope.userGroupID = null;
            $scope.showForm = false;
        });
    };

    $scope.delete = function(companyModule){

        UserCommonService.deleteCompanyModule.remove({companyModuleID : companyModule.companyModuleID} ).$promise.then(function(result) {
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

    $scope.bringDetails = function(userGroupID){

        $scope.userGroupID = userGroupID;
        var searchData = {};
        searchData.entityID = userGroupID;
        searchData.entityType = $scope.searchParam.companyID;
        UserManagementService.getCompanyModulePermission.query({},searchData).$promise.then(function(result) {

            $scope.groupPermissionList = result;
        });

        $scope.hideMessage();
        $scope.showForm = true;
    };

    $scope.bringGroup = function(companyID){

        if(!companyID){
            companyID = 0;
        }
        UserManagementService.getGroupByCompanyID.query({},{companyID : companyID}).$promise.then(function(result) {
            $scope.groupPermissionList = result;
        });

        $scope.hideMessage();
        $scope.showForm = true;
    };

    $scope.reset = function(){
        angular.copy($scope.editObj, $scope.companyModule);
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

    $scope.init = function(){

        if($scope.userGroupList == null && $rootScope.userData.userID == 1){
            $scope.companySelected = false;
            UserCommonService.getAllCompany.query({}, {}).$promise.then(function(result) {
                $scope.companyList = result;
            });
        }else if($rootScope.userData.userID != 1){
            $scope.searchParam = {};
            UserManagementService.getGroupByCompanyID.query({}, {companyID : 0} ).$promise.then(function(result) {
             $scope.userGroupList = result;
             });
        }
    };

    $scope.init();

});