/**
 * Created by raj on 6/1/2016.
 */

app.service('UserCommonService', function ($resource) {
    return {
        // Module
        getAllModule : $resource('/api/rest/module/getAllModule', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),

        saveModule: $resource('/api/rest/module/save', {}, {
            'query': {
                method: 'POST'
            }
        }),

        updateModule : $resource('/api/rest/module/update', {}, {
            'query': {
                method  : 'POST'
            }
        }),

        deleteModule: $resource('/api/rest/module/delete/:moduleID', {}, {
            'remove': {
                method: 'DELETE',
                params  : {moduleID: '@moduleID'}
            }
        }),

        //Company
        getAllCompany : $resource('/api/rest/company/getAllCompany', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),
        saveCompany: $resource('/api/rest/company/save', {}, {
            'query': {
                method: 'POST'
            }
        }),

        updateCompany : $resource('/api/rest/company/update', {}, {
            'query': {
                method  : 'POST'
            }
        }),

        //permission

        getAllModule : $resource('/api/rest/module/getAllModule', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),

        savePermission: $resource('/api/rest/permission/save', {}, {
            'query': {
                method: 'POST'
            }
        }),

        updatePermission : $resource('/api/rest/permission/update', {}, {
            'query': {
                method  : 'POST'
            }
        }),

        deletePermission: $resource('/api/rest/permission/delete/:moduleID', {}, {
            'remove': {
                method: 'DELETE',
                params  : {moduleID: '@moduleID'}
            }
        }),

        deleteCompany: $resource('/api/rest/company/delete/:companyID', {}, {
            'remove': {
                method: 'DELETE',
                params  : {companyID: '@companyID'}
            }
        }),

        //Company Module
        getAllCompanyModule : $resource('/api/rest/companyModule/getAllCompanyModule', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),
        saveCompanyModule: $resource('/api/rest/companyModule/save', {}, {
            'query': {
                method: 'POST'
            }
        }),

        updateCompanyModule : $resource('/api/rest/companyModule/update', {}, {
            'query': {
                method  : 'POST'
            }
        }),

        deleteCompanyModule: $resource('/api/rest/companyModule/delete/:companyModuleID', {}, {
            'remove': {
                method: 'DELETE',
                params  : {companyModuleID: '@companyModuleID'}
            }
        })
    };
});