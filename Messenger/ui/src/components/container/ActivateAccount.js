import ActivateAccount from '../ui/ActivateAccount'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'
import { signin } from '../../actions'

const mapStateToProps = (state,props) =>
	({
		router: props.router
	})

const mapDispatchToProps = dispatch =>
({
    // onLogin({username, password}){
    //     dispatch(
    //         signin(username, password)
    //     )
    // },
})

const Container = connect(mapStateToProps, mapDispatchToProps)(Login)

export default withRouter(Container);