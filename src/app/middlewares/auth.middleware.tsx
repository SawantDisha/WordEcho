import { Navigate } from "react-router";
import { useAuth } from "../utils/auth";
import { ReactNode } from "react";

interface Props {
    children: ReactNode
}

export default function AuthMiddleware({ children }: Props) {

    const { token } = useAuth();

    if (!token) {
        // If there's no token (i.e., the user isn't logged in), redirect to login
        return <Navigate to="/login" />;
    }

    return children;
}