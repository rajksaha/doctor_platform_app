/**
 * Created by joy on 21/15/2020.
 */

app.service('PrescriptionSettingService', function ($resource) {
    return {

        getDosePeriod : $resource('rest/prescriptionSetting/getDosePeriod', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        })
    };
});

