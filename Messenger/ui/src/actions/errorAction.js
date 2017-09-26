import C from '../constants'

export const addError = (message) =>
({
    type: C.ADD_ERROR,
    payload : message
})

export const clearError = () =>
({
    type : C.CLEAR_ERROR,
    payload : []
})