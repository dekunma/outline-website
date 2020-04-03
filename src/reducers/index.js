import emailReducer from './emailReducer'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    email : emailReducer
})

export default allReducers