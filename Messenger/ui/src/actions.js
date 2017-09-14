import C from './constants'
import request from 'superagent';
import {hashHistory} from 'react-router'

export function login(id,
                    username,
                    email,
                    firstName,
                    lastName,
                    isLoggedin, 
                    authentication){
    return {
        type: C.SIGN_IN,
        payload : {
            id,
            username,
            email,
            firstName,
            lastName,
            isLoggedin, 
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

export function signin(username, password){
    return (dispatch) => {
        request.post(C.LOGIN_URL)
        .send({grant_type: "password", username: username, password: password, client_id: "resourceOwner", client_secret: "secret", scope:"api1 offline_access" })
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            if (res.ok) {
                console.log('success', JSON.stringify(res.body));
                var authentication = res.body;
                localStorage["auth-key"] = res.body.token_type + " " + res.body.access_token;
                dispatch(getUserInformation(username, authentication))
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
    }
}

export function activateAccount(usercode){
    console.log(encodeURIComponent(usercode))
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