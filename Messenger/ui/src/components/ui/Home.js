import {PropTypes} from 'react'
import Login from '../container/Login'
import Dashboard from '../container/Dashboard'

const Home = ({ router}) => {
     return(
            (localStorage['auth-key']) ? <Dashboard/> : <Login/>
        )
}

Home.propTypes = {
    router: PropTypes.object
}

export default Home;