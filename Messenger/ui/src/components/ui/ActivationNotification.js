import {createClass} from 'react'

export const Dashboard = createClass({
    render(){
        return(
            <div className="vertical-center">
                <div className="col-md-7 form-container">
                    <h1>Thank You!</h1>
                    <p>Your account must be activated. Please follow the link in your email to activate your account.</p>
                </div>
            </div>
        )
    }
})

export default Dashboard;