/**
 * Created by joy on 18/10/2020.
 */

app.service('FamilyHisoryService', function ($resource) {
    return {

        createAndupdateFamilyHistory : $resource('rest/familyHisory/createAndupdateFamilyHistory', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        getFamilyDiseaseHistory : $resource('rest/familyHisory/getFamilyDiseaseHistory', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        deleteFamilyDisease : $resource('rest/familyHisory/deleteFamilyDisease', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createFamilyDisease : $resource('rest/familyHisory/createFamilyDisease', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        getRelationList : $resource('rest/familyHisory/getRelationList', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        deletePatientFamilyHistory : $resource('rest/familyHisory/deletePatientFamilyHistory', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
    };
});

