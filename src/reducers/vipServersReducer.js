const vipServersReducer = (state = [{name:'', URL:''}, {name:'', URL:''}], action) => {
    switch(action.type){
        case 'VIPSERVERS':
            return action.value
        default:
            return state
    }
}

export default vipServersReducer