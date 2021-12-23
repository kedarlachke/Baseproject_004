import React, { useState,useEffect } from 'react'
import { AnyIfEmpty, connect } from 'react-redux'
import { Button } from '../common/Button/Button'
import DatePicker from '../common/DatePicker/DatePicker'
import constant from '../common/constant'
import { FlatInput } from '../common/InputFields/Input/Input'
import { SelectInput } from '../common/InputFields/Select/Select'
import * as doctypes from '../common/Doctypes';
import saveReccomendation from '../mutations/saveReccomendation'
import { getDocs, getDocconfig, getLblVal, checkTouched, nvl, checkItem, isCheckedbool, getDocumenForSave } from '../common/CommonLogic';
import shortid from 'shortid'
import { deleteDocument,saveDocument,addusers } from '../Redux/ActionCreators'
import deleteRecommendation from '../mutations/DeleteRecommendation';
import { execGql, execGql_xx } from '../gqlclientconfig';
import recommendationsQuery from '../queries/recommendationQuery'
import {handleDelete, getRecommendations,handleSave} from './CrudRecommendation'
import Messagesnackbar from '../common/Alert/Alert'
import AlertDialog from '../common/PopupModals/ConfirmationModal'
import Loader from '../common/Loader/Loader'
import {
  runCheck,
  requiredCheck,
  getDtFormat,
  getTimeFormat,
  getFromToDate,
  getDateYYYYMMDDHHMI,
  getDateYYYYMMDD,
  maxLength40,
  maxLength128,
  setErrorValue,
  getValue,
  setValue
 } from '../common/validationlib';
 import {
  Redirect,
  withRouter } from 'react-router-dom'
import AppbarBottom from '../common/AppBarBottom/AppbarBottom'



// const handleSave = async (currentdocument: any) => {
//   var result: any = '', errorMessage = '', errors = new Array();
//   return new Promise<void>(async(resolve, reject) => {
    
  
//   try {
//     let userForSave = {
//       ...constant,
//       name: nvl(currentdocument.name, ''),
//       recodate: nvl(currentdocument.recodate, ''),
//       cmp: nvl(currentdocument.cmp, ''),
//       addupto: nvl(currentdocument.addupto, ''),
//       sl: nvl(currentdocument.sl, ''),
//       target1: nvl(currentdocument.target1, ''),
//       target2: nvl(currentdocument.target2, ''),
//       target3: nvl(currentdocument.target3, ''),
//       target4: nvl(currentdocument.target4, ''),
//       target5: nvl(currentdocument.target5, ''),
//       target6: nvl(currentdocument.target6, ''),
//       target7: nvl(currentdocument.target7, ''),
//       target8: nvl(currentdocument.target8, ''),
//       target9: nvl(currentdocument.target9, ''),
      
//       weightage: nvl(currentdocument.weightage, ''),
//       timeframe: nvl(currentdocument.timeframe, ''),
//       _id:nvl(currentdocument._id, ''),
//       t_id:nvl(currentdocument.t_id, ''),
//     }
//     result = await execGql('mutation', saveReccomendation, userForSave)
//     if (!result) {
//       console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
//       reject({ "errors": [], "errorMessage": 'No errors and results from GQL' })
//     }
//     else {
//       resolve(result.data)
//       return result.data;
//     }
//   }
//   catch (err:any) {
//     errors = err.errorsGql;
//     errorMessage = err.errorMessageGql;
//     console.log({ "errors": errors, "errorMessage": errorMessage })
//   }
  
// }) 
// }

// const handleDelete = async (_id: string) => {
//   var result: any = '', errorMessage = '', errors = new Array();
//   try {
//     result = await execGql('mutation', deleteRecommendation, { _id })
//     if (!result) {
//     console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
//     // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
//   }
//   else {
//     return result.data;
//   }
//   }catch (err:any) {
//     errors = err.errorsGql;
//     errorMessage = err.errorMessageGql;
//     console.log({ "errors": errors, "errorMessage": errorMessage })
//     // return callback({"errors":errors,"errorMessage":errorMessage},'' );
//   }
  
