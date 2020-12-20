/**
 * Created by joy on 19/10/2020.
 */

app.service('SymptomModificationService', function ($resource) {
    return {

        getSymptomsList : $resource('rest/symptomModification/getSymptomsList', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        delSymptoms : $resource('rest/symptomModification/delSymptoms', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        updateSymptoms : $resource('rest/symptomModification/updateSymptoms', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        })
    };
});

