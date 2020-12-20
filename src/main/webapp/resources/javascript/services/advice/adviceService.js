/**
 * Created by joy on 17/10/2020.
 */

app.service('AdviceService', function ($resource) {
    return {

        createAdvice : $resource('rest/advice/createAdvice', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createDoctorPreference: $resource('rest/advice/createDoctorPreference', {}, {
            'save': {
                method: 'POST',
                isArray: false
            }
        }),
        delAdviceSettings : $resource('rest/advice/delAdviceSettings', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createAdviceToPresciption: $resource('rest/advice/createAdviceToPresciption', {}, {
            'save': {
                method: 'POST',
                isArray : false
            }
        }),
        delPrescibtionAdvice : $resource('rest/advice/delPrescibtionAdvice', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        getPrescribedAdvice : $resource('rest/advice/getPrescribedAdvice', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getDoctorInfo : $resource('rest/advice/getDoctorInfo', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        delDoctorAdvice : $resource('rest/advice/delDoctorAdvice', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
    };
});