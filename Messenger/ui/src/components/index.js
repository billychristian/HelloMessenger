import '../stylesheets/bootstrap.css'
import Menu from './ui/Menu'

export const App = ({children}) =>
    <div className="app">
        {localStorage["auth-key"] ? <Menu/> : ""}
        {children}
    </div>

export const Whoops404 = ({ location }) =>
    <div className="whoops-404">
        <h1>Whoops, route not found</h1>
        <p>Cannot find content for {location.pathname}</p>
    </div>
