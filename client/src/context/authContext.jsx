import axios from "axios";
import { useReducer, createContext, useEffect, useContext } from "react";
import Cookies from "js-cookie";

const INITIAL_STATE = {
    user: null,
    loading: false,
    error: null
}

const AuthContext = createContext(INITIAL_STATE)

// eslint-disable-next-line react-refresh/only-export-components
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



// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
    const accessToken = Cookies.get("access_token");

    useEffect(() => {
        dispatch({type: 'loginStart'})
        const getUser = async () => {
            try {
                const response = await axios.get("/users/auth/findClientUser", {headers: {
                    "Authorization": `Bearer ${accessToken}`
                }})
                const {username, email, isAdmin, isManger} = response.data.user;
                const profileId = response.data.user.Profile.id;
                const profileImg = response.data.user.Profile.profile_pic;
                const fullName = response.data.user.Profile.full_name;
                console.log(response.data.user)
                dispatch({type: 'loginSuccess', payload: {username, email, fullName,isAdmin, profileId,profileImg, isManger}})
            } catch (err) {
                dispatch({type: 'loginFailure', payload: err})
            }

        }
        getUser()
    }, [accessToken])
    return (
        <AuthContext.Provider value={ {dispatch: dispatch, user: state.user, error: state.error, loading: state.loading} }>
        {children}
        </AuthContext.Provider>
    )
}