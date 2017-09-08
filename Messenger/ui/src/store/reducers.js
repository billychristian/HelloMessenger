import C from '../constants'
import { combineReducers } from 'redux'

export const user = (state=null, action) =>{
		switch(action.type) {
			case C.SIGN_IN :
			case C.SIGN_UP : 
			return action.payload
			default: 
				return state
		}
  }

export default combineReducers({
 user
})