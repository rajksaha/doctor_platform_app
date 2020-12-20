/**
 * Created by joy on 17/10/2020.
 */

app.service('DrugAdvisorService', function ($resource) {
    return {

        getDrugAdviceList : $resource('rest/drugAdvisor/getDrugAdviceList', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getDrugWhenList : $resource('rest/drugAdvisor/getDrugWhenList', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        createDrugAdvice: $resource('rest/drugAdvisor/createDrugAdvice', {}, {
            'query': {
                method: 'POST',
                isArray : false
            }
        }),
        deleteDrugAdviceType : $resource('rest/drugAdvisor/deleteDrugAdviceType', {}, {
            'query':  {
                method:'POST',
                isArray : false
            }
        }),
        createDrugWhenType: $resource('rest/drugAdvisor/createDrugWhenType', {}, {
            'query': {
                method: 'POST',
                isArray : false
            }
        }),
        deleteDrugWhenType : $resource('rest/drugAdvisor/deleteDrugWhenType', {}, {
            'query':  {
                method:'POST',
                isArray : false
            }
        }),
        
    };
});

