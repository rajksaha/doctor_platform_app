/**
 * Created by joy on 21/15/2020.
 */

app.service('PrescriptionService', function ($resource) {
    return {
        getPrescriptionInfo : $resource('/api/rest/prescription/getPrescriptionInfo/:appointmentID', {}, {
            'query':  {
                method:'GET',
                params: {appointmentID: '@appointmentID'}
            }
        }),
        getPrescribedComplain : $resource('/api/rest/prescription/getPrescribedComplain/:appointmentID', {}, {
            'query':  {
                method:'GET',
                isArray:true,
                params: {appointmentID: '@appointmentID'}
            }
        }),
        getPrescribedInv : $resource('/api/rest/prescription/getPrescribedInv/:appointmentID', {}, {
            'query':  {
                method:'GET',
                isArray:true,
                params: {appointmentID: '@appointmentID'}
            }
        }),
        getPrescribedAdvice : $resource('/api/rest/prescription/getPrescribedAdvice/:appointmentID', {}, {
            'query':  {
                method:'GET',
                isArray: true,
                params: {appointmentID: '@appointmentID'}
            }
        }),
        getPrescribedVital : $resource('/api/rest/prescription/getPrescribedVital/:appointmentID', {}, {
            'query':  {
                method:'GET',
                isArray:true,
                params: {appointmentID: '@appointmentID'}
            }
        }),
        getPrescribedNextVisit : $resource('/api/rest/prescription/getPrescribedNextVisit/:appointmentID', {}, {
            'query':  {
                method:'GET',
                isArray:false,
                params: {appointmentID: '@appointmentID'}
            }
        }),
        getPrescribedRefDoc : $resource('/api/rest/prescriptionReference/getByAppointmentID/:appointmentID', {}, {
            'query':  {
                method:'GET',
                isArray:true,
                params: {appointmentID: '@appointmentID'}
            }
        }),
        getPrescribedDiagnosis : $resource('/api/rest/prescription/getPrescribedDiagnosis/:appointmentID', {}, {
            'query':  {
                method:'GET',
                isArray:false,
                params: {appointmentID: '@appointmentID'}
            }
        }),
        getPrescribedPastHistory : $resource('/api/rest/prescription/getPrescribedPastHistory/:appointmentID', {}, {
            'query':  {
                method:'GET',
                isArray:true,
                params: {appointmentID: '@appointmentID'}
            }
        }),
        getPrescribedFamilyHistory : $resource('/api/rest/prescription/getPrescribedFamilyHistory/:appointmentID', {}, {
            'query':  {
                method:'GET',
                isArray:true,
                params: {appointmentID: '@appointmentID'}
            }
        }),
        getPrescribedDiet : $resource('/api/rest/prescription/getPrescribedDiet/:appointmentID', {}, {
            'query':  {
                method:'GET',
                isArray:true,
                params: {appointmentID: '@appointmentID'}
            }
        }),
        getPrescribedOldDrugs : $resource('/api/rest/prescription/getPrescribedOldDrugs/:appointmentID', {}, {
            'query':  {
                method:'GET',
                isArray:true,
                params: {appointmentID: '@appointmentID'}
            }
        }),
        getPrescribedCurrentDrug : $resource('/api/rest/prescription/getPrescribedCurrentDrug/:appointmentID', {}, {
            'query':  {
                method:'GET',
                isArray:true,
                params: {appointmentID: '@appointmentID'}
            }
        }),
        getPrescribedHistory : $resource('/api/rest/prescription/getHistoryInfo/:patientID/:appointmentID/:typeCode', {}, {
            'query':  {
                method:'GET',
                isArray:true,
                params: {patientID: '@patientID', appointmentID: '@appointmentID', typeCode: '@typeCode'}
            }
        }),
        getPrescribedComment : $resource('/api/rest/prescription/getPrescribedComment/:appointmentID', {}, {
            'query':  {
                method:'GET',
                isArray:true,
                params: {appointmentID: '@appointmentID'}
            }
        }),
        getPrescribedDrug : $resource('/api/rest/prescription/getPrescribedDrug/:appointmentID', {}, {
            'query':  {
                method:'GET',
                isArray:true,
                params: {appointmentID: '@appointmentID'}
            }
        }),
        // Used So Far
        getInformationOfPatient : $resource('/api/rest/prescription/getInformationOfPatient', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        getTypeOfAppointment : $resource('/api/rest/prescription/getTypeOfAppointment', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getCurrentAppointment : $resource('/api/rest/appointment/getCurrentAppointment', {}, {
            'query':  {
                method:'GET',
                isArray:false
            }
        }),
        getRecordOfClinical : $resource('/api/rest/prescription/getRecordOfClinical', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getDetailOfClinical : $resource('/api/rest/prescription/getDetailOfClinical', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getContentDetailByDocId : $resource('/api/rest/prescription/getContentDetailByDocId', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getDrugDayTypeList : $resource('/api/rest/prescription/getDrugDayTypeList', {}, {
            'query':  {
                method:'POST',
                isArray:true
            }
        }),
        getInvDetail : $resource('/api/rest/invCategory/getByParam', {}, {
            'query':  {
                method:'GET',
                isArray:true
            }
        }),


        //Delete zone
        saveNextVisit : $resource('/api/rest/prescriptionNextVisit/save', {}, {
            'query':  {
                method:'POST',
                isArray:false
            }
        }),
        deletePresDocRefer : $resource('/api/rest/prescriptionReference/delete/:prescriptionReferenceID', {}, {
            'remove':  {
                method:'DELETE',
                params: {prescriptionReferenceID: '@prescriptionReferenceID'}
            }
        }),
        delDrugHistoryById: $resource('/api/rest/patientDrugHistory/delDrugHistoryById/:contentDetailID', {}, {
            'remove': {
                method: 'DELETE',
                params  : {contentDetailID: '@contentDetailID'}
            }
        }),
        delClinicalHistoryById : $resource('/api/rest/prescription/delClinicalHistoryById/:contentDetailID', {}, {
            'remove':  {
                method:'DELETE',
                params: {contentDetailID: '@contentDetailID'}
            }
        }),
        deletePrescribedInv : $resource('/api/rest/prescriptionInv/delete/:presInvID', {}, {
            'remove':  {
                method:'DELETE',
                params: {presInvID: '@presInvID'}
            }
        }),
        deletePastHistory : $resource('/api/rest/prescription/deletePastHistory/:pastHistoryID', {}, {
            'remove':  {
                method:'DELETE',
                params: {pastHistoryID: '@pastHistoryID'}
            }
        }),
        deleteFamilyHistory : $resource('/api/rest/prescription/deleteFamilyHistory/:familyHistoryID', {}, {
            'remove':  {
                method:'DELETE',
                params: {familyHistoryID: '@familyHistoryID'}
            }
        }),
        deletePrescribedVital : $resource('/api/rest/prescription/deletePrescribedVital/:prescribedVitalID', {}, {
            'remove':  {
                method:'DELETE',
                params: {prescribedVitalID: '@prescribedVitalID'}
            }
        }),
        deletePrescribedComplain : $resource('/api/rest/prescriptionDelete/prescribedComplain/:complainID', {}, {
            'remove':  {
                method:'DELETE',
                params: {complainID: '@complainID'}
            }
        }),
        deletePrescribedHistory : $resource('/api/rest/prescription/delete/:savedHistorysID', {}, {
            'remove':  {
                method:'DELETE',
                params: {savedHistorysID: '@savedHistorysID'}
            }
        }),
        deletePrescribedAdvice : $resource('/api/rest/prescriptionAdvice/delete/:prescriptionAdviceID', {}, {
            'remove':  {
                method:'DELETE',
                params: {prescriptionAdviceID: '@prescriptionAdviceID'}
            }
        }),
        deletePrescribedDrug : $resource('/api/rest/prescription/deletePrescribedDrug/:drugPrescribeID', {}, {
            'remove':  {
                method:'DELETE',
                params: {drugPrescribeID: '@drugPrescribeID'}
            }
        })
    };
});
