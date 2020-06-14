import emailReducer from './emailReducer'
import passwordReducer from './passwordReducer'
import errorReducer from './errorReducer'
import loginReducer from './loginReducer'
import confirmPasswordReducer from './confirmPasswordReduer'
import serversReducer from './serversReducer'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    email       : emailReducer,
    password    : passwordReducer,
    error       : errorReducer,
    login       : loginReducer,
    cfmPassword : confirmPasswordReducer,
    servers     : serversReducer
})

export default allReducers