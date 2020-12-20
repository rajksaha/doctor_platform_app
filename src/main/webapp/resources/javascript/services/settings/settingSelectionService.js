/**
 * Created by joy on 21/15/2020.
 */

app.service('SettingSelectionService', function ($resource) {
    return {

        getAccessAppUser : $resource('rest/settingSelection/getAccessAppUser', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        })
    };
});

