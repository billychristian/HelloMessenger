import '../../stylesheets/bootstrap.css'
import Menu from '../container/Menu'

export const Dashboard = ({children}) =>
    <div className="dashboard">
        <Menu/>
        {children}
    </div>

