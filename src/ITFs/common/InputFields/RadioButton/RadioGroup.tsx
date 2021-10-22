import React from 'react'
import './radio.css'
export function RadioGroup(props: any) {
  const { children, errormsg } = props
  return (
    <div className="radio-btn-group">
      <div className="row">{children}</div>
      <div className="field-error">{errormsg}</div>
    </div>
  )
}
