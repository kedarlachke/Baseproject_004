import { TextField } from '@material-ui/core'
import React, { useContext } from 'react'
import { FormContext } from '../../FormContext'

const Input = ({
  field_id,
  field_label,
  field_placeholder,
  field_value,
  validation,
}: any) => {
  let { handleChange, state }: any = useContext(FormContext)
  state = state ? state : { application: {} }
  const value =
    state.application && state.application[field_id]
      ? state.application[field_id]
      : ''
  //const {application} =state
  return (
    <TextField
      id={field_id}
      label={field_label}
      placeholder={field_placeholder ? field_placeholder : ''}
      value={value}
      onChange={(event) => handleChange(field_id, event, validation)}
    />
  )
}

export default Input
