/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const getUser = () => {
        setLoading(true);
        fetch("/api/auth/user")
            .then((res) => res.json())
            .then(({ ok, user }) => {
                if (!ok) {
                    setUser(null);
                } else {
                    setUser(user);
                }
                setLoading(false);
            })
    }

    useEffect(() => {
        getUser();
    }, []);

    const login = (data) => {
        fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then(({ ok, user:_user}) => {
                if (ok && _user) {
                    setUser(_user);
                    navigate("/");
                } else {
                    alert("Invalid Credentials");
                }
            })
    };

    const logout = () => {
        fetch("/api/auth/logout", {
            method: "POST",
        }).then(() => {
            setUser(null);
            navigate("/login");
        })
    };


    const value = useMemo(() => ({ user,loading, login, logout }), [login, logout, user, loading]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}