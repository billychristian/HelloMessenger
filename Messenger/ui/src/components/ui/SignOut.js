import '../../stylesheets/style.scss'
import '../../stylesheets/bootstrap.css'
import { Link } from 'react-router'
import { Component, PropTypes } from 'react'

class SignOut extends Component{
    componentWillMount(){
        const {onSignOut=u=>u} = this.props

        onSignOut();
    }
    render(){
        return(
            <div className="vertical-center">
                <div className="col-md-7 form-container">
                    <h1>See you again!</h1>
                    <p>Your account has been successfully logged out. Click <Link to="/">here</Link> to go to the login page</p>
                </div>
            </div>
        )
    }
}


SignOut.propTypes = {
    onSignOut: PropTypes.func
}

export default SignOut;