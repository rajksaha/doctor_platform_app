/**
 * Created by raj on 10/10/2020.
 */

app.service('DoctorService', function ($resource) {
    return {

        getAppData : $resource('/api/rest/doctor/get', {}, {
            'query':  {
                method:'GET',
                isArray:false
            }
        }),
        getDoctorMenu : $resource('/api/rest/prescription/getDoctorMenu', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),
        getDoctorPrefAdvice : $resource('/api/rest/doctorPreferenceAdvice/getDoctorPrefAdvice/:doctorID/:appointmentID', {}, {
            'query':  {
                method:'GET',
                isArray:true,
                params: {doctorID: '@doctorID', appointmentID: '@appointmentID'}
            }
        }),
        getDoctorPrefInv : $resource('/api/rest/doctorPreferenceInv/getDoctorPrefInv/:doctorID/:appointmentID', {}, {
            'query':  {
                method:'GET',
                isArray:true,
                params: {doctorID: '@doctorID', appointmentID: '@appointmentID'}
            }
        }),
        getDoctorDetail : $resource('/api/rest/prescription/getDoctorDetail/:doctorID', {}, {
            'query':  {
                method:'GET',
                params: {doctorID: '@doctorID'}
            }
        }),
        createPrefInv : $resource('/api/rest/doctorPreferenceInv/save', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createPrefAdvice : $resource('/api/rest/doctorPreferenceAdvice/save', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        })

    };
});
