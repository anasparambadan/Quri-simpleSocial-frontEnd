const initialState = {
    authData: null,
    loading: false,
    error: false,

}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "AUTH_START":
            return {
                ...state, loading: true, error: false
            }
        case "AUTH_COMPLETE":
            localStorage.setItem("user", JSON.stringify({ ...action?.data }))
            return {
                ...state, loading: false, authData: action?.data, error: false
            }
        case "AUTH_FAIL":
            return {
                ...state, loading: false, error: true
            }

        case "LOG_OUT":
            localStorage.clear();
            return { ...state, authData: null, loading: false, error: false }

        default:
            return state;
    }
}

export default authReducer