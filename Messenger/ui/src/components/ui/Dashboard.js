import '../../stylesheets/style.scss'
import '../../stylesheets/bootstrap.css'
import { PropTypes } from 'react'

const Dashboard = ({user, router}) => {

    return(
        <div>
            <h1>Dashboard</h1>
        </div>
        
    )
}


Dashboard.propTypes = {
    user: PropTypes.object,
    router: PropTypes.object
}

export default Dashboard;
