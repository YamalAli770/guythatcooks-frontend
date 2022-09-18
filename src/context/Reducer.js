export const Reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                user: null,
                isFetching: true,
                error: null
            }
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload,
                isFetching: false,
                error: false
            }
        case 'LOGIN_FAILURE':
            return {
                user: null,
                isFetching: false,
                error: true,
            }
        case 'LOGOUT_USER':
            return {
                user: null,
                isFetching: false,
                error: false
            }
        case 'UPDATE_USER':
            return {
                user: action.payload,
                isFetching: false,
                error: false
            }
        default:
            return state;
    }
}