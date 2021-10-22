import {
  Checkbox,
  FormControl,
  FormLabel,
  FormControlLabel,
} from '@material-ui/core'
import { useState, useContext } from 'react'
import { FormContext } from '../../FormContext'

const CheckBox = ({ field_id, field_label, field_value }: any) => {
  let { handleChange, state }: any = useContext(FormContext)
  state = state ? state : {}
  state = state ? state : { application: {} }
  const value =
    state.application && state.application[field_id]
      ? state.application[field_id]
      : false
  return (
    <FormControlLabel
      id={field_id}
      control={
        <Checkbox
          checked={value}
          onChange={(event) => handleChange(field_id, event)}
          name={field_id}
          color="primary"
        />
      }
      label={field_label}
    />
  )
}

export default CheckBox
