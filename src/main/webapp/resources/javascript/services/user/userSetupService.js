/**
 * Created by raj on 4/26/2016.
 */
app.service('UserSetupService', function ($resource) {
    return {

        getUserProfile : $resource('/api/rest/user/getUserProfile/userID/:userID', {}, {
            'query':  {
                method:'GET',
                params: {userID : '@userID'},
                isArray:false
            }
        }),
        sendResetPasswordMail : $resource('/api/rest/login/resetPassword', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        updateUserPassword: $resource('/api/rest/user/updateUserPassword', {}, {
            'query': {
                method: 'POST'
            }
        }),
        updateUserPasswordByKey: $resource('/api/rest/login/updateUserPasswordByKey', {}, {
            'query': {
                method: 'POST'
            }
        }),
        updateUserStatus: $resource('/api/rest/user/updateUserStatus', {}, {
            'query': {
                method: 'POST'
            }
        }),
        save: $resource('/api/rest/user/save', {}, {
            'query': {
                method: 'POST'
            }
        }),

        update : $resource('/api/rest/user/update', {}, {
            'query': {
                method  : 'POST',
                isArray : false
            }
        }),
    };
});

