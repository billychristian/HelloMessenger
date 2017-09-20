import {Link} from 'react-router'
import '../../stylesheets/style.scss'
import '../../stylesheets/bootstrap.css'
import FriendsIcon from 'react-icons/lib/md/group'
import ChatIcon from 'react-icons/lib/md/chat'
import AccountIcon from 'react-icons/lib/md/account-box'
import SignOutIcon from 'react-icons/lib/fa/sign-out'
import {PropTypes} from 'react'

export const Menu = ({firstName, lastName}) =>
    <div>
        <div className="sidenav">
            <div className='col-sm-12 banner'>
                <h1>Hello Messenger</h1>
                <p style={{color:"white"}}>Good day {firstName} {lastName}!</p>
            </div>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/friends">
                        <FriendsIcon/>
                        &nbsp;
                        Friends
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link to="/history">
                        <ChatIcon/>
                        &nbsp;
                        Chat
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link to="/settings">
                        <AccountIcon/>
                        &nbsp;
                        My Profile
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link to="/logout">
                        <SignOutIcon/>
                        &nbsp;
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    </div>

Menu.propTypes={
    firstName : PropTypes.string,
    lastName : PropTypes.string
}
    

export default Menu