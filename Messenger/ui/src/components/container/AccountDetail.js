import AccountDetail from '../ui/AccountDetail'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

const mapStateToProps = (state,props) => {
    return {
        user : state.user,
        router: props.router,
    }
}

const Container = connect(mapStateToProps)(AccountDetail)

export default withRouter(Container);