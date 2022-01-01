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
import useSaveAction from '../Hooks/useSaveAction'
import Loader from '../common/Loader/Loader'
import {initDocumentstatus,newDocument} from '../common/constant'
import {runCheck,requiredCheck,getDtFormat,getTimeFormat,getFromToDate,getDateYYYYMMDDHHMI,getDateYYYYMMDD,maxLength40,maxLength128,setErrorValue,getValue,setValue} from '../common/validationlib';
 import {Redirect,withRouter } from 'react-router-dom'
import AppbarBottom from '../common/AppBarBottom/AppbarBottom'
const usexoptions = [{ 'key': 'M', 'value': 'Male' }, { 'key': 'F', 'value': 'Female' }, { 'key': 'NTD', 'value': 'Not disclosed' }]
const countryoptions = [{ 'key': 'IN', 'value': 'India' }, { 'key': 'GE', 'value': 'Germany' }, { 'key': 'US', 'value': 'USA' }]
const handleSave = async (currentdocument: any) => {
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
const handleDelete = async (_id: string) => {
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
export const UserComponent = (props: any) => {
  const doctype= doctypes.USER;
  const doctypetext= 'Username';
     useEffect(() => {
      let _id=new URLSearchParams(props.location.search).get("_id")
       if(_id!='NO-ID')
        {
         const curdoc= props.users.find((document:any)=>document._id==_id)
         modifydocument(curdoc)
        }
        if(_id=='NO-ID'){modifydocument(newDocument(doctype,doctypetext))}
        return () => {      
        }
    }, [])
    const [setDocumentAction,documentstatus,setDocumentstatus,currentdocument,modifydocument,redirect, goBack,closeSnackBar]:any = useSaveAction(handleDelete, handleSave,handleSaveCheck,doctype,doctypetext)

  
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
          
      </div>
    <AlertDialog open={action} handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle} /> 
    <Messagesnackbar snackbaropen={documentstatus.snackbaropen} snackbarseverity={documentstatus.snackbarseverity} handlesnackbarclose={closeSnackBar} snackbartext={documentstatus.snackbartext}/>                
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
