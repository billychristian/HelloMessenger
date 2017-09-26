import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import {App,Whoops404, Dashboard} from './components'
import Login from './components/container/Login'
import SignUp from './components/container/SignUp'
import WaitingActivation from './components/ui/ActivationRequest'
import ActivateAccount from './components/container/ActivateAccount'
import ActivationSuccess from './components/ui/ActivationSuccess'
import SignOut from './components/container/SignOut'
import ForgotPasswordRequest from './components/container/ResetPasswordForm'
import ChangePassword from './components/container/NewPasswordForm'
import ChangePasswordSuccess from './components/ui/ChangePasswordSuccess'
import AccountDetail from './components/container/AccountDetail'
import AccountEdit from './components/container/AccountEdit'

function requireAuth(nextState,  replace) {
    var user = store.getState().user;
    if (user == null || !user.isLoggedIn)
        replace('/')
  }

function redirectToDashboard(nextState,  replace) {
    var user = store.getState().user;
    if (user != null && user.isLoggedIn)
        replace('/dashboard')
}


const routes = (
    <Router history={hashHistory}>
		<Route path="/" component= {App}>
            <IndexRoute component={Login} onEnter={redirectToDashboard}/>
            <Route path="dashboard" component={Dashboard} onEnter={requireAuth}>
                <Route path="user" component={AccountDetail}/>
                <Route path="edit-user" component={AccountEdit}/>
            </Route>
            <Route path="sign-up" component = {SignUp}/>

            <Route path="waiting-activation" component = {WaitingActivation}/>
            <Route path="activate-account" component = {ActivateAccount}>
                <Route path=":usercode" component={ActivateAccount}/>
            </Route>
            <Route path="activation-success" component={ActivationSuccess}/>

            <Route path="forgot-password" component={ForgotPasswordRequest}/>
            <Route path="reset-password" component={ChangePassword}>
                <Route path=":usercode" component={ChangePassword}/>
            </Route>
            <Route path="change-password-success" component={ChangePasswordSuccess}/>

            <Route path="logout" component={SignOut}/>
        </Route>
		<Route path="*" component={Whoops404}/>
	</Router>
)

export default routes