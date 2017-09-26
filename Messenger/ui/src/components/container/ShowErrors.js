import ShowErrors from '../ui/ShowErrors'
import {connect} from 'react-redux'

const mapStateToProps = state => {
    return {
        errors : state.errors
    }
}

export default connect(mapStateToProps)(ShowErrors)