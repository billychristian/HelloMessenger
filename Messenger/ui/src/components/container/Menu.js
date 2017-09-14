import Menu from '../ui/Menu'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

const mapStateToProps = (state) =>
({
    user: state.user
})


const Container = connect(mapStateToProps)(Menu)

export default withRouter(Container);