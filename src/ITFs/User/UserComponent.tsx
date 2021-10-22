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
import { deleteDocument,saveDocument,addusers } from '../Redux/ActionCreators'
import deleteUser from '../mutations/deleteUsername';
import { execGql, execGql_xx } from '../gqlclientconfig';
import usersQuery from '../queries/usersQuery'
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


const usexoptions = [{ 'key': 'M', 'value': 'Male' }, { 'key': 'F', 'value': 'Female' }, { 'key': 'NTD', 'value': 'Not disclosed' }]
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
    doctype: doctypes.USER,
    doctypetext: 'User',
    docno: docno,
    status: 'active',
    validatemode: 'touch'
  }
};


const initcurrdoc = {
 cmpn:{}, applicationid: "15001500", client: "45004500", lang: "EN", doctype: "",
  doctypetext: "", docnoprefix: "", _id: "", docno: "", validatemode: "", errorsAll: []
}


export async function getUsers1(values: any) {
  var result: any = '', errorMessage = '', errors = new Array();
  try {
    result = await execGql('query', usersQuery, values)
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
    return result.data.users;
  }
}

export const handleSaveCheck = (currentdocument:any, users:any) => {
  const { touched, username, firstname, password, repeatpassword, validatemode } = currentdocument;
  let isNew = false;
  let username_check = runCheck(nvl(username, ''), [requiredCheck]);
  let firstname_check = runCheck(nvl(firstname, ''), [requiredCheck]);
  let password_check = runCheck(nvl(password, ''), [requiredCheck]);
  let repeatpassword_check = runCheck(nvl(repeatpassword, ''), [requiredCheck]);
  if (password_check == '' && repeatpassword_check == '') {
    if (password != repeatpassword)
      password_check = 'Password & Repeat Password should be same'
  }


  let docid:string;

  if (currentdocument._id == null || currentdocument._id == '') {
    docid = 'NO-ID'
  }
  else {
    docid = currentdocument._id
  }


  if (users != null) {

    users.forEach(
      (user:any) => {
        if (user.username == username && user._id != docid && username_check == '') {
          username_check = 'Username already in Use';
        }
      }
    )

  }




  if (validatemode == 'save') {
    currentdocument.errorsAll = {
      firstname: firstname_check,
      password: password_check,
      username: username_check,
      repeatpassword: repeatpassword_check
    }



  }


  if (validatemode == 'touch' && touched != null) {

    currentdocument.errorsAll = {
      firstname: checkTouched(nvl(touched.firstname, false), firstname_check),
      username: checkTouched(nvl(touched.username, false), username_check),
      password: checkTouched(nvl(touched.password, false), password_check),
      repeatpassword: checkTouched(nvl(touched.repeatpassword, false), repeatpassword_check)

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
export const UserComponent = (props: any) => {
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
            const curdoc= props.users.find((document:any)=>document._id==_id)
         modifydocument(curdoc)
        }

        if(_id=='NO-ID')
        {   
            let docno= getDocNo(currentcmpn,doctypes.USER,'',docnos)
            modifydocument(newDocument(currentcmpn,docno))
        }
         
        return () => {
            
        }
    }, [props._id])
  const setDocumentAction = async (action: string) => {
    const { currentcmpn, deleteDocument, saveDocument, docnos, users, addusers } = props;
    let currentDoc:any = { ...currentdocument }
    currentDoc.doctype = doctypes.USER;
    currentDoc.doctypetext="User"
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
         let a= await handleDeleteuser(currentDoc._id)
          let newdoc:any = newDocument(currentcmpn, docno);
          modifydocument(newdoc)
          getUsers1({ applicationid: '15001500', client: '45004500', lang: 'EN' })
            .then(users => {
              addusers(users)
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
        currentDoc = handleSaveCheck(currentDoc, users);
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
            await handleSaveuser(currentDoc, modifydocument(newDocument(currentcmpn, nextdocno)))

            getUsers1({ applicationid: '15001500', client: '45004500', lang: 'EN' }).then(users => {
              addusers(users)
            }).catch(err => { console.log(err) })
          }
          else {
            await handleSaveuser(currentDoc)
            modifydocument(currentDoc)
            getUsers1({ applicationid: '15001500', client: '45004500', lang: 'EN' })
              .then(users => {
                addusers(users)
              })
              .catch(err => { console.log(err) })
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
    let redirectpath='/Users'
    return <Redirect push to={redirectpath} />;

     
  }else
  return (
    <>
    <div className="container">
      <div className="grid">
        <div className="row">

          <FlatInput wd="3" label="First Name" name="firstname" currdoc={currentdocument} section={'firstname'} modifydoc={modifydocument} />
          <FlatInput wd="3" label="Last Name" name="lastname" currdoc={currentdocument} section={'lastname'} modifydoc={modifydocument} />
          <FlatInput wd="6" label="Display Name" name="displayname" currdoc={currentdocument} section={'displayname'} modifydoc={modifydocument} />
        </div>
        <div className="row">
          <FlatInput wd="3" label="User Name" name="username" currdoc={currentdocument} section={'username'} modifydoc={modifydocument} />
          <FlatInput wd="3" label="Password" name="password" currdoc={currentdocument} section={'password'} modifydoc={modifydocument} />
          <FlatInput wd="3" label="Re-Type Password" name="password" currdoc={currentdocument} section={'repeatpassword'} modifydoc={modifydocument} />
          <div className={"col-3"}></div>
        </div>
        <div className="row">
          <FlatInput wd="3" label="Email" name="email" currdoc={currentdocument} section={'email'} modifydoc={modifydocument} />
          <FlatInput wd="3" label="Mobile" name="mobile" currdoc={currentdocument} section={'mobile'} modifydoc={modifydocument} />
          <FlatInput wd="3" label="Phone No." name="phone" currdoc={currentdocument} section={'phone'} modifydoc={modifydocument} />
          <div className={"col-3"}></div>
        </div>
        <div className="row">
          <SelectInput wd="3" label="User Sex" options={usexoptions} name="usex" currdoc={currentdocument} section={'usex'} modifydoc={modifydocument} />
          {/* <DatePicker wd="3" label="Date of birth"  name="dateofbirth"  currdoc={currentdocument} section={'dateofbirth'} modifydoc={modifydocument} /> */}
          <div className={"col-6"}></div>
          <div className={"col-3"}></div>
        </div>
        <div className="row">
          <FlatInput wd="12" label="Address" name="address" currdoc={currentdocument} section={'address'} modifydoc={modifydocument} />
        </div>
        <div className="row">
          <FlatInput wd="3" label="Pin Code" name="pincode" currdoc={currentdocument} section={'pincode'} modifydoc={modifydocument} />
          <FlatInput wd="3" label="City" name="city" currdoc={currentdocument} section={'city'} modifydoc={modifydocument} />
          <FlatInput wd="3" label="State" name="state" currdoc={currentdocument} section={'state'} modifydoc={modifydocument} />
          <SelectInput wd="3" label="Country" options={countryoptions} name="country" currdoc={currentdocument} section={'country'} modifydoc={modifydocument} />

        </div>
        {/* <div className="row"><Button
          wd="2"
          label="Clear"
          name="register"
          className="btn-deault btn-small"
        />
        <Button
          wd="2"
          label="Back"
          name="back"
          className="btn-deault btn-small"
          onClick={()=>goBack(true)}
        />
          <Button
            wd="2"
            label="Delete"
            name="delete"
            className="btn1 btn-small"
           onClick={()=>setDocumentAction('delete')}
           />
          <Button
            wd="2"
            label="Register"
            name="register"
            className="btn1 btn-small"
           onClick={setDocumentAction}
           
          />
          </div> */}
          
      </div>
 <AlertDialog 
                    open={action}  
                    handleno={noaction}
                    handleyes={yesaction}
                    dailogtext={dailogtext}
                    dailogtitle={dailogtitle}

                    /> 
                


                    <Messagesnackbar 
                     snackbaropen={documentstatus.snackbaropen}
                     snackbarseverity={documentstatus.snackbarseverity}
                     handlesnackbarclose={closeSnackBar}
                     snackbartext={documentstatus.snackbartext}
                    />
                    
    </div>
    <AppbarBottom setAction={setDocumentAction} handleGoback={goBack}/>
    </>
  )
}

const mapStateToProps = (state: any) => {

  return({
  users:state.documents.users,
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


    addusers: (users:any,callback:any) => { dispatch(addusers(users));   
    if(callback && typeof callback === "function") {
callback();
}}

  
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserComponent))
