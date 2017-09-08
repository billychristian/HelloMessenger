import {PropTypes} from 'react'


const Dashboard = ({user, router}) => {
     if(user == null || !user.isLoggedIn) {
         router.push('/login')
     }

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