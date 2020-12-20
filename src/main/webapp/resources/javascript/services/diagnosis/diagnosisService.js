/**
 * Created by joy on 17/10/2020.
 */

app.service('DiagnosisService', function ($resource) {
    return {

        createorupdateDiagnosis : $resource('rest/diagnosis/createorupdateDiagnosis', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        getDiagnosisData : $resource('rest/diagnosis/getDiagnosisData', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        })
        
    };
});
