/**
 * Created by joy on 17/10/2020.
 */

app.service('FollowUpChartService', function ($resource) {
    return {

        getListFromFollowUPResult : $resource('rest/followUpChart/getListFromFollowUPResult', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),

        getFollowUpChartList : $resource('rest/followUpChart/getFollowUpChartList', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        addToContentDetail : $resource('rest/followUpChart/addToContentDetail', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createFollowUpResult : $resource('rest/followUpChart/createFollowUpResult', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        getDoctorFollowUpSettingsList : $resource('rest/followUpChart/getDoctorFollowUpSettingsList', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        delAndcreateFollowUpResult : $resource('rest/followUpChart/delAndcreateFollowUpResult', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        getPatientDetailSetDoctorFollowUp : $resource('rest/followUpChart/getPatientDetailSetDoctorFollowUp', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        })
    };
});