// }



const newDocument = () => {
  const newdoc={...initDocumentstatus}
  return {...newdoc,
    doctype: doctypes.RECOMMENDATION,
    doctypetext: 'Recommendation',
    validatemode: 'touch'
  }
};


// const initcurrdoc = {
//  cmpn:{}, applicationid: "15001500", client: "45004500", lang: "EN", doctype: "",
//   doctypetext: "", docnoprefix: "", _id: "", docno: "", validatemode: "", errorsAll: []
// }


// export async function getRecommendations(values: any) {
//   var result: any = '', errorMessage = '', errors = new Array();
//   try {
//     result = await execGql('query', recommendationsQuery, values)
//     if (!result) {
//       console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
//       return [];
//       // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
//     }
//     else {
//       //return result.data;
//       return result.data.recommendations;
//     }
//   }
//   catch (err:any) {
//     errors = err.errorsGql;
//     errorMessage = err.errorMessageGql;
//     console.log({ "errors": errors, "errorMessage": errorMessage })
//     // return callback({"errors":errors,"errorMessage":errorMessage},'' );
//   }
  
// }

export const handleSaveCheck = (currentdocument:any) => {
  const { touched, name, recodate, cmp, addupto, sl,target1,target2,weightage,timeframe,validatemode } = currentdocument;
  let isNew = false;
  let name_check = runCheck(nvl(name, ''), [requiredCheck]);
  let recodate_check = runCheck(nvl(recodate, ''), [requiredCheck]);
  let cmp_check = runCheck(nvl(cmp, ''), [requiredCheck]);
  let addupto_check = runCheck(nvl(addupto, ''), [requiredCheck]);
  let sl_check = runCheck(nvl(sl, ''), [requiredCheck]);
  let target1_check = runCheck(nvl(target1, ''), [requiredCheck]);
  let target2_check = runCheck(nvl(target2, ''), [requiredCheck])
  let weightage_check = runCheck(nvl(weightage, ''), [requiredCheck]);
  let timeframe_check = runCheck(nvl(timeframe, ''), [requiredCheck]);
  if (validatemode == 'save') {
    currentdocument.errorsAll = {
      name: name_check,
      recodate: recodate_check,
      cmp: cmp_check,
      addupto: addupto_check,

      sl: sl_check,
      target1: target1_check,
      target2: target2_check,
      weightage: weightage_check,
      timeframe: timeframe_check,
    }



  }


  if (validatemode == 'touch' && touched != null) {

    currentdocument.errorsAll = {
      name: checkTouched(nvl(touched.name, false), name_check),
      recodate: checkTouched(nvl(touched.username, false), recodate_check),
      cmp: checkTouched(nvl(touched.password, false), cmp_check),
      addupto: checkTouched(nvl(touched.repeatpassword, false), addupto_check),
      sl: checkTouched(nvl(touched.name, false), sl_check),
      target1: checkTouched(nvl(touched.username, false), target1_check),
      target2: checkTouched(nvl(touched.password, false), target2_check),
      weightage: checkTouched(nvl(touched.repeatpassword, false), weightage_check),
      timeframe: checkTouched(nvl(touched.repeatpassword, false), timeframe_check),

    }
  }

  return currentdocument;
}
const initDocumentstatus = {
  docconfig: {},
  currentdocument: {},
  action: false,
  snackbaropen: false,
  snackbarseverity: '',
  handlesnackbarclose: () => { },
  snackbartext: '',
  yesaction: () => { },
  noaction: () => { },
  redirect: false,
  goback: false,
  dailogtitle:"",
  dailogtext:""
}
const timeframeoptions = [{ 'key': '3-6', 'value': '3-6 mth' }, { 'key': '6-9', 'value': '6-9 mth' }, { 'key': '9-12', 'value': '9-12 mth' }]

