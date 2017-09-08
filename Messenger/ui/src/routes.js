import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import {App,Whoops404} from './components'
import Home from './components/ui/Home'
import SignUp from './components/container/SignUp'


const routes = (
    <Router history={hashHistory}>
		<Route path="/" component= {App}>
            <IndexRoute component={Home}/>
            <Route path="sign-up" component = {SignUp}/>
        </Route>
		<Route path="*" component={Whoops404}/>
	</Router>
)

export default routes