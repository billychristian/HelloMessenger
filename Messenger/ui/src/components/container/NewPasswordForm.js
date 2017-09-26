import NewPassword from '../ui/NewPasswordForm'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'
import { newPassword } from '../../actions/accountActions'

const mapStateToProps = (state,props) =>
	({
        usercode: props.params.usercode
	})

const mapDispatchToProps = dispatch =>
({
    onChangePassword({usercode, password, confirmPassword}){
        dispatch(
            newPassword(usercode, password, confirmPassword)
        )
    },
})

const Container = connect(mapStateToProps, mapDispatchToProps)(NewPassword)

export default withRouter(Container);