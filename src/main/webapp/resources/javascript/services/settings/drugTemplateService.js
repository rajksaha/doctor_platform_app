/**
 * Created by joy on 20/10/2020.
 */

app.service('DrugTemplateService', function ($resource) {
    return {

        getDrugsDayType : $resource('rest/drugTemplate/getDrugsDayType', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getDrugsTypeList : $resource('rest/drugTemplate/getDrugsTypeList', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getDrugsDayTypeList : $resource('rest/drugTemplate/getDrugsDayTypeList', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getDrugsWhenType : $resource('rest/drugTemplate/getDrugsWhenType', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getDrugsAdviceType : $resource('rest/drugTemplate/getDrugsAdviceType', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        createDrugSettings : $resource('rest/drugTemplate/createDrugSettings', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createDrugDose : $resource('rest/drugTemplate/createDrugDose', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getDoctorDrug : $resource('rest/drugTemplate/getDoctorDrug', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createDoctorDrugDose : $resource('rest/drugTemplate/createDoctorDrugDose', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        delAndcreateDoctorDrug : $resource('rest/drugTemplate/delAndcreateDoctorDrug', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        })
    };
});

