function isLoggedIn (status) {
    // console.log('action',status)
    return {
        type: 'USER_STATUS',
        payload: status
    }
}

export  {
    isLoggedIn
}