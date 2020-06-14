const emailReducer = (state = '', action) => {
    switch(action.type){
        case 'PASSWORD':
            return action.value
        default:
            return state
    }
}
export default emailReducer