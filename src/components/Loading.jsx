import React from "react";
import ReactLoading from "react-loading";
import "../css/loading.css";

const Loading = () => {
	return (
		<div className="loading-container">
			<ReactLoading
				type="spinningBubbles"
				color="var(--primary-color)"
				height={100}
				width={100}
			/>
			<h4>Loading...</h4>
		</div>
	);
};

export default Loading;
