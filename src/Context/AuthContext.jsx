import { useEffect, useReducer } from "react";
import { createContext } from "react";
import { validateAuthSingIn } from "../Utils/AuthUtils";
import { api } from "../Service/api";
import {  useNavigate } from "react-router-dom";


export const AuthContext = createContext();

const initialValue = JSON.parse(localStorage.getItem("userAuthGymManager")) || {
    username: null,
    role: null,
    isAuthenticated: false,
    token: null,
    rememberPassword: false
};

const authReduce = (state, action) => {
    switch (action.type) {
        case "signIn":
            return {
                ...state,
                username: action.payload.username,
                role: action.payload.role,
                token: action.payload.token,
                isAuthenticated: action.payload.isAuthenticated,
                rememberPassword: action.payload.rememberPassword,
            };
        case "singUp":
            return {

            };
        case "logout":
            return {
                ...state,
                username: null,
                role: null,
                token: null,
                isAuthenticated: false,
                rememberPassword: false,
            };
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReduce, initialValue);
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path)
    }

    const singIn = async (data, autologin) => {

        if (validateAuthSingIn(data)) {
            try {

                const response = await api.post("/api/auth/signIn", data);

                if (response.status == 201) {
                    const userLogged = {
                        username: response.data.username,
                        role: response.data.role,
                        token: response.data.jwt,
                        isAuthenticated: response.data.status,
                        rememberPassword: autologin
                    }
                
                    dispatch({
                        type: "signIn",
                        payload: userLogged
                    })
                   if(autologin){
                        localStorage.setItem("userAuthGymManager", JSON.stringify(userLogged))
                        console.log(localStorage.getItem("userAuthGymManager"));
                        
                   }
                    
                    if (response.data.status) {
                        navigateTo("/dashboard")
                    }
                } else {
                    logout()
                }

            } catch (error) {
                console.error(error);
                logout()

            }
        } else {
            return;
        }

    }

    const logout = () => {
        dispatch({ type: "logout" })
        localStorage.removeItem("userAuthGymManager")
        navigateTo("/login")
    }

    useEffect(() => {
        
        const checkJwt = async () => {
            const userLogged = localStorage.getItem("userAuthGymManager");

            const verifyJwt = async (jwt) => {

                try {
                    const response = await api.get(`/api/auth/validate/${jwt}`, {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    })

                    if (response.status == 401) {
                        logout()
                    }

                    return response.data;
                } catch (error) {
                    console.log(error);

                }
            };

            if (userLogged) {
                const userLoggedParsed = JSON.parse(userLogged);

                const isValid = await verifyJwt(userLoggedParsed.token);


                if (isValid) {
                    dispatch({
                        type: "signIn",
                        payload: userLoggedParsed
                    })
                } else {
                    logout();
                }
            }

        };

        checkJwt();
    }, [state.isAuthenticated]);



    return (
        <AuthContext.Provider value={{ state, singIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
}