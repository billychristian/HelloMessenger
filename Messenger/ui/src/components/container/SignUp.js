import SignUp from '../ui/SignUp'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'
//import { signin } from '../../actions'

const mapStateToProps = (props) =>
	({
		router: props.router
	})

const mapDispatchToProps = dispatch =>
({
    
})

const Container = connect(mapStateToProps, mapDispatchToProps)(SignUp)

export default withRouter(Container);