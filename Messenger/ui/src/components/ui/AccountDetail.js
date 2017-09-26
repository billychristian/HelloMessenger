import '../../stylesheets/style.scss'
import '../../stylesheets/bootstrap.css'
import { Link } from 'react-router'
import { PropTypes } from 'react'

const AccountInformation = ({user, router}) => {

    const openEdit = e => {
        e.preventDefault()
        router.push('/dashboard/edit-user')
    }

    return(
        <div className="user-information">
            <div className="main-banner">
                <h1>User Detail</h1>
            </div>
            <div className="form-group">
                    <label className="col-sm-2">Username</label>
                    <label className="col-sm-10">{user.username}</label>
            </div>
            <div className="form-group">
                    <label className="col-sm-2">Name</label>
                    <label className="col-sm-10">{user.firstName +" "+ user.lastName}</label>
            </div>
            <div className="form-group">
                    <label className="col-sm-2">Email</label>
                    <label className="col-sm-10">{user.email}</label>
            </div>
            <div className="form-group">
                <div className="col-sm-12">
                    <button className="btn btn-info" onClick={openEdit}>Edit</button>
                </div>
                
            </div>

        </div>
    )
}

AccountInformation.propTypes = {
    user: PropTypes.object
}

export default AccountInformation