
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PageProtect({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>
    }
    
    if (!user) {
        return <Navigate to="/login" />;
    }
    return children
}
