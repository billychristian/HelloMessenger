import C from '../constants'
import { combineReducers } from 'redux'

export const user = (state=null, action) =>
  (action.type === C.SIGN_IN) ?
  	action.payload :
  	state

export default combineReducers({
 user
})