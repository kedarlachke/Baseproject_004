import ReactDom from 'react-dom'
import { App } from './App'
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js')
    .then((registration) => {
      console.log('SW Registered')
      console.log(registration)
    })
    .catch((err) => {
      console.log('SW not registered', err)
    })
}
ReactDom.render(<App />, document.getElementById('root'))
