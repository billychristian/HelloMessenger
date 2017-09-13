import ActivateAccount from '../ui/ActivateAccount'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'
import { activateAccount } from '../../actions'

const mapStateToProps = (state,props) =>
	({
        router: props.router,
        usercode: props.params.usercode
	})

const mapDispatchToProps = dispatch =>
({
    onActivate({usercode}){
        dispatch(
            activateAccount(usercode)
        )
    },
})

const Container = connect(mapStateToProps, mapDispatchToProps)(ActivateAccount)

export default withRouter(Container);