import {createClass} from 'react'
import { Link } from 'react-router'

export const ActivationRequest = createClass({
    render(){
        return(
            <div className="vertical-center">
                <div className="col-md-7 form-container">
                    <h1>Thank You!</h1>
                    <p>Your account must be activated. Please follow the link in your email to activate your account.</p>
                    
                    <div className="form-group">
                        <Link to="/">
                            Sign in
                        </Link>
                        <Link to="/forgot-password">
                            Forgot Password?
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
})

export default ActivationRequest;