/**
 * Created by joy on 21/15/2020.
 */

app.service('DietService', function ($resource) {
    return {

        setAndInContentDetail : $resource('rest/diet/setAndInContentDetail', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        })
    };
});

