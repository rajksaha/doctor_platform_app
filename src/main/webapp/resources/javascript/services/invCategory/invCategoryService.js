/**
 * Created by joy on 19/10/2020.
 */

app.service('InvCategoryService', function ($resource) {
    return {

        getInvCategoryList : $resource('rest/invCategory/getInvCategoryList', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        updateInvByCategoryId : $resource('rest/invCategory/updateInvByCategoryId', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        getCategoryOfInv : $resource('rest/invCategory/getCategoryOfInv', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        })
    };
});

