import { useEffect, useReducer } from "react";
import { createContext } from "react";
import { validateAuthSingIn } from "../Utils/AuthUtils";
import { api } from "../Service/api";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../Service/api";


export const AuthContext = createContext();

const initialValue = JSON.parse(localStorage.getItem("userAuthGymManager")) || {
    username: null,
    email: null,
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
                email: action.payload.email,
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
                email: null,
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
                        email: response.data.email,
                        role: response.data.role,
                        token: response.data.jwt,
                        isAuthenticated: response.data.status,
                        rememberPassword: autologin
                    }

                    dispatch({
                        type: "signIn",
                        payload: userLogged
                    })
                    setAuthToken(userLogged.token);

                    if (autologin) {
                        localStorage.setItem("userAuthGymManager", JSON.stringify(userLogged))
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

    const singInWithGoogle = async (googleToken) => {
        try {
            const response = await api.post("/api/auth/signWithGoogle", { token: googleToken });

            const userLogged = {

                username: response.data.username,
                role: response.data.role,
                token: response.data.jwt,
                isAuthenticated: response.data.status,
                rememberPassword: true


            };

            dispatch({ type: "signIn", payload: userLogged });
            setAuthToken(userLogged.token);
            localStorage.setItem("userAuthGymManager", JSON.stringify(userLogged));
            console.log(userLogged);
            navigateTo("/dashboard");

        } catch (err) {
            console.error("Error al iniciar sesión con Google", err);
            localStorage.removeItem("userAuthGymManager")
        }
    };


    const logout = () => {
        dispatch({ type: "logout" })
        localStorage.removeItem("userAuthGymManager")
        navigateTo("/login")
    }

    

    useEffect(() => {
        const checkJwt = async () => {
            const userLoggedRaw = localStorage.getItem("userAuthGymManager");

            if (!userLoggedRaw) return;

            const userLogged = JSON.parse(userLoggedRaw);

            if (userLogged.rememberPassword) {
                const isValid = await verifyJwt(userLogged.token);
                if (isValid) {
                    dispatch({
                        type: "signIn",
                        payload: userLogged
                    })
                } else {
                    logout();
                }
            } else {
                localStorage.removeItem("userAuthGymManager");
            }
        };

        const verifyJwt = async (jwt) => {
            try {
                const response = await api.get(`/api/auth/validate/${jwt}`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });

                return response.status !== 401;
            } catch (error) {
                console.log(error);
                return false;
            }
        };

        checkJwt();
    }, []);




    return (
        <AuthContext.Provider value={{ state, singIn, logout, singInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    );
}