import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res);
            setUser(res.data);
            setisAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);
            console.log(error)
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res.data); 
            setisAuthenticated(true);
            setUser(res.data);
        } catch (error) {
            console.log(error)
            /*manejar el map ya que recibe un array y nosotros estamos mandando un objeto
            para arreglar el error signinError is not a function convertimos lo que viene desde el backend
            "message" en un array para que lo recoora. funcion map recorre array
            */
            if (Array.isArray(error.response.data)) {
                setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);

        }
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 3000)
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            if (!cookies.accsessToken) {
                setisAuthenticated(false);
                setLoading (false);
                return setUser(null);
            }

            try {
                const res = await verifyTokenRequest(cookies.accsessToken);
                console.log(res);
                if (!res.data) {
                    setisAuthenticated(false);
                    setLoading(false);
                    return;
                }
                setisAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setisAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();

    }, []);

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            user,
            isAuthenticated,
            errors,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
};