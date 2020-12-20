/**
 * Created by joy on 19/10/2020.
 */

app.service('OldPrescriptionService', function ($resource) {
    return {

        getPatientInfo : $resource('rest/oldPrescription/getPatientInfo', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        getAppoinment : $resource('rest/oldPrescription/getAppoinment', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getDrugPrescription : $resource('rest/oldPrescription/getDrugPrescription', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getInvPrescription : $resource('rest/oldPrescription/getInvPrescription', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getAdvicePrescription : $resource('rest/oldPrescription/getAdvicePrescription', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getVitalPrescription : $resource('rest/oldPrescription/getVitalPrescription', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getComplainPrescription : $resource('rest/oldPrescription/getComplainPrescription', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getHistoryMHPrescription : $resource('rest/oldPrescription/getHistoryMHPrescription', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getHistoryOBSPrescription : $resource('rest/oldPrescription/getHistoryOBSPrescription', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getDiagnosisPrescription : $resource('rest/oldPrescription/getDiagnosisPrescription', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getPrescriptionHistory : $resource('rest/oldPrescription/getPrescriptionHistory', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getMenuSettings : $resource('rest/oldPrescription/getMenuSettings', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getContentInfo : $resource('rest/oldPrescription/getContentInfo', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getContentComment : $resource('rest/oldPrescription/getContentComment', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getContentRecord : $resource('rest/oldPrescription/getContentRecord', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        createDiagnosisPrescription : $resource('rest/oldPrescription/createDiagnosisPrescription', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createContentComment : $resource('rest/oldPrescription/createContentComment', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createContentDiet : $resource('rest/oldPrescription/createContentDiet', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
    };
});

