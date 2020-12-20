/**
 * Created by joy on 19/10/2020.
 */

app.service('HistoryService', function ($resource) {
    return {

        getHistoryDetail : $resource('rest/history/getHistoryDetail', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        updateHistoryName : $resource('rest/history/updateHistoryName', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        setDoctorHistory : $resource('rest/history/setDoctorHistory', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        getHistoryOption : $resource('rest/history/getHistoryOption', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        updateHistoryOption : $resource('rest/history/updateHistoryOption', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        updatePatientHistory : $resource('rest/history/updatePatientHistory', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createPatientHistory : $resource('rest/history/createPatientHistory', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        delPatientHistory : $resource('rest/history/delPatientHistory', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        deletePrescriptionHistory : $resource('rest/history/deletePrescriptionHistory', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createPrescritionHistory : $resource('rest/history/createPrescritionHistory', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        deleteDoctorHistorySettings : $resource('rest/history/deleteDoctorHistorySettings', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        })
    };
});

