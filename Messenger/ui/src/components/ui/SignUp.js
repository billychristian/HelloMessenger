import React from 'react'
import '../../stylesheets/style.scss'
import '../../stylesheets/bootstrap.css'
import { PropTypes, Component } from 'react'
import {Link} from 'react-router'

export class SignUp extends Component{
    render(){

        const { firstName, lastName, username, email, password, confirmPassword } = this.props 

         return (
            <div className="sign-up-form">
                <h1>Sign Up</h1>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" 
                        type="text"
                        className="form-control col-sm-12" 
                        required />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" 
                        type="text"
                        className="form-control col-sm-12" 
                        required />
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input id="username" 
                        type="text"
                        className="form-control col-sm-12" 
                        required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" 
                        type="text"
                        className="form-control col-sm-12" 
                        required />
                </div>

                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" 
					   type="password" 
                       className="form-control col-sm-12" 
					   required />
                </div>

                <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" 
					   type="password" 
                       className="form-control col-sm-12" 
					   required />
                </div>
                
                <button type="button" className="btn btn-info">Sign Up</button>

                <div className="form-group">
                    <Link to="/">
                        Sign in
                    </Link>
                    <Link to="/forgot-password">
                        Forgot Password?
                    </Link>
                </div>

                
            </div>
        )
    }
}

SignUp.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
    email:PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
    confirmPassword:PropTypes.string.isRequired
}