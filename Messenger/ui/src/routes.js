import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import {App,Whoops404} from './components'
import Dashboard from './components/container/Dashboard'
import Login from './components/container/Login'
import SignUp from './components/container/SignUp'
import ActivationNotification from './components/ui/ActivationNotification'


const routes = (
    <Router history={hashHistory}>
		<Route path="/" component= {App}>
            <IndexRoute component={Dashboard}/>
            <Route path="login" component = {Login}/>
            <Route path="sign-up" component = {SignUp}/>
            <Route path="account-activation" component = {ActivationNotification}>
                {/*<Route path=":activation-code" component={} />*/}
            </Route>
        </Route>
		<Route path="*" component={Whoops404}/>
	</Router>
)

export default routes