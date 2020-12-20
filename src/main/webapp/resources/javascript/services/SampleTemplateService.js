
app.service('SampleService', function ($resource) {
    return {

        getByObj : $resource('rest/appointment/getByParam', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        })
    };
});

