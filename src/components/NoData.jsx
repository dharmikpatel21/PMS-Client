import React from "react";
import emptyImg from "../img/empty.png";

const NoData = ({ title }) => {
	return (
		<div className="empty-img-container">
			{title ? <h1>No Any {title}</h1> : <></>}
			<img className="empty-img" src={emptyImg} alt="." />
			<div>Oops! Nothing to show here...</div>
		</div>
	);
};

export default NoData;
