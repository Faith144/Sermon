import { Heading } from "@chakra-ui/react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";


const PrivateRoute = ({ children }) => {
    const nav = useNavigate;
    const { isAuthenticated, loading } = useAuth();
    if (loading) {
        return <Heading>Loading...</Heading>
    }
    if (isAuthenticated) {
        return children
    } else {
        nav('/login')
    }
}

export default PrivateRoute