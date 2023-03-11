const AuthReducer  = (state, action) => {
    if (action.type === "LOGIN") {
        return {user: action.payload}
    } else if(action.type === "LOGOUT"){
        return {user: null}
    }else{
        return state
    }

    
}