import * as React from 'react'
import CheckBox from './Elements/Checkbox'
import Input from './Elements/Input'
import SelectInput from './Elements/Select'

const Element = ({
  field: {
    field_type,
    field_id,
    field_label,
    field_placeholder,
    field_value,
    field_options,
    validation,
  },
}: any) => {
  console.log(field_type)
  switch (field_type) {
    case 'text':
      return (
        <Input
          field_id={field_id}
          field_label={field_label}
          field_placeholder={field_placeholder}
          field_value={field_value}
          validation={validation}
        />
      )

    case 'select':
      return (
        <SelectInput
          field_id={field_id}
          field_label={field_label}
          field_placeholder={field_placeholder}
          field_value={field_value}
          field_options={field_options}
          validation={validation}
        />
      )

    case 'checkbox':
      return (
        <CheckBox
          field_id={field_id}
          field_label={field_label}
          field_placeholder={field_placeholder}
          field_value={field_value}
          validation={validation}
        />
      )

    default:
      return null
      break
  }
}

export default Element
