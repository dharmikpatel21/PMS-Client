import React from "react";
import "../../css/sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = ({ activeNavToggler }) => {
    const menu = [
        { linkName: "Dashboard", link: "/student/dashboard", icon: "#" },
        { linkName: "Jobs", link: "/student/jobs", icon: "#" },
        {
            linkName: "Job Applications",
            link: "/student/jobapplications",
            icon: "#",
        },
        { linkName: "Approved Jobs", link: "/student/approvedjobs", icon: "#" },
        { linkName: "My Profile", link: "/student/myprofile", icon: "#" },
    ];
    return (
        <aside
            className={activeNavToggler ? "sidebar show-sidebar" : "sidebar"}
        >
            <div className="sidebar-brand">
                <h1>
                    <span className="PMS">P</span>MS
                </h1>
            </div>

            <div className="sidebar-menu">
                <ul>
                    {menu.map((item) => {
                        return (
                            <li key={item.link}>
                                <NavLink
                                    to={item.link}
                                    className={({ isActive }) =>
                                        isActive ? "active" : ""
                                    }
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.linkName}</span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
