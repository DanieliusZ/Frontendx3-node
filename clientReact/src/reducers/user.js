const user = (state = {
    user : null,
    token : null,
    errorMsg : null
}, action) => {
    switch (action.type) {
        case "SET_USER":
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token
            };
            break;
        case "LOAD_TOKEN&USER":
            state = {
                ...state,
                user: JSON.parse(localStorage.getItem('user')),
                token: localStorage.getItem('token')
            };
            break;
        case "SET_ERROR":
            state = {
                ...state,
                errorMsg: action.payload
            };
            break;
        case "CLEAR_ERROR":
            state = {
                ...state,
                errorMsg: null
            };
            break;
        case "LOGOUT":
            state = {
                ...state,
                user: null,
                token: null
            };
            break;      
        default:
            return state;
    }
    return state;
};

export default user;