function userImageReducer ( state = '', action) {
    // console.log('state', state)
    switch(action.type) {
        case 'USER_IMAGE':
            return {
                image: action.payload
            }
            default: return state
    }
}

export default userImageReducer