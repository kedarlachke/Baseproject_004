import React, { useEffect, useState, useContext } from 'react'
import { Typography, Container, FormControl, Button } from '@material-ui/core'
import Element from '../Element'
import { FormContext } from '../../FormContext'
type FormProps = {
  FormJson: any
  handleFormSubmit: any
}
const FormComponent: React.FC<FormProps> = (props: any) => {
  const { FormJson, handleFormSubmit } = props
  const [elements, setElements]: any = useState(null)
  let { handleSubmit, handleReset, state }: any = useContext(FormContext)
  useEffect(() => {
    setElements(FormJson[0])
  }, [])

  const { fields, page_label } = elements ?? {}

  return (
    <Container maxWidth={'lg'}>
      <Typography variant="h1">{page_label}</Typography>
      <FormControl component="fieldset">
        {fields &&
          fields.map((field: any, i: any) => {
            return <Element key={i} field={field} />
          })}
        <Button variant="contained" onClick={handleReset} color="default">
          {' '}
          Reset{' '}
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleSubmit()
            handleFormSubmit({ ...state })
          }}
          color="primary"
        >
          {' '}
          Submit{' '}
        </Button>
      </FormControl>
    </Container>
  )
}

export default FormComponent
