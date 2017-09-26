import SignOut from '../ui/SignOut'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'
import { logout } from '../../actions/accountActions'

const mapStateToProps = (state, props) =>
({
    router: props.router
})

const mapDispatchToProps = dispatch =>
({
    onSignOut(){
        dispatch(
            logout()
        )
    },
})

const Container = connect(mapStateToProps, mapDispatchToProps)(SignOut)

export default withRouter(Container);