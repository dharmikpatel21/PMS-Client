import React from "react";
import { Link } from "react-router-dom";
import img404 from "../img/404.jpg";
import "../css/page404.css";

const PageNotFound = () => {
	return (
		<div className="page404-container">
			<img src={img404} />
			<div className="page404-info">
				<p>Oops! Page Not Found</p>
				<div className="btn active-btn btn-404">
					<Link to="/">Go to Home </Link>
				</div>
			</div>
		</div>
	);
};

export default PageNotFound;
