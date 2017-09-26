import C from '../constants'
import { combineReducers } from 'redux'

export const user = (state=null, action) =>{
		switch(action.type) {
			case C.SIGN_IN :
			case C.SIGN_UP : 
			case C.ACTIVATE_ACCOUNT :
			case C.SIGN_OUT:
			case C.FORGOT_PASSWORD:
			case C.CHANGE_PASSWORD:
			case C.EDIT_USER:
				return action.payload
			default: 
				return state
		}
  }

export const errors = (state=[], action) => {
	switch(action.type){
		case C.ADD_ERROR:
			return [
				...state,
				action.payload
			]
		case C.CLEAR_ERROR :
			return action.payload
		default:
			return state
	}
}

export default combineReducers({
	user,
	errors
})