import '../../stylesheets/style.scss'
import '../../stylesheets/bootstrap.css'
import { Link } from 'react-router'
import { PropTypes } from 'react'
import ShowErrors from '../container/ShowErrors'

const Login = ({onLogin=u=>u}) => {
    let _username, _password

    const submit = e => {
        e.preventDefault()
        onLogin({
            username: _username.value,
            password: _password.value
        })

    }

    return(
        <div className="vertical-center">
            <div className="col-md-6"></div>
            <div className="col-md-4 form-container">
                <form onSubmit={submit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input id="username" 
                            type="text"
                            className="form-control col-sm-12"
                            ref= {input => _username = input} 
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

                    <ShowErrors/>

                    <div className="form-group">
                        <button className="btn btn-info">Login</button>
                    </div>

                    <Link to="/sign-up">
                        Sign Up
                    </Link>
                    <Link to="/forgot-password">
                        Forgot Password?
                    </Link>

                </form>
            </div>
        </div>
        
    )
}


Login.propTypes = {
    onLogin: PropTypes.func
}

export default Login;