/**
 * Created by joy on 21/15/2020.
 */

app.service('DiagnosisService', function ($resource) {
    return {

        save : $resource('/api/rest/presDiagnosis/save', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        })
    };
});

