/**
 * Created by joy on 21/15/2020.
 */

app.service('DrugService', function ($resource) {
    return {
        getReqContent : $resource('/api/rest/prescriptionDrug/getReqContent', {}, {
            'query':  {
                method:'GET',
                isArray:false
            }
        }),
        getDrugDefaultSetup : $resource('/api/rest/doctorDrugSetting/getDrugDefaultSetup/:doctorID/:drugID', {}, {
            'query':  {
                method:'GET',
                isArray:false,
                params: {doctorID: '@doctorID', drugID: '@drugID'}
            }
        }),
        getTypeOfDrugDay : $resource('/api/rest/contentDrugType/getByParam', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),
        getTypeOfDrug : $resource('/api/rest/contentDrugType/getByParam', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),
        getTypeOfDrugDayByDose : $resource('/api/rest/drug/getTypeOfDrugDayByDose', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),
        getTypeOfDrugAdvice : $resource('/api/rest/contentDrugAdvice/getByParam', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),
        getTypeOfDrugWhen : $resource('/api/rest/contentWhenType/getByParam', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),
        createPeriodOfDose : $resource('/api/rest/drug/createPeriodOfDose', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        save : $resource('/api/rest/prescriptionDrug/save', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        deleteDrugById : $resource('/api/rest/drug/deleteDrugById/:drugID', {}, {
            'remove':  {
                method:'DELETE',
                params: {drugID: '@drugID'}
            }
        }),
        updateDrugByName : $resource('/api/rest/drug/updateDrugByName', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createDoctorDrugDose : $resource('/api/rest/drug/createDoctorDrugDose', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        deleteDocDrugCreateDocDrug : $resource('/api/rest/drug/deleteDocDrugCreateDocDrug/:drugType/:drugName/:drugStr/:drugTime/:doseUnit/:drugWhen/:drugAdvice', {}, {
            'query':  {
                method:'POST',
                params: {drugType: '@drugType', drugName: '@drugName', drugStr: '@drugStr', drugTime: '@drugTime', doseUnit: '@doseUnit', drugWhen: '@drugWhen', drugAdvice: '@drugAdvice'}
            }
        })
    };
});