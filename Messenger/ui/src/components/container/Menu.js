import Menu from '../ui/Menu'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

const mapStateToProps = state =>
({
    firstName: state.user.firstName,
    lastName: state.user.lastName
})


export default connect(mapStateToProps)(Menu)