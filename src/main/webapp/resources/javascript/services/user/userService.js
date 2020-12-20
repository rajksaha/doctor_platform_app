/**
 * Created by raj on 4/26/2016.
 */
app.service('UserSetupService', function ($resource) {
    return {

        getUserProfile : $resource('rest/user/getUserProfile/userID/:userID', {}, {
            'query':  {
                method:'GET',
                params: {userID : '@userID'},
                isArray:false
            }
        }),
        sendResetPasswordMail : $resource('rest/login/resetPassword', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        updateUserPassword: $resource('rest/user/updateUserPassword', {}, {
            'query': {
                method: 'POST'
            }
        }),
        updateUserPasswordByKey: $resource('rest/login/updateUserPasswordByKey', {}, {
            'query': {
                method: 'POST'
            }
        }),
        updateUserStatus: $resource('rest/user/updateUserStatus', {}, {
            'query': {
                method: 'POST'
            }
        }),
        save: $resource('rest/user/save', {}, {
            'query': {
                method: 'POST'
            }
        }),

        update : $resource('rest/user/update', {}, {
            'query': {
                method  : 'POST',
                isArray : false
            }
        }),
    };
});

