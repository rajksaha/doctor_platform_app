/**
 * Created by joy on 21/15/2020.
 */

app.service('VitalService', function ($resource) {
    return {
        getVitalDoctorDetail : $resource('/api/rest/doctorVitalSetting/getByDoctorVitalInfo/{d}', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        addToPreference : $resource('/api/rest/doctorVitalSetting/save', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        savePrescribedVital : $resource('/api/rest/prescriptionVital/save/{appointmentID}', {}, {
            'query':  {
                method:'POST',
                isArray:false,
                params: {appointmentID: '@appointmentID'}
            }
        }),

        /////////////////////////////////`
        createDoctorVitalSettings : $resource('/api/rest/vital/createDoctorVitalSettings', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        deleteDoctorVitalSettings : $resource('/api/rest/vital/deleteDoctorVitalSettings/:vitalSettingID', {}, {
            'remove':  {
                method:'DELETE',
                params: {vitalSettingID: '@vitalSettingID'}
            }
        }),
        getVitalOptionList : $resource('/api/rest/vital/getVitalOptionList', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        createVitalOption : $resource('/api/rest/vital/createVitalOption', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        updateVitalPrescription : $resource('/api/rest/vital/updateVitalPrescription', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        deleteVitalprescription : $resource('/api/rest/vital/deleteVitalprescription/:prescribedVitalID', {}, {
            'remove':  {
                method:'DELETE',
                params: {prescribedVitalID: '@prescribedVitalID'}
            }
        })
    };
});
