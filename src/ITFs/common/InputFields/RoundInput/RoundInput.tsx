import React from 'react'
import {setValue,getValue,getErrorValue,getErrorValueN,setCalValue,
    getDtFormat,
    getTimeFormat,
    getDateYYYYMMDD,
    getDateYYYYMMDDHHMI,
   getFromToDate

} from '../../validationlib';



interface IRoundInput{
  modifydoc:any;
  iconClass:string;
  name:string;
  currdoc:any;
  section:string;
  label:string;
  cal?:string;
  wd?:string;
  placeholder:string;
}
export function LeftIconRoundInput(props:IRoundInput) {

  const { wd, label, name, section, currdoc,modifydoc,cal,iconClass,placeholder } = props
  let classname = 'round-input-field'
  const errorMsg = getErrorValueN(currdoc, 'errorsAll.' + section)
  if (errorMsg !== null) {
    if (errorMsg !== undefined && errorMsg.length > 0) {
      classname = 'error-input-field'
    }
  }  
      return (
        <div className={`col-${wd}`}>
          <div className="round-input-field"
          >
          <i className={iconClass}></i>
          <input
            type="text"
            placeholder={placeholder}
            name={name}
            value={getValue(currdoc, section)}
          onChange={(event) => { setCalValue(currdoc, section, event.target.value, modifydoc, cal) }}
          onBlur={event => modifydoc(setValue(currdoc, 'touched.' + section, true))}
        autoComplete="false"
          />
        </div>
        <div className="round-field-error">{errorMsg}</div>
        </div>
      )
  }

export  const M_LeftIconRoundInput=React.memo(LeftIconRoundInput)
