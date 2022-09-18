export const BlogReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return {
                blogs: null,
                isFetching: true,
                error: null
            }
        case 'FETCH_SUCCESS':
            return {
                blogs: action.payload,
                isFetching: false,
                error: false
            }
        case 'FETCH_FAILURE':
            return {
                blogs: null,
                isFetching: false,
                error: true,
            }
        case 'UPDATE_BLOGS':
            return {
                blogs: action.payload,
                isFetching: false,
                error: false
            }
        default:
            return state;
    }
}