app.controller('DrugAdvisorController', function($scope, $modal, $rootScope, limitToFilter, $location, DrugAdvisorService) {
	
	$scope.drugAdviceList = [];
	$scope.drugWhenList = [];
	$scope.masterUpdate = true;


    $scope.convertToUniCode = function (data) {
        var str = ConvertToASCII(ConvertFrom, data.bangla);
        data.pdf = str;
    };

	$scope.init = function(){
		$scope.bringDrugAdviceList();
		
		$scope.bringDrugWhenList();
    };
    
	$scope.bringDrugAdviceList = function (){
		
		
		var dataString = {'data': 1, 'query': 1};

        DrugAdvisorService.getDrugAdviceList.query({}, dataString).$promise.then(function(result) {
            if (result && result.success) {
                $scope.drugAdviceList = result;
            }else{
    
            }
        });
		
	};
	
	$scope.bringDrugWhenList = function (){
		
		
		var dataString = {'data': 1, 'query': 4};

        DrugAdvisorService.getDrugWhenList.query({}, dataString).$promise.then(function(result) {
            if (result && result.success) {
                $scope.drugWhenList = result;
            }else{
    
            }
        });
		
	};
	
	$scope.addDrugAdvice = function(){
		
		angular.forEach($scope.drugAdviceList, function(value, key) {
			value.otherEditMode = true;
		});
		
		$scope.showDrugAdvice = true;
		var drugAdviceData = {};
		
		drugAdviceData.bangla = "";
		drugAdviceData.pdf = "";
		drugAdviceData.editMode = true;
		$scope.masterUpdate = false;
		drugAdviceData.bangla = "";
		
		$scope.drugAdviceList.splice(0,0, drugAdviceData);
		
	};

    $scope.saveDrugAdvice = function(data) {
    	
    	var data = {'bangla': data.bangla, 'pdf': data.pdf, 'query': 2};

        DrugAdvisorService.createDrugAdvice.query({}, data).$promise.then(function(result) {
            if (result && result.success) {
                $scope.bringDrugAdviceList();
            }else{
    
            }
        });
    };
    
    $scope.delDrugAdvice = function(data) {
    	
    	var data = {'delId': data.drugAdviceID, 'query': 3};

        DrugAdvisorService.deleteDrugAdviceType.query({}, data).$promise.then(function(result) {
            if (result && result.success) {
                $scope.bringDrugAdviceList();
            }else{
    
            }
        });
    };
    
    
    $scope.addDrugWhen = function(){
		
		angular.forEach($scope.drugWhenList, function(value, key) {
			value.otherEditMode = true;
		});
		
		$scope.showDrugWhen = true;
		var data = {};
		
		data.bangla = "";
		data.pdf = "";
		data.editMode = true;
		$scope.masterUpdate = false;
		data.bangla = "";
		
		$scope.drugWhenList.splice(0,0, data);
		
	};

    $scope.saveDrugWhen = function(data) {
    	
    	var data = {'bangla': data.bangla, 'pdf': data.pdf, 'query': 5};

        DrugAdvisorService.createDrugWhenType.query({}, data).$promise.then(function(result) {
            if (result && result.success) {
                $scope.bringDrugWhenList();
            }else{
    
            }
        });
    };
    
    $scope.delDrugWhen = function(data) {
    	
    	var data = {'delId': data.id, 'query': 6};

        DrugAdvisorService.deleteDrugWhenType.query({}, data).$promise.then(function(result) {
            if (result && result.success) {
                $scope.bringDrugWhenList();
            }else{
    
            }
        });
    };

    $scope.init();
});

function ConvertToASCII(ConvertTo, line)
{
    var conversion_map = uni2bijoy_string_conversion_map;
    if(ConvertTo=="bijoy")
        conversion_map = uni2bijoy_string_conversion_map;
    else if(ConvertTo=="somewherein")
        conversion_map = uni2somewherein_string_conversion_map;
    else if(ConvertTo=="boisakhi")
        conversion_map = uni2boisakhi_string_conversion_map;

    var myRegExp;
    myRegExp = new RegExp("ো", "g");
    line = line.replace(myRegExp, "ো");
    myRegExp = new RegExp("ৌ", "g");
    line = line.replace(myRegExp, "ৌ");

    line = ReArrangeUnicodeText(line);

    for (var unic in conversion_map)
    {
        myRegExp = new RegExp(unic, "g");
        line = line.replace(myRegExp, conversion_map[unic]);
    }

	/*
	 if(ConvertTo=="bijoy" || ConvertTo=="somewherein")
	 {
	 var temp_map = {
	 "‘":"Ô",
	 "’":"Õ",
	 "“":"Ò",
	 "”":"Ó"
	 };
	 for (var unic in temp_map)
	 {
	 myRegExp = new RegExp(unic, "g");
	 line = line.replace(myRegExp, temp_map[unic]);
	 }
	 }

	 */
    return line;
}