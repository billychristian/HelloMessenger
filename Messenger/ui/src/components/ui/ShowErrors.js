import {PropTypes} from 'react'
import '../../stylesheets/errors.scss'

const ShowErrors = ({errors=[]}) => 
    <div className="show-errors">
        {(errors.length) ? 
            <div className="alert alert-danger error-list ">
                <ul>
                    {(errors.length) ?  errors.map((message, i) =><li key={i}>{message}</li> ): null }
                </ul>
            </div>
            : null
        }
                
    </div>

ShowErrors.propTypes = {
    errors : PropTypes.array
}

export default ShowErrors