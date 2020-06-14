const confirmPasswordReducer = (state = '', action) => {
    switch(action.type){
        case 'CFMPASSWORD':
            return action.value
        default:
            return state
    }
}
export default confirmPasswordReducer