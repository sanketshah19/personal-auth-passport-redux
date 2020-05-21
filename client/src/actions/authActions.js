import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

// Register User
export const registerUser = (userData, history) => {
    return (dispatch) => {
        axios.post("/api/users/register", userData)
             .then(res => history.push("/login"))
             .catch(err => 
                dispatch({
                    type: 'GET_ERRORS',
                    payload: err.response.data
                })
              )
    }
}

// Login - get user token
export const loginUser = (userData) => {
    return (dispatch) => {
        axios.post("/api/users/login", userData)
             .then(res => {

                // Set token to localStorage
                const {token} = res.data
                localStorage.setItem("jwtToken", token)
                // Set token to Auth header
                setAuthToken(token)
                // Decode token to get user data
                const decoded = jwt_decode(token)
                // Set current user
                dispatch(setCurrentUser(decoded))
             })
             .catch(err => 
                dispatch({
                    type: 'GET_ERRORS',
                    payload: err.response.data
                })
             )
    }
}

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: 'SET_CURRENT_USER',
        payload: decoded
    }
}

// User loading
export const setUserLoading = () => {
    return {
        type: 'USER_LOADING'
    }
}

// Log out User
export const logoutUser = () => {
    return (dispatch) => {
        // Remove token from localStorage
        localStorage.removeItem("jwtToken")
        // Remove auth header for future requests
        setAuthToken(false)
        // Set current user to empty object {} will set isAuthenticated to false
        dispatch(setCurrentUser({}))
    }
}