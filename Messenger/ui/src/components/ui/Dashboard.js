import '../../stylesheets/bootstrap.css'
import '../../stylesheets/style.scss'
import Menu from '../container/Menu'

export const Dashboard = ({children}) =>
    <div className="dashboard">
        <Menu/>
        <div id="main">
            {children}
        </div>
    </div>

