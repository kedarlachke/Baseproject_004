import React, { useState,useEffect } from 'react'
import { AnyIfEmpty, connect } from 'react-redux'
import { Button } from '../common/Button/Button'
import DatePicker from '../common/DatePicker/DatePicker'
import { FlatInput } from '../common/InputFields/Input/Input'
import { SelectInput } from '../common/InputFields/Select/Select'
import * as doctypes from '../common/Doctypes';
import saveUser from '../mutations/saveUsername'
import { getDocs, getDocconfig, getLblVal, checkTouched, nvl, checkItem, isCheckedbool, getDocumenForSave } from '../common/CommonLogic';
import shortid from 'shortid'
import { deleteDocument,saveDocument,addrecommendations } from '../Redux/ActionCreators'
import deleteUser from '../mutations/deleteUsername';
import { execGql, execGql_xx } from '../gqlclientconfig';
//import recommendationsQuery from '../queries/recommendationsQuery'
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


const timeframeoptions = [{ 'key': '3-6', 'value': '3-6 mth' }, { 'key': '6-9', 'value': '6-9 mth' }, { 'key': '9-12', 'value': '9-12 mth' }]
const countryoptions = [{ 'key': 'IN', 'value': 'India' }, { 'key': 'GE', 'value': 'Germany' }, { 'key': 'US', 'value': 'USA' }]

const handleSaveuser = async (currentdocument: any) => {
  var result: any = '', errorMessage = '', errors = new Array();
  try {
    let userForSave = {
      email: nvl(currentdocument.email, ''),
      password: nvl(currentdocument.password, ''),
      applicationid: '15001500',
      client: '45004500',
      lang: 'EN',
      mobile: nvl(currentdocument.mobile, ''),
      username: nvl(currentdocument.username, ''),
      firstname: nvl(currentdocument.firstname, ''),
      lastname: nvl(currentdocument.lastname, ''),
      userauthorisations: nvl(currentdocument.userauthorisations, ''),
      authorisations: nvl(currentdocument.authorisations, ''),
      status: nvl(currentdocument.status, '')
    }
    result = await execGql('mutation', saveUser, userForSave)
  }
  catch (err:any) {
    errors = err.errorsGql;
    errorMessage = err.errorMessageGql;
    console.log({ "errors": errors, "errorMessage": errorMessage })
    // return callback({"errors":errors,"errorMessage":errorMessage},'' );
  }
  if (!result) {
    console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
    // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
  }
  else {
    return result.data;
  }
}

const handleDeleteuser = async (_id: string) => {
  var result: any = '', errorMessage = '', errors = new Array();
  try {
    result = await execGql('mutation', deleteUser, { _id })
    if (!result) {
    console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
    // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
  }
  else {
    return result.data;
  }
  }
  catch (err:any) {
    errors = err.errorsGql;
    errorMessage = err.errorMessageGql;
    console.log({ "errors": errors, "errorMessage": errorMessage })
    // return callback({"errors":errors,"errorMessage":errorMessage},'' );
  }
  
}

const getDocNo = (currentcmpn: any, doctype: string, docnoprefix: string, docnos: any) => {
  var docno = '1';
  var i;
  if (docnos != null) {
    for (i = 0; i < docnos.length; i++) {
      if (docnos[i].cmpn == currentcmpn && docnos[i].doctype == doctype && docnos[i].docnoprefix == docnoprefix) {
        docno = docnos[i].docno;
        docno = (parseInt(docno) + 1).toString();
      }
    }
  }
  return docno;
}

const newDocument = (cmpn: any, docno: string) => {
  const newdoc={...initDocumentstatus}
  return {...newdoc,
    cmpn: cmpn,
    doctype: doctypes.RECOMMENDATION,
    doctypetext: 'Recommendation',
    docno: docno,
    status: 'active',
    validatemode: 'touch'
  }
};


const initcurrdoc = {
 cmpn:{}, applicationid: "15001500", client: "45004500", lang: "EN", doctype: "",
  doctypetext: "", docnoprefix: "", _id: "", docno: "", validatemode: "", errorsAll: []
}


export async function getrecommendations1(values: any) {
  var result: any = '', errorMessage = '', errors = new Array();
  try {
    result = await execGql('query', recommendationsQuery, values)
  }
  catch (err:any) {
    errors = err.errorsGql;
    errorMessage = err.errorMessageGql;
    console.log({ "errors": errors, "errorMessage": errorMessage })
    // return callback({"errors":errors,"errorMessage":errorMessage},'' );
  }
  if (!result) {

    console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
    return [];

    // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
  }
  else {
    //return result.data;
    return result.data.recommendations;
  }
}

