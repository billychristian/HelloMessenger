import C from '../constants'
import request from 'superagent';
import {hashHistory} from 'react-router'
import initialState from '../initialState'
import {addError, clearError} from './errorAction'

export function login(id,
                    username,
                    email,
                    firstName,
                    lastName,
                    isLoggedIn, 
                    authentication){
    return {
        type: C.SIGN_IN,
        payload : {
            id,
            username,
            email,
            firstName,
            lastName,
            isLoggedIn, 
            authentication
        }
    }
}

export function signup(id,
                        username,
                        email,
                        firstName,
                        lastName){
    return{
        type: C.SIGN_UP,
        payload : {
            id,
            username,
            email,
            firstName,
            lastName
        }
    }
}

export function accountActivation(id,
                        username,
                        email,
                        firstName,
                        lastName){
    return{
        type: C.ACTIVATE_ACCOUNT,
        payload : {
            id,
            username,
            email,
            firstName,
            lastName
        }
    }
}

export function logout(){
    return{
        type: C.SIGN_OUT,
        payload: initialState
    }
}

export function forgotPassword(email){
    return{
        type: C.FORGOT_PASSWORD,
        payload: {
            email
        }
    }
}

export function changePassword(username, email){
    return{
        type:C.CHANGE_PASSWORD,
        payload : {
            username,
            email
        }
    }
}

export function updateAccount(username,
                        email,
                        firstName,
                        lastName){
    return{
            type: C.EDIT_USER,
            payload : {
                username,
                email,
                firstName,
                lastName
            }
        }
}

export function signin(username, password){
    return (dispatch) => {
        request.post(C.LOGIN_URL)
        .send({grant_type: "password", username: username, password: password, client_id: "resourceOwner", client_secret: "secret", scope:"api1 offline_access" })
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            if (res.ok) {
                var authentication = res.body;
                localStorage["auth-key"] = res.body.token_type + " " + res.body.access_token;
                dispatch(getUserInformation(username, authentication))
            }
            else if(err.status == 400){
                let message = "Invalid username or password"
                dispatch(addError(message))
            }
        })
    }
}

export function getUserInformation(username, authentication){
    return (dispatch) => {
        request.get(C.CLIENT_URL + "account/GetByUsername/?username="+username)
        .set('Content-Type', 'application/json')
        .set('Authorization', localStorage["auth-key"])
        .end((err, res) => {
            if (res.ok) {
                dispatch(login(res.body.id, 
                    username, 
                    res.body.email, 
                    res.body.firstName, 
                    res.body.lastName, 
                    true,
                    authentication
                ));
                hashHistory.push('/dashboard');
            }
        })
    }
}

export function register(username, firstName, lastName, email, password, confirmPassword){
    return (dispatch) => {
        //TODO:Change this validation
        if(password == confirmPassword){
            request.post(C.CLIENT_URL + "account")
            .send({
                FirstName:firstName,
                LastName:lastName,
                Password:password,
                UserName:username,
                Email:email
            })
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                if (res.ok) {
                    dispatch(signup(res.body.id, 
                        username, 
                        res.body.email, 
                        res.body.firstName, 
                        res.body.lastName
                    ))
                    hashHistory.push('/waiting-activation');
                }
            })
        }
        else{
            let message = "Password and Confirm Password doesn't match"
            dispatch(addError(message))
        }
    }
}

export function activateAccount(usercode){
    return(dispatch)=>{
        request.post(C.CLIENT_URL+"account/ActivateUserByUserCode/?activationCode="+ encodeURIComponent(usercode))
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            if (res.ok) {
                dispatch(accountActivation(res.body.id, 
                    res.body.username, 
                    res.body.email, 
                    res.body.firstName, 
                    res.body.lastName
                ))
                hashHistory.push('/activation-success');
            }
        })
    }
}

export function resetPasswordRequest(email){
    return(dispatch)=>{
        request.get(C.CLIENT_URL+"account/ResetPasswordRequest/?email="+email)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            if (res.ok) {
                dispatch(forgotPassword(email))
                // hashHistory.push('/activation-success');
            }
        })
    }
}

export function newPassword(userCode, newPassword, confirmPassword){
    return(dispatch)=>{
        if(newPassword == confirmPassword){
            request.put(C.CLIENT_URL+"account/ResetPassword/?userCode="+encodeURIComponent(userCode)+"&newPassword="+newPassword)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .end((err, res) => {
                if (res.ok) {
                    dispatch(changePassword(res.username, res.email))
                    hashHistory.push('/change-password-success');
                }
            })
        }
        else{
            let message = "Password and Confirm Password doesn't match"
            dispatch(addError(message))
        }
    }
}

export function editUser(id, username, firstName, lastName, email, password, confirmPassword){
    return(dispatch) =>{
        if(password == confirmPassword){
            request.put(C.CLIENT_URL+"account/edit/"+id)
            .send({
                FirstName:firstName,
                LastName:lastName,
                Password:password,
                UserName:username,
                Email:email
            })
            .set('Content-Type', 'application/json')
            .set('Authorization', localStorage["auth-key"])
            .end((err, res) => {
                if (res.ok) {
                    dispatch(updateAccount(
                        username,
                        email,
                        firstName,
                        lastName
                    ))
                    hashHistory.push('/dashboard/user');
                }
            })
        }
        else{
            let message = "Password and Confirm Password doesn't match"
            dispatch(addError(message))
        }
    }
}