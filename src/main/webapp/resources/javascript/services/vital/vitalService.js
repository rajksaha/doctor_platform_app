/**
 * Created by joy on 19/10/2020.
 */

app.service('VitalService', function ($resource) {
    return {

        updateVital : $resource('rest/vital/updateVital', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createDoctorVital : $resource('rest/vital/createDoctorVital', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createDoctorVitalOrder : $resource('rest/vital/createDoctorVitalOrder', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        getVital : $resource('rest/vital/getVital', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getVitalOption : $resource('rest/vital/getVitalOption', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getVitalOption : $resource('rest/vital/getVitalOption', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        createVitalOption : $resource('rest/vital/createVitalOption', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        updateVitalPrescription : $resource('rest/vital/updateVitalPrescription', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createVitalPrescription : $resource('rest/vital/createVitalPrescription', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        deleteVitalPrescription : $resource('rest/vital/deleteVitalPrescription', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        })
    };
});

