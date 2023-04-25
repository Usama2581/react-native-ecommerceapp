const initialState = {
    status: false
}


function authReducer (state=initialState, action) {
    // console.log('reducer',state.status)
    switch (action.type) {
        case 'USER_STATUS':
            return {
                status: action.payload
            }
        default: return state
    }
}

export default authReducer
