import React from "react";
import emptyImg from "../img/empty.png";

const NoData = () => {
	return (
		<div className="flex flex-col items-center w-full h-full">
			<img className="empty-img" src={emptyImg} alt="." />
			<div>Oops! Nothing to show here...</div>
		</div>
	);
};

export default NoData;
