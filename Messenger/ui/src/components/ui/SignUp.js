import '../../stylesheets/style.scss'
import '../../stylesheets/bootstrap.css'
import { Link } from 'react-router'
import { PropTypes } from 'react'

const SignUp = ({onSubmit=u=>u, router}) => {
    let _firstName, _lastName, _username, _email, _password, _confirmPassword

    const submit = e => {
        e.preventDefault()
        onSubmit({
            username: _username.value,
            firstName: _firstName.value,
            lastName : _lastName.value,
            email: _email.value,
            password: _password.value,
            confirmPassword : _confirmPassword.value
        })

        router.push('/account-activation');

        _firstName.value = ''
        _lastName.value = ''
        _username.value = ''
        _email.value = ''
        _password.value = ''
        _confirmPassword.value = ''

    }

    return(
        <div className="vertical-center">
            <div className="col-md-6"></div>
            <div className="col-md-4 form-container">
                <form onSubmit={submit} className="login-form">
                    <h1>Sign Up</h1>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input id="firstName" 
                            type="text"
                            className="form-control col-sm-12" 
                            ref= {input => _firstName = input} 
                            required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input id="lastName" 
                            type="text"
                            className="form-control col-sm-12"
                            ref= {input => _lastName = input} 
                            required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input id="username" 
                            type="text"
                            className="form-control col-sm-12"
                            ref= {input => _username = input} 
                            required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" 
                            type="text"
                            className="form-control col-sm-12" 
                            ref= {input => _email = input}
                            required />
                    </div>

                    <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" 
                        type="password" 
                        className="form-control col-sm-12"
                        ref= {input => _password = input}
                        required />
                    </div>

                    <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input id="confirmPassword" 
                        type="password" 
                        className="form-control col-sm-12" 
                        ref= {input => _confirmPassword = input}
                        required />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-info">Sign Up</button>
                    </div>

                    <div className="form-group">
                        <Link to="/">
                            Sign in
                        </Link>
                        <Link to="/forgot-password">
                            Forgot Password?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}


SignUp.propTypes = {
    onSubmit : PropTypes.func,
    router : PropTypes.object
}

export default SignUp;