const announcementReducer = (state = '', action) => {
    switch(action.type){
        case 'ANNOUNCEMENT':
            return action.value
        default:
            return state
    }
}

export default announcementReducer