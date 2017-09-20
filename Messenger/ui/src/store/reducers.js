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
				return action.payload
			default: 
				return state
		}
  }

export default combineReducers({
 user
})