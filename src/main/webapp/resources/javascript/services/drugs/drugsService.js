/**
 * Created by joy on 17/10/2020.
 */

app.service('DrugsService', function ($resource) {
    return {

        getDrugsTypeList : $resource('rest/drugs/getDrugsTypeList', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getDrugsDayTypeList : $resource('rest/drugs/getDrugsDayTypeList', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getDrugsWhenTypeList : $resource('rest/drugs/getDrugsWhenTypeList', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getDrugsAdviceTypeList : $resource('rest/drugs/getDrugsAdviceTypeList', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        createorupdatePresCribedDrugs : $resource('rest/drugs/createorupdatePresCribedDrugs', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        addDrug : $resource('rest/drugs/addDrug', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        delDrugAndDrugPrescription : $resource('rest/drugs/delDrugAndDrugPrescription', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        updateDrug : $resource('rest/drugs/updateDrug', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        delFromDrugPrescriptionAndDose : $resource('rest/drugs/delFromDrugPrescriptionAndDose', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        getPresCribedDrugs : $resource('rest/drugs/getPresCribedDrugs', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        })
    };
});

