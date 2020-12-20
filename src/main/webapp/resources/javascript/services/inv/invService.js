/**
 * Created by joy on 19/10/2020.
 */

app.service('InvService', function ($resource) {
    return {

        createDoctorInV : $resource('rest/inv/createDoctorInV', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        deleteDoctorInV : $resource('rest/inv/deleteDoctorInV', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createInvPrescription : $resource('rest/inv/createInvPrescription', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        deleteInvPrescriptionById : $resource('rest/inv/deleteInvPrescriptionById', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        deleteInvPrescriptionByInvId : $resource('rest/inv/deleteInvPrescriptionByInvId', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        getInvDoctor : $resource('rest/inv/getInvDoctor', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getInvDetail : $resource('rest/inv/getInvDetail', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getInvCategory : $resource('rest/inv/getInvCategory', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getInvPrescription : $resource('rest/inv/getInvPrescription', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        createDoctorInVSettings : $resource('rest/inv/createDoctorInVSettings', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createAndupdateInvPrescription : $resource('rest/inv/createAndupdateInvPrescription', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),

    };
});

