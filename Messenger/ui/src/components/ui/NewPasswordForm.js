import '../../stylesheets/style.scss'
import '../../stylesheets/bootstrap.css'
import { Link } from 'react-router'
import { PropTypes } from 'react'
import ShowErrors from '../container/ShowErrors'

const NewPassword = ({onChangePassword=u=>u, usercode}) => {
    let _password, _confirmPassword

    const submit = e => {
        e.preventDefault()
        onChangePassword({
            usercode: usercode,
            password: _password.value,
            confirmPassword: _confirmPassword.value
        })

    }

    return(
        <div className="vertical-center">
                <div className="col-md-7 form-container">
                    <h1>Reset Password</h1>
                    <form onSubmit={submit} className="change-password-form">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input id="password" 
                                type="password"
                                className="form-control col-sm-12"
                                ref= {input => _password = input} 
                                required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input id="confirm-password" 
                                type="password"
                                className="form-control col-sm-12"
                                ref= {input => _confirmPassword = input} 
                                required />
                        </div>

                        <ShowErrors/>

                        <div className="form-group">
                            <button className="btn btn-info">Submit</button>
                        </div>
                    </form>
                    
                    <div className="form-group">
                        <Link to="/">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        
    )
}


NewPassword.propTypes = {
    onChangePassword: PropTypes.func,
    usercode: PropTypes.string.isRequired
}

export default NewPassword;