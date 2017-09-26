import C from '../constants'
import appReducer from './reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { clearError } from '../actions/errorAction'

const consoleMessages = store => next => action => {
    let result

	console.groupCollapsed(`dispatching action => ${action.type}`)

	result = next(action)

	console.groupEnd()

	return result
}

const clearErrorMessage = store => next => action => {
	if (store.getState().errors.length > 0 && action.type !== C.CLEAR_ERROR){
		store.dispatch(clearError())
	}

	let result = next(action)

	return result
}

export default (initialState={}) => {
	return applyMiddleware(thunk,clearErrorMessage,consoleMessages)(createStore)(appReducer, initialState)
}