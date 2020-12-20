/**
 * Created by raj on 6/3/2016.
 */

app.service('UserManagementService', function ($resource) {
    return {

        // User Group
        getAllUserGroup: $resource('/api/rest/userGroup/getAllUserGroup', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),
        getGroupByCompanyID : $resource('/api/rest/userGroup/getGroupByCompanyID/companyID/:companyID', {}, {
            'query':  {
                method:'GET',
                params: {companyID : '@companyID'},
                isArray:true
            }
        }),
        saveUserGroup: $resource('/api/rest/userGroup/save', {}, {
            'query': {
                method: 'POST'
            }
        }),

        updateUserGroup : $resource('/api/rest/userGroup/update', {}, {
            'query': {
                method  : 'POST'
            }
        }),

        deleteUserGroup: $resource('/api/rest/userGroup/delete/:userGroupID', {}, {
            'remove': {
                method: 'DELETE',
                params  : {userGroupID: '@userGroupID'}
            }
        }),
        getUserGroup: $resource('/api/rest/user/getUserGroupForUser', {}, {
            'query': {
                method: 'POST',
                isArray:true
            }
        }),
        updateUserGroupAssignment: $resource('/api/rest/user/updateUserGroupAssignment', {}, {
            'query': {
                method: 'POST'
            }
        }),
        getCompanyModulePermission: $resource('/api/rest/groupPermission/getCompanyModulePermission', {}, {
            'query': {
                method: 'POST',
                isArray:true
            }
        }),
        updateGroupPermission: $resource('/api/rest/groupPermission/updateGroupPermission', {}, {
            'query': {
                method: 'POST'
            }
        }),



    };
});
