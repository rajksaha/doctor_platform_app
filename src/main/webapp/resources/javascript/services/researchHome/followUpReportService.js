/**
 * Created by raj on 10/10/2020.
 */

app.service('FollowUpReportService', function ($resource) {
    return {

        getDataFromPatioentType : $resource('rest/followUpReport/getDataFromPatioentType', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        })
        

    };
});

