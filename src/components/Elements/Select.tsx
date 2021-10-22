import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import React, { useContext } from 'react'
import { FormContext } from '../../FormContext'
const SelectInput = ({
  field_id,
  field_label,
  field_placeholder,
  field_value,
  field_options,
}: any) => {
  let { handleChange, state }: any = useContext(FormContext)
  state = state ? state : { application: {} }
  const value =
    state.application && state.application[field_id]
      ? state.application[field_id]
      : false
  return (
    <FormControl>
      <InputLabel id={field_id}>{field_label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id={field_id}
        value={value}
        onChange={(event) => handleChange(field_id, event)}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {field_options.map((label: any, i: any) => (
          <MenuItem
            key={label.option_label + '_' + i}
            value={label.option_label}
          >
            <em>{label.option_label}</em>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectInput
