/**
 * Created by joy on 17/10/2020.
 */

app.service('DiseaseModificationService', function ($resource) {
    return {

        getDiseasesList : $resource('rest/disease/getDiseasesList', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),

        delDisease : $resource('rest/disease/delDisease', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),

        updateDisease : $resource('rest/disease/updateDisease', {}, {
            'query': {
                method  : 'POST',
                isArray : false
            }
        }),
        
    };
});

