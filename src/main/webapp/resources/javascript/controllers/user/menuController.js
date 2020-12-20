/**
 * Created by raj on 1/6/16.
 */

app.controller('MenuController', function($scope, $state, $rootScope, $http, $timeout, $location, $modal, ApprovalLevelService) {

    $scope.isCollapse = [];

    $scope.requestForLogin = function(){
        $state.go('home');
    };

    $scope.approvalLevelList = [];

    $scope.menuItem = "";

    $scope.showMenu = function(index){
        $scope.isCollapse[index] = !$scope.isCollapse[index];
    };

    $scope.init = function (){

            ApprovalLevelService.getAll.query({}, {} ).$promise.then(function(result) {
                $scope.approvalLevelList = result;

                $scope.initMenu($location.path());
            });
    };

    $scope.getApprovalLevelName = function(level){

        var temp = null;
        for(var i= 0;i<$scope.approvalLevelList.length;i++){
            if($scope.approvalLevelList[i].sortOrder == level){
                temp =  $scope.approvalLevelList[i].approvalState;
                break;
            }
        }

        return temp;
    };

    $scope.getActionStateCode = function(permissionCode){

        var temp = null;
        for(var i= 0;i<$scope.approvalLevelList.length;i++){
            if($scope.approvalLevelList[i].permissionCode == permissionCode){
                temp =  $scope.approvalLevelList[i].actionStateCode;
                break;
            }
        }

        return temp;

    };

    $scope.changeState = function (url, claimType, actionState){
        $state.go(url);
    };

    $scope.initMenu = function(stateName) {
        try{
            //stateName = stateName.split('.')[1];
            if($('a[href$="'+stateName+'"]') && $('a[href$="'+stateName+'"]').length > 0) {
                $('a[href$="'+stateName+'"]').addClass('echo-active');
                var angularAttr = $('a[href$="'+stateName+'"]').parent().attr('data-ng-show');
                var menuNumber = parseInt(angularAttr.substr(angularAttr.indexOf('[') + 1, angularAttr.length + 1 - angularAttr.indexOf(']')));
                $scope.showMenu(menuNumber);
            }
        } catch(e){
            console.error("Unable to expand left menu --> from menuController.js")
        }
    };



    $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams) {
        $rootScope.$emit('event:clearStatus');
        window.scrollTo(1, 1);
        var stateName = toState.name;
        if(stateName.indexOf('.') > 0) {
            //add active class
            stateName = stateName.split('.')[1];
            if($('a[href$="'+stateName+'"]') && $('a[href$="'+stateName+'"]').length > 0) {
                $('.echo-active').removeClass('echo-active');
                $('a[href$="'+stateName+'"]').addClass('echo-active');

                $scope.isCollapse = [];
                $scope.initMenu(stateName);
            }
        }
        $("html, body").animate({ scrollTop: 0 }, "fast");
    });




    $scope.init();



});
