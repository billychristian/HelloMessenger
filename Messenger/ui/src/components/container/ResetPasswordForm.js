import ResetPassword from '../ui/ResetPasswordForm'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'
import { resetPasswordRequest } from '../../actions/accountActions'

const mapStateToProps = (state,props) =>
	({
		router: props.router
	})

const mapDispatchToProps = dispatch =>
({
    onResetPassword({email}){
        dispatch(
            resetPasswordRequest(email)
        )
    },
})

const Container = connect(mapStateToProps, mapDispatchToProps)(ResetPassword)

export default withRouter(Container);