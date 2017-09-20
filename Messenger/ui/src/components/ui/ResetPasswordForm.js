import '../../stylesheets/style.scss'
import '../../stylesheets/bootstrap.css'
import { Link } from 'react-router'
import { PropTypes } from 'react'

const ResetPassword = ({onResetPassword=u=>u}) => {
    let _email

    const submit = e => {
        e.preventDefault()
        onResetPassword({
            email: _email.value,
        })

        _email.value =''

    }

    return(
        <div className="vertical-center">
            <div className="col-md-7 form-container">
                <h1>Forgot Password</h1>
                <p>We'll email instructions how to reset your password.</p>
                <form onSubmit={submit} className="forgot-password-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" 
                            type="text"
                            className="form-control col-sm-12"
                            ref= {input => _email = input} 
                            required />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-info">Submit</button>
                    </div>
                </form>
                
                <div className="form-group">
                    <Link to="/">
                        Sign in
                    </Link>
                    <Link to="/sign-up">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
       
        
    )
}


ResetPassword.propTypes = {
    onResetPassword: PropTypes.func
}

export default ResetPassword;