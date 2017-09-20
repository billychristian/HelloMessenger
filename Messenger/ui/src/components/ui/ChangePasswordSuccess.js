import '../../stylesheets/style.scss'
import '../../stylesheets/bootstrap.css'
import { Link } from 'react-router'

const ChangePasswordSuccess = () => {
    return(
        <div className="vertical-center">
                <div className="col-md-7 form-container">
                    <h1>Congratulations!</h1>
                    <p>Your password has been successfully changed. Click <Link to="/">here</Link> to go to the login page</p>
                </div>
            </div>
    )
}

export default ChangePasswordSuccess;