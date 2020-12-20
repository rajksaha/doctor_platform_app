/**
 * Created by joy on 21/15/2020.
 */

app.service('ComplainService', function ($resource) {
    return {

        getDrugDayType : $resource('/api/rest/contentDayType/getByParam', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),
        save : $resource('/api/rest/presComplain/save', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        })
    };
});

