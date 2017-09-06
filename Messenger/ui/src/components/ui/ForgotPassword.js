import React from 'react'
import '../../stylesheets/style.scss'
import '../../stylesheets/bootstrap.css'
import { PropTypes, Component } from 'react'
import {Link} from 'react-router'

export class ForgotPassword extends Component{
    render(){

        const { email } = this.props 

         return (
            <div className="forgot-password-form">
                <h1>Forgot Password</h1>
               

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" 
                        type="text"
                        className="form-control col-sm-12" 
                        required />
                </div>

                <button type="button" className="btn btn-info">Send Email</button>

                <div className="form-group">
                    <Link to="/">
                        Sign In
                    </Link>
                    <Link to="/sign-up">
                        Sign Up
                    </Link>
                </div>

            </div>
        )
    }
}

ForgotPassword.propTypes = {
    email:PropTypes.string.isRequired
}