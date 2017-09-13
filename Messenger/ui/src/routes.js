import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import {App,Whoops404} from './components'
import Dashboard from './components/container/Dashboard'
import Login from './components/container/Login'
import SignUp from './components/container/SignUp'
import WaitingActivation from './components/ui/ActivationRequest'
import ActivateAccount from './components/container/ActivateAccount'
import ActivationSuccess from './components/ui/ActivationSuccess'

function requireAuth(nextState,  replace) {
    if (!localStorage["auth-key"])
        replace('/login')
  }

const routes = (
    <Router history={hashHistory}>
		<Route path="/" component= {App}>
            <IndexRoute component={Dashboard} onEnter={requireAuth}/>
            <Route path="dashboard" component={Dashboard}/>
            <Route path="login" component={Login}/>
            <Route path="sign-up" component = {SignUp}/>
            <Route path="waiting-activation" component = {WaitingActivation}/>
            <Route path="activate-account" component = {ActivateAccount}>
                <Route path=":usercode" component={ActivateAccount}/>
            </Route>
            <Route path="activation-success" component={ActivationSuccess}/>
        </Route>
		<Route path="*" component={Whoops404}/>
	</Router>
)

export default routes