/**
 * Created by joy on 20/10/2020.
 */

app.service('PatientTypeService', function ($resource) {
    return {

        createAndupdatePatientType : $resource('rest/patientType/createAndupdatePatientType', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        delPatientType : $resource('rest/patientType/delPatientType', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        })
    };
});

