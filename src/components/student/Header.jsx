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
                <button className="btn logout-btn" onClick={handleLogout}>
                    <span>#</span> Log Out
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
