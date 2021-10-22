import React from 'react'
import './radio.css'
function Radio(props: any) {
  const { id, groupname, label, wd } = props
  return (
    <div className={'col-' + wd ? 'wd' : '12'}>
      <div className="radio-container">
        <input type="radio" id={id} name={groupname} />
        <label>{label}</label>
      </div>
    </div>
  )
}

export default Radio
