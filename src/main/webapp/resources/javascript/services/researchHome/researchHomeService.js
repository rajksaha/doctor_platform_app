/**
 * Created by joy on 20/10/2020.
 */

app.service('ResearchHomeService', function ($resource) {
    return {

        getAllAccessList : $resource('rest/researchHome/getAllAccessList', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        })
        
    };
});

