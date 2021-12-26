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
  const { wd, label, options, name, section,currdoc,modifydoc,cal} = props
  const errorMsg = getErrorValueN(currdoc, 'errorsAll.' + section)
  let selectclassname = 'input-field'
  if (errorMsg !== null) {
    if (errorMsg !== undefined && errorMsg.length > 0) {
      selectclassname = 'error-input-field'
    }
  }
  let yz=getValue(currdoc,section)
  console.log("options------->",options)
  return (<>
  <div className={`col-${wd}`}>
    <Select  
          value={{  value: yz,  label: yz}} 
          onChange={(value:any)=>{ console.log(value); setCalValue(currdoc,section,value.value,modifydoc,cal)  } } 
          //onBlur={event => modifydoc(setValue(currdoc,'touched.'+section,true))}
          options={options}
          />
          <div className="field-error">{errorMsg}</div>
          </div>
    {/* <div className={`col-${wd}`}>
      <div className={selectclassname}>
        <Select  
          value={{  value: yz,  label: yz}} 
          onChange={(value:any)=>{ console.log(value); setCalValue(currdoc,section,value.value,modifydoc,cal)  } } 
          //onBlur={event => modifydoc(setValue(currdoc,'touched.'+section,true))}
          options={options}
          />
          
        <label className="label-name">
          <span className="content-name">{label}</span>
        </label>
      </div>
      <div className="field-error">{errorMsg}</div>
    </div> */}
    </>
  )
}

export const SearchSelectInput = React.memo(SearchSelect)
