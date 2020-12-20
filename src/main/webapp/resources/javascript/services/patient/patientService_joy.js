/**
 * Created by joy on 20/10/2020.
 */

app.service('PatientService', function ($resource) {
    return {
        getPatientDetail : $resource('rest/patient/getByID/:doctorID', {}, {
            'query':  {
                method:'GET',
                params: {doctorID: '@doctorID'}
            }
        }),
        getNextAppointedPatient : $resource('rest/patient/getNextAppointedPatient', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getAppoinmentByDatesing : $resource('rest/patient/getAppoinmentByDatesing', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getAppoinmentByDisease : $resource('rest/patient/getAppoinmentByDisease', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getAppoinmentByPatient : $resource('rest/patient/getAppoinmentByPatient', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getAppoinmentByPatientType : $resource('rest/patient/getAppoinmentByPatientType', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getDrugsAppoinment : $resource('rest/patient/getDrugsAppoinment', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getPatientOfAllType : $resource('rest/patient/getPatientOfAllType', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        printAppoinment : $resource('rest/patient/printAppoinment', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        getInformationDoctor : $resource('rest/patient/getInformationDoctor', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createAppoinment : $resource('rest/patient/createAppoinment', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        })
    };
});

