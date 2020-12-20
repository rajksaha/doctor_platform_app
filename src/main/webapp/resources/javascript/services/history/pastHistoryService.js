/**
 * Created by joy on 19/10/2020.
 */

app.service('PastHistoryService', function ($resource) {
    return {

        getRelationList : $resource('/api/rest/contentRelation/getByParam', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),
        getDiseaseFromFamilyHistory : $resource('/api/rest/patientFamilyHistory/getByPatientID/:patientID', {}, {
            'query':  {
                method:'GET',
                isArray:true,
                params: {patientID: '@patientID'}
            }
        }),
        saveFamilyHistory : $resource('/api/rest/patientFamilyHistory/save', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        deleteFamilyHistory : $resource('/api/rest/patientFamilyHistory/delete/:familyHistoryID', {}, {
            'remove':  {
                method:'DELETE',
                isArray:false,
                params: {familyHistoryID: '@familyHistoryID'}
            }
        }),
        addFamilyHistoryInPres : $resource('/api/rest/prescriptionFamilyDisease/addFamilyHistoryInPres/:familyHistoryID/:appointmentID', {}, {
            'query':  {
                method:'GET',
                isArray:false,
                params: {familyHistoryID: '@familyHistoryID', appointmentID: '@appointmentID'}
            }
        }),
        deleteFamilyHistoryInPres : $resource('/api/rest/prescriptionFamilyDisease/delete/:presFamilyDiseaseID', {}, {
            'remove':  {
                method:'DELETE',
                isArray:false,
                params: {presFamilyDiseaseID: '@presFamilyDiseaseID'}
            }
        }),

        //past disease

        getPastDisease : $resource('/api/rest/patientPastDisease/getByPatientID/:patientID', {}, {
            'query':  {
                method:'GET',
                isArray:true,
                params: {patientID: '@patientID'}
            }
        }),
        savePastHistory : $resource('/api/rest/patientPastDisease/save', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        deletePastDisease : $resource('/api/rest/patientPastDisease/delete/:patientPastDiseaseID', {}, {
            'query':  {
                method:'POST',
                isArray:false,
                params: {patientPastDiseaseID: '@patientPastDiseaseID'}
            }
        }),
        deletePastHistoryFromPres : $resource('/api/rest/prescriptionPastDisease/delete/:presPastDiseaseID', {}, {
            'query':  {
                method:'DELETE',
                isArray:false,
                params: {presPastDiseaseID: '@presPastDiseaseID'}
            }
        }),
        addPassHistoryInPres : $resource('/api/rest/prescriptionPastDisease/add/:patientPastDiseaseID/:appointmentID', {}, {
            'query':  {
                method:'GET',
                isArray:false,
                params: {patientPastDiseaseID: '@patientPastDiseaseID', appointmentID: '@appointmentID'}
            }
        }),

        /////////////////// Past history end /////////////////////////////////////////

    /////////////////// Drug history start /////////////////////////////////////////

        getCurrentDrugList : $resource('/api/rest/patientDrugHistory/getByPatientID/:patientID', {}, {
            'query':  {
                method:'GET',
                isArray:true,
                params: {patientID: '@patientID'}
            }
        }),
        saveDrugHistory : $resource('/api/rest/patientDrugHistory/save', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        deleteDrugHistory : $resource('/api/rest/patientDrugHistory/delete/:drugHistoryID', {}, {
            'remove':  {
                method:'DELETE',
                isArray:false,
                params: {drugHistoryID: '@drugHistoryID'}
            }
        }),
        addDrugPresInPres : $resource('/api/rest/contentDetail/saveDrugHistory', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        deleteDrugPresFromPres : $resource('/api/rest/contentDetail/delete/:contentDetailID', {}, {
            'remove':  {
                method:'DELETE',
                isArray:false,
                params: {contentDetailID: '@contentDetailID'}
            }
        }),

        /////////////////// Drug history end /////////////////////////////////////////

        getMenu : $resource('/api/rest/pastHistory/getMenu', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),


        getCustomHistoryDetail : $resource('/api/rest/doctorHistorySetting/getByPatient/:doctorID/:patientID/:appointmentID/:typeCode', {}, {
            'query':  {
                method:'GET',
                isArray:true,
                params: {doctorID: '@doctorID', patientID: '@patientID', appointmentID: '@appointmentID', typeCode: '@typeCode'}
            }
        }),
        deleteCustomHistory : $resource('/api/rest/doctorHistorySetting/deleteSettingsOfDocHistory/:historySettingID', {}, {
            'query':  {
                method:'POST',
                isArray:false,
                params: {historySettingID: '@historySettingID'}
            }
        }),
        createHistoryToDocPref : $resource('/api/rest/doctorHistorySetting/save', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createSettingsOfDocPreference : $resource('/api/rest/doctorHistorySetting/createSettingsOfDocPreference', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        saveCustomHistory : $resource('/api/rest/patientHistory/saveCustomHistory', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        deleteHistoryOfPrescription : $resource('/api/rest/pastHistory/deleteHistoryOfPrescription', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        createPrescriptionHistory : $resource('/api/rest/pastHistory/createPrescriptionHistory', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        })
    };
});

