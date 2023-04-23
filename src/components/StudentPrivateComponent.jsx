import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./student/Header";
import Sidebar from "./student/Sidebar";
import "../css/cards.css";

const StudentPrivateComponent = () => {
	const [activeNavToggler, setActiveNavToggler] = useState(false);
	const [loggedin, setLoggedin] = useState();

	const navigate = useNavigate();

	useEffect(() => {
		document.title = "PMS | Student";
		if (!sessionStorage.getItem("auth-token")) {
			return navigate("/");
		}
	}, []);

	useEffect(() => {
		if (sessionStorage.getItem("auth-token")) {
			setLoggedin(true);
		}
	}, [loggedin]);

	if (loggedin && sessionStorage.getItem("user-type") === "student") {
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
		return <></>;
	}
};

export default StudentPrivateComponent;
