import SignUp from '../ui/SignUp'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'
import { register } from '../../actions'

const mapStateToProps = (state, props) =>
({
    router: props.router
})

const mapDispatchToProps = dispatch =>
({
    onSubmit({username, firstName, lastName, email, password, confirmPassword}){
        dispatch(
            register(username, firstName, lastName, email, password, confirmPassword)
        )
    },
})

const Container = connect(mapStateToProps, mapDispatchToProps)(SignUp)

export default withRouter(Container);