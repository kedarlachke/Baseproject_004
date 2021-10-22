import shortid from 'shortid'
//import {store as store1} from '../redux/configureStore';

import { getValue,getDateYYYYMMDDHHMISS } from './validationlib';

export const getDocumenForSave=(document:any)=>
{
  let documentForSave=document;
  if(documentForSave._id=='' || documentForSave._id==null )
      {
        documentForSave._id=shortid.generate();
      }
      let datetime=getDateYYYYMMDDHHMISS(new Date());
      let date=datetime.substring(0, 8)
      let time=datetime.substring(8, 14)
    
      if( documentForSave.createatdate==null || documentForSave.createatdate==''  )
      {
     

        documentForSave.createatdate=date;
        documentForSave.createattime=time;
      }
      else
      {
        

        documentForSave.updateatdate=date;
        documentForSave.updateattime=time;  
      }
      return documentForSave;
}



export const checkItem=(text:any,arr1:any)=>{
  let arr = [...arr1]
let index=arr.findIndex((arrelement,i)=>(text==arrelement));

if(index==-1){
  arr.push(text);
}else{
  
  arr.splice(index,1)
 }
return arr.join()
}  



export  const isChecked = (text:any,arr:any) =>
{
     let checked='unchecked'
     let index =arr.findIndex((itemtext:any)=>(itemtext==text))
     if(index>-1)
     checked='checked'
     return checked
}


export  const isCheckedbool = (text:any,arr:any) =>
{
     let checked=false
     let index =arr.findIndex((itemtext:any)=>(itemtext==text))
     if(index>-1)
     checked=true
     return checked
}



export const  searchDataList = (query:any,data_list:any,field:any) =>
{
  if (query === '') {
    //if the query is null then return blank
    return [];
  }
  const regex = new RegExp(`${query.trim()}`, 'i');
  return data_list.filter((item:any) => {  if(item[field]==null)item[field]='';    
                                     return item[field].search(regex) >= 0 }) ;
}


export const  saveItemGeneric = (item:any,arr:any) =>{
  let retarr=[];
  retarr=[...arr];

      if(item._id==null || item._id=='')
      {
          item._id = shortid.generate();
          retarr.push(item)
      }
      else
      {
     
          let index= arr.findIndex((record:any)=>record._id==item._id);
          retarr[index]=item;    
      }
    return retarr;  

}

export const  saveItemGeneric1 = (item1:any,arr:any) =>{
  let retarr=[];
  let item=JSON.parse(JSON.stringify(item1))
  retarr=[...arr];

      if(item._id==null || item._id=='')
      {
          item._id = shortid.generate();
          retarr.push(item)
      }
      else
      {
          let index= arr.findIndex((record:any)=>record._id==item._id);
          if(index==-1)
          {
            retarr.push(item)
          }
          else
          {
            retarr[index]=item;    
          }
      }
    return retarr;  

}


export const  deleteItemGeneric = (item:any,arr:any) =>
{
  let retarr=[];
  retarr=[...arr];

  return retarr.filter((record) => (record._id!=item._id ))
}

export const filterCompanyData=(arr:any,cmpn:any)=>
{
  var arr_cmpn:any=[];
  arr.forEach((obj:any)=>{
           if(obj.cmpn==cmpn) 
            {arr_cmpn.push(obj)}
      }
      )

 return  arr_cmpn;
}


export const getDocs=(arr:any,cmpn:any,doctype:any)=>
{
  var arr_cmpn:any=[];

  arr.forEach((obj:any)=>{

           if(obj.cmpn==cmpn && obj.doctype==doctype  && obj.doctype!='COMPANY') 
            {
              arr_cmpn.push(obj)
            }
            else if(obj.doctype=='COMPANY' && doctype=='COMPANY')
            {
              arr_cmpn.push(obj)
            }
 
      }
      )
  
 return  arr_cmpn;
}


export const  getDocNo=  (currentcmpn:any,doctype:any,docnoprefix:any,docnos:any)=>
{

  //const state1 = store1.getState();
  //docnos1=state1.documents.docnos;

  //alert(JSON.stringify(docnos1))
  // console.log('currentcmpn-'+currentcmpn)
  // console.log('doctype-'+doctype)

  // console.log('docnoprefix-'+docnoprefix)
  // console.log('docnos-'+JSON.stringify(docnos))

  var docno='1';
  var i;
  if(docnos!=null)
  {
  for(i=0;i<docnos.length;i++)
  {


  if(docnos[i].cmpn==currentcmpn && docnos[i].doctype==doctype && docnos[i].docnoprefix==docnoprefix)
  {

     docno=docnos[i].docno;
    docno=(parseInt(docno)+1).toString();
  }
  
}   
}


return docno;
  
}

export const handleBlur=(name:any,currdoc:any)=>{
  let currentdocument = {...currdoc};
  let touched = {...currentdocument.touched,[name]:true};
  currentdocument.touched=touched;
  return currentdocument;
  }

export const  roundoff=(amount:any,rule:any)=>
{
if(rule==null || rule=='')
{
  return amount
}
var inputamount=parseFloat(amount);
var rulecode = rule.substring(0, 1);
var rulevalue =parseFloat(rule.substring(1,rule.length))
var roundamount=0;
var roundoff=0
switch (rulecode) {
  case 'N':
  	roundamount=Math.round(inputamount /rulevalue) * rulevalue;
	break;
  case 'U':
   roundamount= Math.ceil(inputamount/rulevalue)*rulevalue;
    break;
  case 'D':
	roundamount= Math.floor(inputamount/rulevalue)*rulevalue;
    break;
  default:
    roundamount=inputamount;
}
roundoff=roundamount-inputamount;
return roundoff
}

export const getDocconfig=(currentcmpn:any,doctype:any,docconfigs:any)=>
{
let  config={};
  var i;
  if(docconfigs!=null)
  {
  for(i=0;i<docconfigs.length;i++)
  {


  if(docconfigs[i].cmpn==currentcmpn && docconfigs[i].doctype==doctype)
  {
  config=docconfigs[i].config;
  }
  
}   
}

  return config;
  
}
export const getTF=(val:any)=>
{
  return val=='Y'?true:false;

}



export const reverseYN=(val:any)=>
{
  return val=='Y'?'N':'Y';
}



export const getLblVal =( arr:any ,label:any, value:any )=>
  {
    
    if(arr==null) return []
    const objArr= arr.map((obj:any) =>({
      label:obj[label],
      value:obj[value]  
    }))

    return objArr;

  }
  

  export const checkTouched=(istouched:any,message:any)=>
  {
    if(istouched==null || message== null)
    {
      return ''
    }
    else
    {
      return istouched==true?message:''
    } 
  }
  


  
  export const checkExist=(obj:any)=>
  {
    if(obj==null)
    {return false;}
    else {return obj;}
  
  }



  export const nvl=(obj:any,retobj:any)=>
  {
    if(obj==null)
    {return retobj;}
    else {return obj;}
  
  }


  export const comp = (a:any, b:any) => a.toLowerCase().trim() === b.toLowerCase().trim();