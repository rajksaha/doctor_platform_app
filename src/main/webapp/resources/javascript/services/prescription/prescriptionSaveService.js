/**
 * Created by raj on 11/12/2020.
 */

app.service('PresSaveService', function ($resource) {
    return {

        saveDiagnosis : $resource('/api/rest/prescriptionSave/saveDiagnosis', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        saveComplain : $resource('/api/rest/prescriptionSave/saveComplain', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        saveDiet : $resource('/api/rest/prescriptionSave/saveDiet', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        savePrescribedVital : $resource('/api/rest/prescriptionVital/save', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createPrescribedInv : $resource('/api/rest/prescriptionInv/save', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createPrescribedAdvice : $resource('/api/rest/prescriptionAdvice/save', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        updatePrescribedInv : $resource('/api/rest/prescriptionInv/update', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        saveInvFromPref : $resource('/api/rest/prescriptionSave/saveInvFromPref/:appointmentID/:invID', {}, {
            'query':  {
                method:'POST',
                isArray: true,
                params: {appointmentID: '@appointmentID', invID: '@invID'}
            }
        }),
        saveAdviceFromPref : $resource('/api/rest/prescriptionSave/saveAdviceFromPref/:appointmentID/:adviceID', {}, {
            'query':  {
                method:'POST',
                isArray: true,
                params: {appointmentID: '@appointmentID', adviceID: '@adviceID'}
            }
        }),
        savePresDoctorRefer : $resource('/api/rest/prescriptionReference/create', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        updateAppStatus : $resource('/api/rest/appointment/updateStatus', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        updateDrugPrescriptionJson : $resource('/api/rest/prescription/updateDrugPrescriptionJson', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        updateAppoinmentStatusByApointmentNo : $resource('/api/rest/prescription/updateAppoinmentStatusByApointmentNo', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        updatePatientByAll : $resource('-', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        updateComment : $resource('/api/rest/prescription/getUpInDelContentDetailByComment', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        })
    };
});
