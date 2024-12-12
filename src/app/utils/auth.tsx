import React, { createContext, useState, useEffect, useContext, ReactElement } from 'react';
import axios from 'axios';
import useAuthService from '../services/auth.service';

interface IAuthContext {
    token?: string
    user?: IUser
    login: (token: string, user: IUser, callback: VoidFunction) => void
    logout: (callback: VoidFunction) => void
}

interface IUser {
    id: string
    email: string
    name: string
}

// Define the Auth context
const AuthContext = createContext<IAuthContext>(null!);

// Provider component
export const AuthProvider = ({ children }: { children: ReactElement }) => {
    const [user, setUser] = useState<IUser>(); // Store user data (id, name, email)
    const [token, setToken] = useState(localStorage.getItem('token') || undefined); // Store JWT token

    const authService = useAuthService();

    // Check if there's a token in localStorage on initial load
    useEffect(() => {
        if (token) {
            // Optionally, fetch the user details from API using token
            authService.check()
                .then(response => {
                    setToken(response.access_token)
                    setUser({
                        id: response.id,
                        name: response.name,
                        email: response.email,
                    });
                })
                .catch(error => {
                    setToken(undefined);
                    setUser(undefined);
                    localStorage.removeItem('token');

                    // console.error('Error fetching user data:', error);
                });
        }
    }, [token]);

    // Login method
    const login = (token: string, user: IUser, callback: VoidFunction) => {
        // Save the token and user data
        setToken(token);
        setUser(user);

        // Store the token in localStorage
        localStorage.setItem('token', token);

        callback()
    };

    // Logout method
    const logout = (callback: VoidFunction) => {
        setToken(undefined);
        setUser(undefined);
        localStorage.removeItem('token');

        callback()
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use Auth context
export const useAuth = () => {
    return useContext(AuthContext);
};
