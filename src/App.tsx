import './styles.css'
import {Provider} from 'react-redux'
import {ConfigureStore} from './ITFs/Redux/configureStore'
import FormJson from './formElement.json'
import { PersistGate } from 'redux-persist/integration/react'
import FormContextProvider from './FormContext'
import FormComponent from './components/Elements/FormComponent'
import Dashboard from './ITFs/Dashboard/Dashboard'
import Login from './ITFs/Login/Login'
const {persistor,store} = ConfigureStore();
export const App = () => {
  const handleSubmit = (obj: any) => {
    console.log(obj)
    console.log('clicked on Submitted')
  }
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
    <Login/>
    </PersistGate>
    </Provider>

    //     <FormContextProvider>

    //         {/* <h1>
    //           Hello React TypeScript WebPack Starter Template -{' '}
    //           {process.env.NODE_ENV} - {process.env.name}
    //         </h1> */}

    //          <FormComponent FormJson={FormJson} handleFormSubmit={handleSubmit}/>
    //         {/* <img src={Image} alt="React Logo" /> */}
    //         {/* <p>Hi Kedar Lachke, how r u</p>
    //         <div>Hello Kedar</div>
    // <i><b>India</b><input value="123"/><input value="12345"/> <input value="7890"/></i> */}

    //       </FormContextProvider>
  )
}
