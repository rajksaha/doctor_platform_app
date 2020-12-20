/**
 * Created by joy on 20/10/2020.
 */

app.service('PatientService', function ($resource) {
    return {
        getPatientDetail : $resource('/api/rest/patient/getByID/:patientID', {}, {
            'query':  {
                method:'GET',
                params: {patientID: '@patientID'}
            }
        }),
        update : $resource('/api/rest/patient/update', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        updatePatientType : $resource('/api/rest/patient/updatePatientType/:patientID/:patientTypeID', {}, {
            'query':  {
                method:'GET',
                isArray:false,
                params: {patientID: '@patientID', patientTypeID: '@patientTypeID'}
            }
        })
    };
});

