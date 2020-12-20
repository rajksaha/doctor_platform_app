/**
 * Created by raj on 10/15/2020.
 */

/**
 * Created by raj on 10/10/2020.
 */

app.service('SampleService', function ($resource) {
    return {

        getByObj : $resource('rest/appointment/getByParam', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getSingleByID : $resource('rest/appointment/getByID/sampleID/:sampleID', {}, {
            'query':  {
                method:'GET',
                params: {sampleID : '@sampleID'},
                isArray:false
            }
        }),

        getListByID : $resource('rest/appointment/getByID/sampleID/:sampleID', {}, {
            'query':  {
                method:'GET',
                params: {sampleID : '@sampleID'},
                isArray:true
            }
        }),
        create: $resource('rest/appointment/save', {}, {
            'save': {
                method: 'POST',
                isArray : false
            }
        }),
        update : $resource('rest/appointment/update', {}, {
            'query': {
                method  : 'POST',
                isArray : false
            }
        }),
        delete : $resource('rest/appointment/delete/:sampleID', {}, {
            'remove':  {
                method:'DELETE',
                params: {sampleID : '@sampleID'}
            }
        })

    };
});

