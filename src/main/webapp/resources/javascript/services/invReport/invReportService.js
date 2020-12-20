/**
 * Created by joy on 19/10/2020.
 */

app.service('InvReportService', function ($resource) {
    return {

        getPatientInfo : $resource('rest/invReport/getPatientInfo', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        getInvReportDate : $resource('rest/invReport/getInvReportDate', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getInvReportDateLocation : $resource('rest/invReport/getInvReportDateLocation', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
    };
});