export const RecommendationComponent = (props: any) => {
  const [currentdocument, modifydocument] = useState({})
  const [documentstatus, setDocumentstatus] = useState(initDocumentstatus)
  const [redirect, goBack] = useState(false)
  const closeSnackBar=()=>{
    let docstatus={...documentstatus}
      docstatus.snackbaropen=false;
    setDocumentstatus(docstatus)
  }
     useEffect(() => {
      const { currentcmpn, deleteDocument, saveDocument, docnos, users, addusers } = props;
      let _id=new URLSearchParams(props.location.search).get("_id")

       if(_id!='NO-ID')
        {
           getRecommendations({applicationid:'15001500',client:'45004500',lang: 'EN', _id}).then((data:any)=>{ 
                modifydocument(data[0])
            });
        
        }

        if(_id=='NO-ID')
        {   
            modifydocument(newDocument())
        }
         
        return () => {
            
        }
    }, [props._id])
  const setDocumentAction = async (action: string) => {
    const { currentcmpn, deleteDocument, saveDocument, docnos, users, addusers } = props;
    let currentDoc:any = { ...currentdocument }
    currentDoc.doctype = doctypes.RECOMMENDATION;
    currentDoc.doctypetext="Recommendation"
    const { doctypetext, docnoprefix, doctype } = currentDoc;
    let action_type = '';

    let isNew = false;
    if (action == 'save_new') {
      action_type = 'save';
      isNew = true;
    }
    else {
      action_type = action
    }
    let docstatus = {...documentstatus}
    switch (action_type) {
      case 'delete':
        docstatus = {...documentstatus}
        docstatus.action= true;
        docstatus.dailogtitle= doctypetext + ' Deletion';
        docstatus.dailogtext= 'Delete ' + doctypetext + '?'
        docstatus.yesaction= async () => {
         
          await handleDelete(currentDoc._id)
          let newdoc:any = newDocument();
          modifydocument(newdoc)
            docstatus.action= false;
            docstatus.snackbaropen=true;
            docstatus.snackbarseverity='success';
            docstatus.snackbartext= doctypetext + ' Deleted'
            setDocumentstatus({...docstatus})
        }
        docstatus.noaction= () => {
          docstatus.action = false;
          setDocumentstatus({...docstatus})
        }
        setDocumentstatus(docstatus);
        break;

      case 'clear':
        docstatus = {...documentstatus}
        docstatus.action= true,
        docstatus.dailogtitle= ' Clear ' + doctypetext,
        docstatus.dailogtext = 'Clear un-saved  ' + doctypetext + '?',
        docstatus.yesaction = () => {
            let newcurdoc:any = newDocument()
            modifydocument(newcurdoc)
            docstatus.action= false
            docstatus.snackbaropen= true
            docstatus.snackbarseverity= 'success',
            docstatus.snackbartext= doctypetext + ' Cleared'
            setDocumentstatus(docstatus);
          },
          docstatus.noaction= () => {
            docstatus.action= false
            setDocumentstatus(docstatus);
          }
          setDocumentstatus(docstatus);
        
        break;

      case 'save':
        currentDoc.validatemode = 'save';
        currentDoc = handleSaveCheck(currentDoc);
        let isSaveOk = !Object.keys(currentDoc.errorsAll).some((x: any) => currentDoc.errorsAll[x]);
        currentDoc = getDocumenForSave(currentDoc)
        if (!isSaveOk) {
          modifydocument({...currentDoc})
          docstatus.snackbaropen = true
          docstatus.snackbarseverity = 'error'
          docstatus.snackbartext = 'Errors found'
          setDocumentstatus(docstatus);
        }
        else {
           if ( currentDoc.t_id ||currentDoc.t_id === '') {
             currentDoc.t_id = shortid.generate();
           }
          if (isNew) {
            
            await handleSave(currentDoc)
            modifydocument(newDocument())
          }
          else {
            let retdoc:any=await handleSave(currentDoc)
            modifydocument({...retdoc.saveRecommendation})
          }
          docstatus.snackbaropen = true;
          docstatus.snackbarseverity = 'success';
          docstatus.snackbartext = doctypetext + ' Saved';
          setDocumentstatus(docstatus);
        }
        break;
    }
  }
  const {action,yesaction,noaction,dailogtext,dailogtitle} = documentstatus;
  if(redirect){
    let redirectpath='/Recommendations'
    return <Redirect push to={redirectpath} />;   
  }else
  return (
    <>
    <div className="container">
      <div className="grid">
        <div className="row">
          <FlatInput wd="3" label="Name" name="name" currdoc={currentdocument} section={'name'} modifydoc={modifydocument} />
          <DatePicker wd="3" label="Recommendation Date"  name="recodate"  currdoc={currentdocument} section={'recodate'} modifydoc={modifydocument} />
          <FlatInput wd="3" label="Current market price" name="cmp" currdoc={currentdocument} section={'cmp'} modifydoc={modifydocument} />
          <div className={"col-3"}></div>
        </div>
        <div className="row">
        <FlatInput wd="3" label="Add Up To" name="addupto" currdoc={currentdocument} section={'addupto'} modifydoc={modifydocument} />
        <FlatInput wd="3" label="Stop Loss" name="sl" currdoc={currentdocument} section={'sl'} modifydoc={modifydocument} />
        <div className={"col-6"}></div>
        </div>
        <div className="row">
          <FlatInput wd="3" label="Target 1" name="target1" currdoc={currentdocument} section={'target1'} modifydoc={modifydocument} />
          <FlatInput wd="3" label="Target 2" name="target2" currdoc={currentdocument} section={'target2'} modifydoc={modifydocument} />
          <FlatInput wd="3" label="Target 3" name="target3" currdoc={currentdocument} section={'target3'} modifydoc={modifydocument} />
          <div className={"col-3"}></div>
        </div>
        <div className="row">
          <FlatInput wd="3" label="Target 4" name="target4" currdoc={currentdocument} section={'target4'} modifydoc={modifydocument} />
          <FlatInput wd="3" label="Target 5" name="target5" currdoc={currentdocument} section={'target5'} modifydoc={modifydocument} />
          <FlatInput wd="3" label="Target 6" name="target6" currdoc={currentdocument} section={'target6'} modifydoc={modifydocument} />
          <div className={"col-3"}></div>
        </div>
        
        <div className="row">
          <FlatInput wd="3" label="Target 7" name="target7" currdoc={currentdocument} section={'target7'} modifydoc={modifydocument} />
          <FlatInput wd="3" label="Target 8" name="target8" currdoc={currentdocument} section={'target8'} modifydoc={modifydocument} />
          <FlatInput wd="3" label="Target 9" name="target9" currdoc={currentdocument} section={'target9'} modifydoc={modifydocument} />
          <div className={"col-3"}></div>

        </div>
        <div className="row">  
          <FlatInput wd="3" label="Weightage" name="weightage" currdoc={currentdocument} section={'weightage'} modifydoc={modifydocument} /> 
          <SelectInput wd="3" label="Time Frame" options={timeframeoptions} name="timeframe" currdoc={currentdocument} section={'timeframe'} modifydoc={modifydocument} />

          <div className={"col-3"}></div>
          <div className={"col-3"}></div>
        </div>
       
          
      </div>
      <AlertDialog open={action}  handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle}/>           
      <Messagesnackbar snackbaropen={documentstatus.snackbaropen} snackbarseverity={documentstatus.snackbarseverity} handlesnackbarclose={closeSnackBar} snackbartext={documentstatus.snackbartext}/>
                    
    </div>
    <AppbarBottom setAction={setDocumentAction} handleGoback={goBack}/>
    </>
  )
}
export default withRouter(RecommendationComponent)
