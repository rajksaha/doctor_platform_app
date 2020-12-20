
/**
 * Created by joy on 16/10/2020.
 */

app.service('AdminModuleService', function ($resource) {
    return {

        getUserProfileList : $resource('rest/adminModule/getUserProfileList', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getAppAccess : $resource('rest/adminModule/getAppAccess', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        updateUserStatus : $resource('rest/adminModule/updateUserStatus', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        manegeUserProfile : $resource('rest/adminModule/manegeUserProfile', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        })       
    };
});

