import {PropTypes} from 'react'
import Login from '../container/Login'
import Dashboard from '../container/Dashboard'

const Home = (user, router) => {
     if(user == null && !user.isLoggedIn) {
         router.push('/login')
     }

     return(
         <Dashboard/>
     )
}

export default Home;