export const handleSaveCheck = (currentdocument:any, recommendations:any) => {
  const { touched, username, firstname, password, repeatpassword, validatemode } = currentdocument;
  let isNew = false;
  let name_check = ''//runCheck(nvl(username, ''), [requiredCheck]);
  let sl_check = ''//runCheck(nvl(firstname, ''), [requiredCheck]);
 

  let docid:string;

  if (currentdocument._id == null || currentdocument._id == '') {
    docid = 'NO-ID'
  }
  else {
    docid = currentdocument._id
  }


  // if (recommendations != null) {

  //   recommendations.forEach(
  //     (user:any) => {
  //       if (user.username == username && user._id != docid && username_check == '') {
  //         username_check = 'Username already in Use';
  //       }
  //     }
  //   )

  // }




  if (validatemode == 'save') {
    currentdocument.errorsAll = {
      name: name_check,
      sl: sl_check,
    }



  }


  if (validatemode == 'touch' && touched != null) {

    currentdocument.errorsAll = {
      name: checkTouched(nvl(touched.name, false), name_check),
      sl: checkTouched(nvl(touched.sl, false), sl_check),
  

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
      const { currentcmpn, deleteDocument, saveDocument, docnos, recommendations, addrecommendations } = props;
      let _id=new URLSearchParams(props.location.search).get("_id")

       if(_id!='NO-ID')
        {
            const curdoc= props.recommendations.find((document:any)=>document._id==_id)
         modifydocument(curdoc)
        }

        if(_id=='NO-ID')
        {   
            let docno= getDocNo(currentcmpn,doctypes.RECOMMENDATION,'',docnos)
            modifydocument(newDocument(currentcmpn,docno))
        }
         
        return () => {
            
        }
    }, [props._id])
  const setDocumentAction = async (action: string) => {
    const { currentcmpn, deleteDocument, saveDocument, docnos, recommendations, addrecommendations } = props;
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
          let docno = getDocNo(currentcmpn, doctype, '', docnos)
         
          //await handleDeleteuser(currentDoc._id)
          deleteDocument(currentDoc._id)
          let newdoc:any = newDocument(currentcmpn, docno);
          modifydocument(newdoc)
          getrecommendations1({ applicationid: '15001500', client: '45004500', lang: 'EN' })
            .then(recommendations => {
              addrecommendations(recommendations)
            })
            .catch(err => { console.log(err) })
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
            let docno = getDocNo(currentcmpn, doctype, '', docnos)
            let newcurdoc:any = newDocument(currentcmpn, docno)
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
        currentDoc = handleSaveCheck(currentDoc, recommendations);
        let isSaveOk = !Object.keys(currentDoc.errorsAll).some((x: any) => currentDoc.errorsAll[x]);
        currentDoc = getDocumenForSave(currentDoc)
        if (!isSaveOk) {
          modifydocument(currentDoc)
          docstatus.snackbaropen = true
          docstatus.snackbarseverity = 'error'
          docstatus.snackbartext = 'Errors found'
          setDocumentstatus(docstatus);
        }
        else {
          if (currentDoc._id == '' || currentDoc._id == null) {
            currentDoc._id = shortid.generate();
          }
          if (isNew) {
            let nextdocno = '';
            let dbdocno = getDocNo(currentcmpn, doctype, docnoprefix, "");

            if (parseFloat(currentDoc.docno) + 1 >= parseFloat(dbdocno)) {
              nextdocno = (parseFloat(currentDoc.docno) + 1).toString()
            }
            else {
              nextdocno = dbdocno
            }
            await saveDocument(currentDoc)

            // getrecommendations1({ applicationid: '15001500', client: '45004500', lang: 'EN' }).then(recommendations => {
            //   addrecommendations(recommendations)
            // }).catch(err => { console.log(err) })
          }
          else {
            await saveDocument(currentDoc)
            modifydocument(currentDoc)
            // getrecommendations1({ applicationid: '15001500', client: '45004500', lang: 'EN' })
            //   .then(recommendations => {
            //     addrecommendations(recommendations)
            //   })
            //   .catch(err => { console.log(err) })
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

const mapStateToProps = (state: any) => {
  const recdoc = state?.documents?.documents?.filter((document:any) => document.doctype==doctypes.RECOMMENDATION )

  return({
  recommendations:recdoc,
  currentcmpn:state.documents.currentcmpn,
  docnos:state.documents.docnos,
  companies:state.documents.companies,
  //transactionconfig:state.configs.configs[state.documents.currentcmpn][doctypes.INV001],
})}

const mapDispatchToProps = (dispatch: any) => {
  return {
            
    deleteDocument: (document:any,callback:any) => {dispatch(deleteDocument(document));   
      if(callback && typeof callback === "function") {
  callback();
  }},
  
  
    saveDocument:(document:any,callback:any) => {dispatch(saveDocument(document)); 
      if(callback && typeof callback === "function") {
        callback();
    } },


//     addrecommendations: (recommendations:any,callback:any) => { dispatch(addrecommendations(recommendations));   
//     if(callback && typeof callback === "function") {
// callback();
// }}

  
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecommendationComponent))
