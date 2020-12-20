/**
 * Created by joy on 18/10/2020.
 */

app.service('FollowUpSetupService', function ($resource) {
    return {

        getPatientType : $resource('rest/followUpSetup/getPatientType', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        createInvToFollowUpSet : $resource('rest/followUpSetup/createInvToFollowUpSet', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        deleteInvToFollowUpSet : $resource('rest/followUpSetup/deleteInvToFollowUpSet', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        getFollowUpChart : $resource('rest/followUpSetup/getFollowUpChart', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getPatientWithDoctor : $resource('rest/followUpSetup/getPatientWithDoctor', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getDoectorFromSettings : $resource('rest/followUpSetup/getDoectorFromSettings', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        })
    };
});

