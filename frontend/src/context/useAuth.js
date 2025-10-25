import { createContext, useContext, useEffect, useState } from "react";
import { is_authenticated } from '../endpoints/api'
import { useNavigate } from "react-router-dom";
import { login, register } from "../endpoints/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const nav = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    const get_authenticated = async () => {
        try {
            const success = await is_authenticated()
            setIsAuthenticated(success)

        } catch (err) {
            setIsAuthenticated(false)
            return false
        } finally {
            setLoading(false)
        }
    };

    const login_user = async (username, password) => {
        const success = await login(username, password);
        if (success) {
            setIsAuthenticated(true)
            nav('/')
        }
    }

    const register_user = async (username, email, password, Cpassword) => {
        if (password === Cpassword) {
            try {
                await register(username, email, password)
                alert("user successfully registered")
            } catch (err) {
                alert("Failed to register User")
            }
        } else {
            alert("password don't match")
        }
    }

    useEffect(() => {
        get_authenticated();
    }, [window.location.pathname])

    return (
        <AuthContext.Provider value={{isAuthenticated, loading, login_user, register_user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)