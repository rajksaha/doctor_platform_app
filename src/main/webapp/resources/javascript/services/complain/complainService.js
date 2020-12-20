/**
 * Created by joy on 17/10/2020.
 */

app.service('ComplainService', function ($resource) {
    return {

        getDrugDayType : $resource('/api/rest/contentDayType/getByParam', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),
        updateComplain: $resource('/api/rest/complain/updateComplain', {}, {
            'query': {
                method: 'POST',
                isArray : false
            }
        })
        
    };
});