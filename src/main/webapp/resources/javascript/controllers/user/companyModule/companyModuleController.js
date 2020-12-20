/**
 * Created by raj on 5/21/2016.
 */
app.controller('CompanyModuleController', function($scope, $rootScope, $state, $http, $timeout, $location, UserCommonService) {

    $scope.hasError = false;
    $scope.hasSuccess = false;
    $scope.message = "";
    $scope.companyModule = {};
    $scope.showForm = false;
    $scope.editObj = {};
    $scope.moduleList = [];
    $scope.companyList = [];


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

    // column definition
    $scope.columnDefinition = [
        {columnHeaderDisplayName: 'Company Module Name', displayProperty: 'shortName', sortKey: 'shortName'},
        {columnHeaderDisplayName: 'Company Name', displayProperty: 'companyName', sortKey: 'companyName'},
        {columnHeaderDisplayName: 'Module Name', displayProperty: 'moduleName', sortKey: 'moduleName'},
        {columnHeaderDisplayName: 'Action', templateUrl: 'action_template', width: '5em'}
    ];

    //datasource configuration
    $scope.dataSourceConfig = {
        url: '/api/rest/companyModule/getAll',
        method: "GET",
        params: {},
        paginationConfig: {
            response: {
                totalItems: 'count',
                itemsLocation: 'list'
            }
        }
    };

    $scope.save = function(companyModule) {
        $scope.hideMessage();
        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {
            UserCommonService.saveCompanyModule.query({}, companyModule ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information saved successfully");
                    $scope.companyModule = {};
                    $scope.refreshList();
                    $scope.showForm = false;
                } else {
                    $scope.showErrorMessage(result.message);
                }
            });
        }

    };

    $scope.update = function(companyModule){
        $scope.hideMessage();
        if(validator.validateForm("#validationRequired",".validatorMsg",null)) {
            UserCommonService.updateCompanyModule.query({}, companyModule ).$promise.then(function(result) {
                if(result && result.success) {
                    $scope.showSuccessMessage("Information updated successfully");
                    $scope.companyModule = {};
                    $scope.refreshList();
                    $scope.showForm = false;
                } else {
                    $scope.showErrorMessage(result.message);
                }
            });
        }
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

    $scope.edit = function(companyModule){
        $scope.companyModule = {};
        angular.copy(companyModule, $scope.editObj);
        angular.copy(companyModule, $scope.companyModule);
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

        UserCommonService.getAllModule.query({}, {} ).$promise.then(function(result) {
            $scope.moduleList = result;
        });

        UserCommonService.getAllCompany.query({}, {} ).$promise.then(function(result) {
            $scope.companyList = result;
        });
    };

    $scope.init();

});