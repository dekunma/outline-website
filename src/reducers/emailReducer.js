const emailReducer = (state = '', action) => {
    switch(action.type){
        case 'EMAIL':
            return action.value
        default:
            return state
    }
}
export default emailReducer