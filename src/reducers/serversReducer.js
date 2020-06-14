const serversReducer = (state = [{name:'loading'},{name:'loading'}], action) => {
    switch(action.type){
        case 'SERVERS':
            return action.value
        default:
            return state
    }
}
export default serversReducer