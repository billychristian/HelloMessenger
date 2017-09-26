import '../../stylesheets/style.scss'
import '../../stylesheets/bootstrap.css'
import { Link } from 'react-router'
import { PropTypes } from 'react'
import ShowErrors from '../container/ShowErrors'

const AccountEdit = ({onSave=u=>u, user}) => {
    let _username, _firstName, _lastName, _email, _password, _confirmPassword

    

    const save = e => {
        e.preventDefault()
        onSave({
            id : user.id,
            username : _username.value,
            firstName: _firstName.value,
            lastName : _lastName.value,
            email: _email.value,
            password: _password.value,
            confirmPassword : _confirmPassword.value
        })
    }

    const passwordChanged = e =>{
        e.preventDefault()
        _confirmPassword.value = "" 
    }

    return(
        <div className="user-information">
            <div className="main-banner">
                <h1>User Edit</h1>
            </div>
            <div className="form-container">
                <form onSubmit={save} className="login-form">
                    <div className="form-group">
                        <label className="col-sm-2" htmlFor="username">Username</label>
                        <input id="username" 
                            type="text"
                            className="col-sm-4"
                            defaultValue= {user.username}
                            ref= {input => _username = input}
                            required />
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2">Name</label>
                        <input id="firstName" 
                            type="text"
                            className="col-sm-4" 
                            defaultValue= {user.firstName}
                            ref= {input => _firstName = input} 
                            required />
                        <input id="lastName" 
                            type="text"
                            className="col-sm-4"
                            style = {{marginLeft:5}}
                            defaultValue= {user.lastName}
                            ref= {input => _lastName = input} 
                            required />
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2" htmlFor="email">Email</label>
                        <input id="email" 
                            type="text"
                            className="col-sm-4" 
                            defaultValue= {user.email}
                            ref= {input => _email = input}
                            required />
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2" htmlFor="password">Password</label>
                        <input id="password" 
                            type="password" 
                            className="col-sm-4"
                            ref= {input => _password = input}
                            onChange = {passwordChanged}
                            required />
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2" htmlFor="confirmPassword">Confirm Password</label>
                        <input id="confirmPassword" 
                            type="password" 
                            className="col-sm-4" 
                            ref= {input => _confirmPassword = input}
                            required />
                    </div>

                    <ShowErrors/>

                    <div className="form-group">
                        <button className="btn btn-info">Save</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

AccountEdit.propTypes = {
    onSave : PropTypes.func,
    user: PropTypes.object
}

export default AccountEdit