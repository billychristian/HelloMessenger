import '../../stylesheets/style.scss'
import '../../stylesheets/bootstrap.css'
import { Link } from 'react-router'
import { PropTypes } from 'react'

const ActivateAccount = ({onActivate=u=>u, router, usercode}) => {

    const activate = e => {
        e.preventDefault()
        onActivate({
           usercode: usercode
        })

        router.push('/activation-success')

    }

    return(
        <div className="vertical-center">
                <div className="col-md-7 form-container">
                    <h1>Account Activation</h1>
                    <p>Click this button to activate your account</p>

                    <div className="form-group">
                        <button className="btn btn-info" onClick={activate}>Activate Account</button>
                    </div>
                    
                    <div className="form-group">
                        <Link to="/">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        
    )
}


ActivateAccount.propTypes = {
    onActivate: PropTypes.func,
    router: PropTypes.object,
    usercode: PropTypes.string.isRequired
}

export default ActivateAccount;