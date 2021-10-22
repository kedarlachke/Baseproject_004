import * as ActionTypes from './ActionTypes';
import {baseUrl,masterDataUrl} from '../../shared/baseUrl';
import {execGqlURL} from '../gqlclientconfig'
import masterData from '../queries/masterData';














export const fetchMasters = async (values:any,callback:any) =>
{
 var result='',errorMessage='',errors =new Array();
 try
 {   

 //console.log('masterdata--ok ok ok----------------------new*******************');
  //  alert(JSON.stringify(masterData));

//gqlType,gqlTypeName,gqlVariables,gqlURL
//(gqlType,gqlTypeName,gqlVariables,gqlURL)

console.log(masterDataUrl)
   let result:any= await execGqlURL('query',masterData,values,masterDataUrl)
  //  console.log('masterdata--result----------------------new*******************');
   // console.log(result);
 //   console.log('masterdata result end--ok ok ok--------------new******************* end');
 }
 catch(err)
  {  
  console.log('Error masterdata------------------------new*******************');
   console.log(err);
   console.log('Error end masterdata------------------------new*******************');
     errors = err.errorsGql;
     errorMessage = err.errorMessageGql;    
     return callback({"errors":errors,"errorMessage":errorMessage},'' );
  }
if(!result)
{
 
  return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
}
else
{

   //console.log('step-2.2');
   //console.log(result.data);
 
   return callback('',result);

   
}
};
// modify settings
export const modifySetting = (document:any) => ({
  
    type:ActionTypes.MODIFY_SETTING,
    payload:document
    });


//documents action creators


export const addmasterdocs = (masterdocs:any) =>({
    type:ActionTypes.ADD_MASTERDOCS,
    payload:masterdocs
});

    export const deleteDocument = (docid:string) => ({
        type:ActionTypes.DELETE_DOCUMENT,
        payload:docid
        });


  

            export const modifydocument = (document:any) => ({
  
                type:ActionTypes.MODIFY_DOCUMENT,
                payload:document
                });
                

       



                    export const saveDocument = (document:any) => ({
  
                        type:ActionTypes.SAVE_DOCUMENT,
                        payload:document
                        });


//users action creators

export const usersLoading = () =>
({
    type:ActionTypes.LOADING_USERS,
 })

export const usersFailed = (errmess:any) =>({
    type:ActionTypes.FAILED_USERS,
    payload:errmess
});

export const addusers = (users:any) =>{
    console.log('----------------------')
    console.log(users)
    console.log('----------------------')
    return(
    
    
    
    
    {
    type:ActionTypes.ADD_USERS,
    payload:users
})};                        





// //taxes action creators

// export const taxesLoading = () =>
// ({
//     type:ActionTypes.LOADING_TAXES,
//  })
// export const taxesFailed = (errmess) =>({
//     type:ActionTypes.FAILED_TAXES,
//     payload:errmess
// });

// export const addtaxes = (taxes) =>({
//     type:ActionTypes.ADD_TAXES,
//     payload:taxes
// });


// //tax types action creators
// export const taxtypesLoading = () =>
// ({
//     type:ActionTypes.LOADING_TAXTYPES,
//  })
// export const taxtypesFailed = (errmess) =>({
//     type:ActionTypes.FAILED_TAXTYPES,
//     payload:errmess
// });

// export const addtaxtypes = (taxtypes) =>({
//     type:ActionTypes.ADD_TAXTYPES,
//     payload:taxtypes
// });


// //tax groups action creators
// export const taxgroupsLoading = () =>
// ({
//     type:ActionTypes.LOADING_TAXGROUPS,
//  })
// export const taxgroupsFailed = (errmess) =>({
//     type:ActionTypes.FAILED_TAXGROUPS,
//     payload:errmess
// });

// export const addtaxgroups = (taxgroups) =>({
//     type:ActionTypes.ADD_TAXGROUPS,
//     payload:taxgroups
// });


// //tax rates action creators
// export const taxratesLoading = () =>
// ({
//     type:ActionTypes.LOADING_TAXRATES,
//  })
// export const taxratesFailed = (errmess) =>({
//     type:ActionTypes.FAILED_TAXRATES,
//     payload:errmess
// });

// export const addtaxrates = (taxrates) =>({
//     type:ActionTypes.ADD_TAXRATES,
//     payload:taxrates
// });



// //companies action creators

// export const companiesLoading = () =>
// ({
//     type:ActionTypes.LOADING_COMPANIES,
//  })
// export const companiesFailed = (errmess) =>({
//     type:ActionTypes.FAILED_COMPANIES,
//     payload:errmess
// });

// export const addcompanies = (companies) =>({
//     type:ActionTypes.ADD_COMPANIES,
//     payload:companies
// });


export const setCurrentCompany = (currentcmpn:any) =>{
    alert('hi 234')
    return (
     {
    type:ActionTypes.SET_CURRENTCOMPANY,
    payload:currentcmpn
})
}
;





// //paymodes action creators

// export const paymodesLoading = () =>
// ({
//     type:ActionTypes.LOADING_PAYMODES,
//  })
// export const paymodesFailed = (errmess) =>({
//     type:ActionTypes.FAILED_PAYMODES,
//     payload:errmess
// });

// export const addpaymodes = (paymodes) =>({
//     type:ActionTypes.ADD_PAYMODES,
//     payload:paymodes
// });



// //glaccounts action creators

// export const glaccountsLoading = () =>
// ({
//     type:ActionTypes.LOADING_GLACCOUNTS,
//  })
// export const glaccountsFailed = (errmess) =>({
//     type:ActionTypes.FAILED_GLACCOUNTS,
//     payload:errmess
// });

// export const addglaccounts = (glaccounts) =>({
//     type:ActionTypes.ADD_GLACCOUNTS,
//     payload:glaccounts
// });

// //items action creators

// export const itemsLoading = () =>
// ({
//     type:ActionTypes.LOADING_ITEMS,
//  })
// export const itemsFailed = (errmess) =>({
//     type:ActionTypes.FAILED_ITEMS,
//     payload:errmess
// });

// export const additems = (items) =>({
//     type:ActionTypes.ADD_ITEMS,
//     payload:items
// });



// //items action creators

// export const partiesLoading = () =>
// ({
//     type:ActionTypes.LOADING_PARTIES,
//  })
// export const partiesFailed = (errmess) =>({
//     type:ActionTypes.FAILED_PARTIES,
//     payload:errmess
// });

// export const addparties = (parties) =>({
//     type:ActionTypes.ADD_PARTIES,
//     payload:parties
// });



// //payterms action creators

// export const paytermsLoading = () =>
// ({
//     type:ActionTypes.LOADING_PAYTERMS,
//  })
// export const paytermsFailed = (errmess) =>({
//     type:ActionTypes.FAILED_PAYTERMS,
//     payload:errmess
// });

// export const addpayterms = (payterms) =>({
//     type:ActionTypes.ADD_PAYTERMS,
//     payload:payterms
// });

// //states action creators

// export const statesLoading = () =>
// ({
//     type:ActionTypes.LOADING_STATES,
//  })
// export const statesFailed = (errmess) =>({
//     type:ActionTypes.FAILED_STATES,
//     payload:errmess
// });

// export const addstates = (states) =>({
//     type:ActionTypes.ADD_STATES,
//     payload:states
// });



