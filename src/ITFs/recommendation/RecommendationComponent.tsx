import  { useState,useEffect,useMemo,useRef } from 'react' 
import DatePicker from '../common/DatePicker/DatePicker'
import { FlatInput } from '../common/InputFields/Input/Input'
import { SelectInput } from '../common/InputFields/Select/Select'
import { SearchSelectInput } from '../common/InputFields/Select/SearchSelect'
import * as doctypes from '../common/Doctypes';
import { getDocs, getDocconfig, getLblVal, checkTouched, nvl, checkItem, isCheckedbool, getDocumenForSave } from '../common/CommonLogic';
import useSaveAction from '../Hooks/useSaveAction'
import {handleDelete, getRecommendations,handleSave} from './CrudRecommendation'
import Messagesnackbar from '../common/Alert/Alert'
import AlertDialog from '../common/PopupModals/ConfirmationModal'
import {runCheck,requiredCheck,getDtFormat,getTimeFormat,getFromToDate,getDateYYYYMMDDHHMI,getDateYYYYMMDD,maxLength40,maxLength128,
  setErrorValue,getValue,setValue} from '../common/validationlib';
 import {Redirect,withRouter } from 'react-router-dom'
import AppbarBottom from '../common/AppBarBottom/AppbarBottom'
import {initDocumentstatus,newDocument} from '../common/constant'
import {fetchStocks,addstocks} from '../Redux/ActionCreators'
import { connect } from 'react-redux';
import  * as ActionTypes from '../Redux/ActionTypes'
import Loader from '../common/Loader/Loader'

export const handleSaveCheck = (currentdocument:any) => {
  const { touched, name, recodate, cmp, addupto, sl,target1,target2,weightage,timeframe,validatemode } = currentdocument;
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

const timeframeoptions = [{ 'key': '3-6', 'value': '3-6 mth' }, { 'key': '6-9', 'value': '6-9 mth' }, { 'key': '9-12', 'value': '9-12 mth' }]

export const RecommendationComponent = (props: any) => {
  const compinp:any=useRef(0)
  const doctype= doctypes.RECOMMENDATION;
  const doctypetext= 'Recommendation';
  const resetFocus =()=>{
    setTimeout(()=>compinp.current.focus(),1000)
   }
  const [setDocumentAction,documentstatus,setDocumentstatus,currentdocument,modifydocument,redirect, goBack,closeSnackBar,loaderDisplay, setloaderDisplay]:any = useSaveAction(handleDelete, handleSave,handleSaveCheck,doctype,doctypetext,resetFocus)
  const [stocklist, setstocklist] = useState([])
  
     useEffect(() => {
      let _id=new URLSearchParams(props.location.search).get("_id")
      compinp.current.focus()
       if(_id!='NO-ID'){
        setloaderDisplay(!loaderDisplay)
           getRecommendations({applicationid:'15001500',client:'45004500',lang: 'EN', _id}).then((data:any)=>{ 
                modifydocument(data[0])
                setloaderDisplay(loaderDisplay)
            });
        }
        if(_id=='NO-ID'){modifydocument(newDocument(doctype,doctypetext))}        
    }, [])
const getStockcmp=()=>{
  setloaderDisplay(!loaderDisplay);compinp.current.focus()
    fetchStocks({},

(err:any,result:any):any=> {
            if(err=='') {  console.log(result); props.addstocks(result);setloaderDisplay(!loaderDisplay)  }
            else   {console.log(err,result)} })
          }
   
  const {action,yesaction,noaction,dailogtext,dailogtitle} = documentstatus;
  if(stocklist && props?.stocks && stocklist?.length !== props?.stocks?.length){
    setstocklist(props.stocks.map((el:any) => { return { value: el.name,  label: el.name}}));  
    }
    const M_stocklist =useMemo(() => stocklist, [stocklist])
  if(redirect){
    let redirectpath='/Recommendations'
    return <Redirect push to={redirectpath} />;   
  }else
  return (
    <>
    <Loader display={loaderDisplay}/>
    <div className="container">
      <div className="grid">
      {/* <div className="row">
      <button onClick={ ()=>{setloaderDisplay(true);compinp.current.focus()
      fetchStocks({},

(err:any,result:any):any=> {
              if(err=='') {  console.log(result); props.addstocks(result);setloaderDisplay(false)  }
              else   {console.log(err,result)} })}
     }>
  Get Stocks
</button>
        </div> */}
        <div className="row">
        <SearchSelectInput inpref={compinp} wd="3" label="" options={M_stocklist} name="name" currdoc={currentdocument} section={'name'} modifydoc={modifydocument} refresh={getStockcmp}/>
          <DatePicker wd="3" label="Recommendation Date"  name="recodate"  currdoc={currentdocument} section={'recodate'} modifydoc={modifydocument} format="yyyymmdd"/>
          <FlatInput wd="3" label="Current market price" name="cmp" currdoc={currentdocument} section={'cmp'} modifydoc={modifydocument} />
          <div className={"col-3"}></div>
        </div>
        <div className="row">
        <FlatInput wd="3" label="Add Up To" name="addupto" currdoc={currentdocument} section={'addupto'} modifydoc={modifydocument} />
        <FlatInput wd="3" label="Stop Loss" name="sl" currdoc={currentdocument} section={'sl'} modifydoc={modifydocument} />
        <div className={"col-6"}></div>
        </div>
        <div className="row">  
          <FlatInput wd="3" label="Weightage" name="weightage" currdoc={currentdocument} section={'weightage'} modifydoc={modifydocument} /> 
          <SelectInput wd="3" label="Time Frame" options={timeframeoptions} name="timeframe" currdoc={currentdocument} section={'timeframe'} modifydoc={modifydocument} />
          <div className={"col-3"}></div>
          <div className={"col-3"}></div>
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
                  
      </div>
      <AlertDialog open={action}  handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle}/>           
      <Messagesnackbar snackbaropen={documentstatus.snackbaropen} snackbarseverity={documentstatus.snackbarseverity} handlesnackbarclose={closeSnackBar} snackbartext={documentstatus.snackbartext}/>                    
    </div>
    <AppbarBottom setAction={setDocumentAction} handleGoback={goBack} setfocus={resetFocus}/>
    </>
  )
}

const mapDispatchToProps = (dispatch:any) => ({
  addstocks: (stocks:any,callback:any) => {console.log(addstocks(stocks)) ;dispatch(addstocks(stocks));   
    if(callback && typeof callback === "function") {
callback();
}}
})

const mapStateToProps = (state:any) => {
  console.log('state',state)
  return {
      stocks: state.stocks.stocks.stocks,

  }
}



export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(RecommendationComponent));

