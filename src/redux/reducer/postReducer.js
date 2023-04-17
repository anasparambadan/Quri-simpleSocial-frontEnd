const initialState = {
    posts: [],
    loading: false,
    error: false,
    uploading: false
}
const postReducer = (state = initialState, action) => {
    switch (action.type) {

        case "UPLOAD_START":
            return { ...state, uploading: true, error: false,loading:true }
        case "UPLOAD_SUCCESS":
            return { ...state, posts: [action.data, ...state.posts], uploading: false,loading:false, error: false }
        case "UPLOAD_FAIL":
            return { ...state, uploading: false, error: true ,loading:false}

        case "RETREIVING_START":
            return { ...state, loading: true, error: false }
        case "RETREIVING_SUCCESS":
            return { ...state, posts: [...action.data], uploading: false, error: false, loading: false }
            
        case "RETREIVING_FAIL":
            return { ...state, loading: false, error: true }


        case "DELETE_START":
            return { ...state, loading: true, error: false }
        case "DELETE_SUCCESS":
            return { ...state, error: false, loading: false ,  posts: [...action.new],}
        case "DELETE_FAIL":
            return { ...state, loading: false, error: true }


        case "EDIT_START":
            return { ...state, error: false, loading:true }
        case "EDIT_SUCCESS":
            return { ...state, loading: false, error: false, posts:[...action.new] }
        case "EDIT_FAIL":
            return { ...state, loading: false, error: true }


        default:
            return state;
    }

}

export default postReducer