import { Component, createContext } from 'react'
export const FormContext = createContext(null)
interface IMyComponentProps {
  someDefaultValue: string
}

interface IMyComponentState {
  application: any
}
class FormContextProvider extends Component<{}, IMyComponentState> {
  constructor(props: any) {
    super(props)
    this.state = {
      application: {},
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.ValidateData = this.ValidateData.bind(this)
  }
  ValidateData(validation: any, value: any, label: string, appl: any) {
    for (let i = 0; i < validation.length; i++) {
      let val_arr = validation[i].split('_')
      switch (val_arr[0]) {
        case 'required':
          if (value === '' || value === null || value === undefined) {
            appl[label + 'ErrorMsg'] = value
          }
          break
        case 'maxlength':
          if (value.toString().length > Number(val_arr[1])) {
            appl[
              label + 'ErrorMsg'
            ] = `Should be less that ${val_arr[1]} characters`
          }
          break
        case 'minlength':
          if (value.toString().length < Number(val_arr[1])) {
            appl[
              label + 'ErrorMsg'
            ] = `Should be more that ${val_arr[1]} characters`
          }
          break

        default:
          break
      }
    }
    this.setState({ application: appl })
  }
  handleChange(id: String, event: any, validation: any) {
    let name: string = id
    let value = event.target.value ? event.target.value : event.target.checked
    let appl = { ...this.state.application }
    this.ValidateData(validation, value, name, appl)

    appl[name] = value

    this.setState({ application: appl })
  }

  handleSubmit() {
    console.log(this.state)
  }
  handleReset = () => {
    let app = {}
    this.setState({ application: app })
  }

  render() {
    return (
      <FormContext.Provider
        value={{
          state: { ...this.state },
          handleChange: this.handleChange,
          handleSubmit: this.handleSubmit,
          handleReset: this.handleReset,
        }}
      >
        {this.props.children}
      </FormContext.Provider>
    )
  }
}

export default FormContextProvider
