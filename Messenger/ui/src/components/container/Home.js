import Dashboard from '../ui/Dashboard'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) =>
	({
		user: state.user,
        router : props.router
	})

const mapDispatchToProps = dispatch =>
({
    // onLogin({username, password}){
    //     dispatch(
    //         signin(username, password)
    //     )
    // },
})    

const Container = connect(mapStateToProps,mapDispatchToProps)(Dashboard)

export default withRouter(Container);