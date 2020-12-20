/**
 * Created by joy on 20/10/2020.
 */

app.service('PrescribeByDiseaseService', function ($resource) {
    return {

        getDoctor : $resource('rest/prescribeByDisease/getDoctor', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        getAndCreateDisease : $resource('rest/prescribeByDisease/getAndCreateDisease', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        getSettingsDrug : $resource('rest/prescribeByDisease/getSettingsDrug', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getSettingsInv : $resource('rest/prescribeByDisease/getSettingsInv', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getSettingsAdvice : $resource('rest/prescribeByDisease/getSettingsAdvice', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        deleteSettingsAdvice : $resource('rest/prescribeByDisease/deleteSettingsAdvice', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        deleteSettingsInv : $resource('rest/prescribeByDisease/deleteSettingsInv', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        deleteSettingsDrugs : $resource('rest/prescribeByDisease/deleteSettingsDrugs', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        getCategoryInv : $resource('rest/prescribeByDisease/getCategoryInv', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getInvAndDoctorInv : $resource('rest/prescribeByDisease/getInvAndDoctorInv', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        deleteInvSetting : $resource('rest/prescribeByDisease/deleteInvSetting', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createInvSetting : $resource('rest/prescribeByDisease/createInvSetting', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        deleteAdviceSetting : $resource('rest/prescribeByDisease/deleteAdviceSetting', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createAdviceSetting : $resource('rest/prescribeByDisease/createAdviceSetting', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createAdviceSettingByname : $resource('rest/prescribeByDisease/createAdviceSettingByname', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        getAdviceOfDoctor : $resource('rest/prescribeByDisease/getAdviceOfDoctor', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        })
    };
});

