import C from './constants'
import request from 'superagent';

export function login(id,
                    username,
                    email,
                    firstName,
                    lastName, 
                    authentication){
    return {
        type: C.SIGN_IN,
        payload : {
            id,
            username,
            email,
            firstName,
            lastName, 
            authentication
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
        request.post(C.CLIENT_URL + "account/GetByUsername/?username="+username)
        .set('Content-Type', 'application/json')
        .set('Authorization', localStorage["auth-key"])
        .end((err, res) => {
            if (res.ok) {
                dispatch(login(res.body.id, 
                    username, 
                    res.body.email, 
                    res.body.firstName, 
                    res.body.lastName, 
                    authentication
                ))
            }
        })
    }
}