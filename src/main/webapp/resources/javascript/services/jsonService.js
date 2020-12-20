app.service('JsonService', function(){
	
	this.numberList = [];
	this.fractionNumberList = [];
	this.dayTypeList = [];
	
	
	var data = {"value" : '' , "name" : '--Select--'};
	this.numberList.push(data);
	for(var i = 1; i<32 ; i++){
		var data = {"value" : i , "name" : i};
		this.numberList.push(data);
	}
	
	var i = .5;
	while( i<31 ){
		var data = {"value" : i , "name" : i};
		this.fractionNumberList.push(data);
		i = i + 0.5;
	}

	this.dayTypeList = [
		{"id" : 1, "banName": "দিন", "engName": "Day(s)"},
        {"id" : 2, "banName": "সপ্তাহ", "engName": "Weeks(s)"},
        {"id" : 3, "banName": "মাস", "engName": "Month(s)"},
        {"id" : 4, "banName": "বছর", "engName": "Year(s)"},
        {"id" : 5, "banName": "চলবে","engName": "Continue"},
        {"id" : 6, "banName": "মাঝে মাঝে", "engName": "Occasionally"},
        {"id" : 7, "banName": "", "engName": ""}
	];

    this.nextVisitDayTypeList = [
        {"id" : 1, "banName": "দিন", "engName": "Day(s)"},
        {"id" : 2, "banName": "সপ্তাহ", "engName": "Weeks(s)"},
        {"id" : 3, "banName": "মাস", "engName": "Month(s)"},
        {"id" : 4, "banName": "বছর", "engName": "Year(s)"}
    ];

	this.timesADay = [
						{"code" : 1, "name" :'Once Daily'},
						{"code" : 2, "name" :'12 hourly'},
						{"code" : 3, "name" :'8 hourly'},
						{"code" : 4, "name" :'6 hourly'},
						{"code" : 6, "name" :'4 hourly'},
						{"code" : 8, "name" :'3 hourly'},
						{"code" : 12, "name" :'2hourly'},
						{"code" : -1, "name" :'Periodic Dose'},
						{"code" : -2, "name" :'Same As'},
						{"code" : -3, "name" :'Empty Dose'},
						{"code" : -4, "name" :'Once in a Week'},
						{"code" : -5, "name" :'Once in a Month'},
						{"code" : -6, "name" :'Once in a Year'}
		              ];


});

