const loginReducer = (state = '', action) => {
    switch(action.type){
        case 'LOGIN':
            return ({
                value    :  action.value,
                userId   :  action.userId,
                email    :  action.email,
                vip      :  action.vip
            })
        default:
            return state
    }
}
export default loginReducer