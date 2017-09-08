import Dashboard from '../ui/Dashboard'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) =>
	({
		router: props.router
	})

const Container = connect(mapStateToProps)(Dashboard)

export default withRouter(Container);