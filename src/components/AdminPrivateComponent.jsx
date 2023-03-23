import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./admin/Header";
import Sidebar from "./admin/Sidebar";

const AdminPrivateComponent = () => {
    const [activeNavToggler, setActiveNavToggler] = useState(false);
    const [loggedin, setLoggedin] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("auth-token")) {
            setLoggedin(true);
        }
    }, [loggedin]);

    if (loggedin && sessionStorage.getItem("user-type") === "admin") {
        return (
            <>
                <Header
                    activeNavToggler={activeNavToggler}
                    setActiveNavToggler={setActiveNavToggler}
                />
                <Sidebar activeNavToggler={activeNavToggler} />
                <div
                    className={
                        activeNavToggler ? "main-page page-shrink" : "main-page"
                    }
                >
                    <Outlet />
                </div>
            </>
        );
    } else {
        navigate("/");
    }
};

export default AdminPrivateComponent;
