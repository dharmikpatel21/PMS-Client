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
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
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
