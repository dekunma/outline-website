const errorReducer = (state = '', action) => {
    switch(action.type){
        case 'ERROR':
            return({
                value:action.value,
                message:action.message
            })
        default:
            return state
    }
}
export default errorReducer