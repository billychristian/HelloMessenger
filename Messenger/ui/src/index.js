import C from './constants'
import React from 'react'
import { render } from 'react-dom'
import routes from './routes'
import storeFactory from './store'
import { Provider } from 'react-redux'
//import { addError } from './actions'


// // const handleError = error => {
// // 	store.dispatch(
// // 		addError(error.message)
// // 	)
// // }

const store = storeFactory()

window.React = React
window.store = store

// // window.addEventListener("error", handleError)

render(
	<Provider store={store}>
	   {routes}
	</Provider>,
  document.getElementById('react-container')
)
