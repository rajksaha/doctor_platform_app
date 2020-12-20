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
        getDoctorPrefInv : $resource('/api/rest/doctorPreferenceInv/getDoctorPrefInv/:doctorID/:appointmentID/:categoryID', {}, {
            'query':  {
                method:'GET',
                isArray: true,
                params: {doctorID: '@doctorID', appointmentID: '@appointmentID', categoryID: '@categoryID'}
            }
        }),
        getDoctorPrefAdvice : $resource('/api/rest/doctorPreferenceAdvice/getDoctorPrefAdvice/:doctorID/:appointmentID', {}, {
            'query':  {
                method:'GET',
                isArray: true,
                params: {doctorID: '@doctorID', appointmentID: '@appointmentID'}
            }
        }),
        getDoctorPrefVital : $resource('/api/rest/doctorVitalSetting/getByDoctorVitalInfo/:doctorID/:appointmentID', {}, {
            'query':  {
                method:'GET',
                isArray: true,
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
        }),
        createPrefVital : $resource('/api/rest/doctorVitalSetting/save', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        deletePrefInv : $resource('/api/rest/doctorPreferenceInv/delete/:invPreferenceID', {}, {
            'remove':  {
                method:'DELETE',
                isArray:false,
                params: {invPreferenceID: '@invPreferenceID'}
            }
        }),
        deletePrefAdvice : $resource('/api/rest/doctorPreferenceAdvice/delete/:advicePreferenceID', {}, {
            'remove':  {
                method:'DELETE',
                isArray:false,
                params: {advicePreferenceID: '@advicePreferenceID'}
            }
        }),
        deletePrefVital : $resource('/api/rest/doctorVitalSetting/delete/:vitalSettingID', {}, {
            'remove':  {
                method:'DELETE',
                isArray:false,
                params: {vitalSettingID: '@vitalSettingID'}
            }
        })
    };
});
