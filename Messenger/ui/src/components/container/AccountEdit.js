import {withRouter} from 'react-router'
import { connect } from 'react-redux'
import AccountEdit from '../ui/AccountEdit'
import {editUser} from '../../actions/accountActions'

const mapStateToProps = state =>
({
    user: state.user
})

const mapDispatchToProps = dispatch =>
({
    onSave({id,username, firstName, lastName, email, password, confirmPassword}){
        dispatch(
            editUser(id, username, firstName, lastName, email, password, confirmPassword)
        )
    },
})


export default connect(mapStateToProps,mapDispatchToProps)(AccountEdit)