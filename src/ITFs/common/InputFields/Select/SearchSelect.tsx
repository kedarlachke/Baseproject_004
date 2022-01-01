import React from 'react'
import './select.css'
import {
  setValue, getValue, getErrorValue, getErrorValueN, setCalValue,
  getDtFormat,
  getTimeFormat,
  getDateYYYYMMDD,
  getDateYYYYMMDDHHMI,
  getFromToDate
} from '../../validationlib';
import Select from 'react-select'
interface Iinput {
  wd?: string
  label: string
  name: string
  currdoc: any,
  section: string,
  cal:string,
  modifydoc:any,
  options:any,
  
}
export function SearchSelect(props: any) {
  const { wd, label, options, name, section,currdoc,modifydoc,cal,refresh,inpref} = props
  const errorMsg = getErrorValueN(currdoc, 'errorsAll.' + section)
  let selectclassname = 'input-field'
  if (errorMsg !== null) {
    if (errorMsg !== undefined && errorMsg.length > 0) {
      selectclassname = 'error-input-field'
    }
  }
  let yz=getValue(currdoc,section)
  return (<>
  <div className={`col-${wd}`}>
    <Select  
    name={name}
    ref={inpref}
          value={{  value: yz,  label: yz}} 
          onChange={(value:any)=>{value?.value.length>2 ? setCalValue(currdoc,section,value?.value,modifydoc,cal):""  } } 
          //onBlur={event => modifydoc(setValue(currdoc,'touched.'+section,true))}
          options={options}
          isClearable={true}
          /><span><i className="las la-clipboard-list" onClick={()=>{refresh()}}/></span>
          <div className="field-error">{errorMsg}</div>
          </div>
  
    </>
  )
}

export const SearchSelectInput = React.memo(SearchSelect)
