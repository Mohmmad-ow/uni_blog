import axios from "axios";
import { useReducer, createContext, useEffect, useContext } from "react";
import Cookies from "js-cookie";

const INITIAL_STATE = {
    user: null,
    loading: false,
    error: null
}

const AuthContext = createContext(INITIAL_STATE)

export const useFetchUser = () => {
    const {user, dispatch, error, loading} = useContext(AuthContext);
    return {user, dispatch, error, loading}
}

   

const authReducer = (state, action) => {
    switch(action.type) {
        case 'loginStart':
            return {
                user: null,
                loading: true,
                error: false
            };
        case 'loginSuccess': 
            return {
                user: action.payload,
                loading: false,
                error: false
            }
        case 'loginFailure': 
            return {
                user: null,
                loading: false,
                error: action.payload
            };
        case 'logout':
            return {
                user: null,
                loading: false,
                error: null
            }
    }
}



export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
    const accessToken = Cookies.get("access_token") 
    useEffect(() => {
        dispatch({type: 'loginStart'})
        const getUser = async () => {
            try {
                const response = await axios.get("/users/auth/findClientUser", {withCredentials: true, headers: {
                    "Authorization": `Bearer ${accessToken}`
                }})
                const {username, email, isAdmin} = response.data.user
                dispatch({type: 'loginSuccess', payload: {username, email, isAdmin}})
            } catch (err) {
                dispatch({type: 'loginFailure', payload: err})
            }

        }
        getUser()
    }, [])
    return (
        <AuthContext.Provider value={{dispatch: dispatch, user: state.user, error: state.error, loading: state.loading} }>
        {children}
        </AuthContext.Provider>
    )
}