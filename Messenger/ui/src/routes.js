import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import {App,Whoops404} from './components'
// import Login from './components/container/Login'
import Home from './components/ui/Home'
// import {SignUp} from './components/SignUp'
// import {ForgotPassword} from './components/ForgotPassword'
// import {Whoops404} from './components/Whoops404'


const routes = (
    <Router history={hashHistory}>
		<Route path="/" component= {App}>
            <IndexRoute component={Home}/>
            {/*<Route path="/sign-up" component = {SignUpApp}/>
		    <Route path="/forgot-password" component = {ForgotPassword}/>*/}
        </Route>
		<Route path="*" component={Whoops404}/>
	</Router>
)

export default routes