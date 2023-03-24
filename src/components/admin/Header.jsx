import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/header.css";
import admin_profile from "../../img/profile.jpg";

const Header = ({ activeNavToggler, setActiveNavToggler }) => {
    const handleHamBurger = () => {
        if (activeNavToggler) {
            setActiveNavToggler(false);
            return;
        }
        setActiveNavToggler(true);
    };
    const userType = sessionStorage.getItem("user-type");
    const userInfo = sessionStorage.getItem("user-info");
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
    };

    return (
        <header className={activeNavToggler ? "header-shrink" : ""}>
            <div className="menu-left">
                <div
                    onClick={handleHamBurger}
                    className={
                        activeNavToggler
                            ? "menu-toggler active"
                            : "menu-toggler"
                    }
                >
                    <div></div>
                </div>
                <h2>PMS</h2>
            </div>
            <div className="logout-container">
                <button
                    className="btn logout-btn flex justify-center items-center gap-0"
                    onClick={handleLogout}
                >
                    <span className="svg-wrapper">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                            />
                        </svg>
                    </span>
                    <span>Log Out</span>
                </button>
            </div>
            <div className="user-wrapper">
                <img
                    src={admin_profile}
                    width="50px"
                    height="50px"
                    alt="user"
                />
                <div>
                    <h4>{userInfo ? userInfo.toUpperCase() : "student"}</h4>
                    <small>{userType ? userType : "Student"}</small>
                </div>
            </div>
        </header>
    );
};

export default Header;
