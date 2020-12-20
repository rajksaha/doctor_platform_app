/**
 * Created by raj on 10/10/2020.
 */

app.service('AppointmentService', function ($resource) {
    return {

        getByParam : $resource('/api/rest/appointment/getByParam', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),
        getDoctorData : $resource('/api/rest/appointment/getDoctorData', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getDoctorDashboard : $resource('/api/rest/appointment/getDoctorDashboard', {}, {
            'query':  {
                method:'GET',
                isArray:false
            }
        }),
        visitPatient : $resource('/api/rest/appointment/visitPatient', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createAppointment : $resource('/api/rest/appointment/createAppointment', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createAppForNewPatient : $resource('/api/rest/appointment/createAppForNewPatient', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createFollowUpApp : $resource('/api/rest/appointment/createFollowUpApp', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        deleteAppointment : $resource('/api/rest/appointment/deleteAppointment', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        updateAppointment : $resource('/api/rest/appointment/updateAppointment', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        patientSearch : $resource('/api/rest/autoComplete/patientSearch', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        })

    };
});
